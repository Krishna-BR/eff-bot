import { getChatResponseHeaders } from "@/network";
import { OpenAIStream } from "@/utils/openai";
import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";

export const config = {
  runtime: "edge",
};

async function handler(req, res) {
  //const supabase = createMiddlewareSupabaseClient({ req, res });
  //const authenticated = await verifyServerSideAuth(supabase, req.headers);
  const headers = getChatResponseHeaders();

  /*if (!authenticated) {
    return new Response(`{ "message": "Unauthorized"}`, { status: 401, headers });
  }*/

  const body = await req.json();

  body.model = "gpt-3.5-turbo";
  for (const message of body.messages) {
    if (message.content.includes("URL")){
      body.model = "gpt-4-vision-preview";
      body.max_tokens =  4096;
    } 
  }

  if (body.model === "gpt-3.5-turbo"){
      body.messages = (body.messages || []).map((m) => ({
        role: m.role,
        content: m.content,
      }));
  } 
  else {
      body.messages = [
        {
          role: "user",
          content: (body.messages || []).map((meg) => {
            if (meg.content.includes("URL")){
              const image_url = meg.content.replace("Document URL: ","").split('\n\nInstruction')[0];
              const instruction = "Instruction"+ meg.content.replace("Document URL: ","").split('\n\nInstruction')[1]
              if(instruction == "Instructions: "){
                return {
                  type: "image_url",
                  image_url: image_url
                };
              } else {
                return [{
                  type: "text",
                  text: instruction
                },
                {
                  type: "image_url",
                  image_url: image_url
                }
              ];
              }
            } else {
              return {
              type: "text",
              text: meg.content
            };
            }
        })
      }
    ];
    const content_history =[]

    for (const message of body.messages[0].content) {
      if(message.constructor.toString().includes("Array")){
        for(const item of message){
          content_history.push(item)
        }
      } else{
        content_history.push(message)
      }
    }
    body.messages[0].content = content_history;
  }


  if (body.stream) {
    const stream = await OpenAIStream(body);
    return new Response(stream, { status: 200, headers });
  } else {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    const resText = await res.text();
    headers["Content-Type"] = "application/json";
    return new Response(resText, { status: 200, headers });
  }
}

export default handler;
