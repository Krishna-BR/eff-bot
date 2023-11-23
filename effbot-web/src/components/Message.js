import ReactMarkdown from "react-markdown";
import Image from "next/image";

// import light build
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// import only whatever languages you are using. Thaw will dramatically reduce the build size of the page
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
// those tags are used when you write ```js  {code here} ```
SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("py", python);

const customRenderers= {
  // modify the code tag 
  code(code) {
  // node since i use ts, this code here might vary in your app
    const { node } = code;
    const { lang, value } = node;
    return (
      <div style={{ fontSize: "1.6rem" }}>
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={lang}
          children={value}
        />
      </div>
    );
  },
};

const Message = ({ role, content }) => {
  return (
    <div className="my-4 mx-auto flex w-full max-w-4xl ">
      <Image
        src={
          role === "user"
            ? "/profile.PNG"
            : role === "assistant"
            ? "/effbot.PNG"
            : "/Krishna_avatar.jpeg"
        }
        height={40}
        width={40}
        alt="Avatar"
        className="self-start rounded-full border"
        unoptimized
      />
      <div className="flex-1 overflow-x-hidden pl-2">
        <div>
          <span className="text-base font-medium">
            {role === "user" ? "You " : role === "system" ? "System" : "Eff Bot "}
          </span>
        </div>

        <div className="text-lg prose">
          <ReactMarkdown  renderers={customRenderers}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Message;
