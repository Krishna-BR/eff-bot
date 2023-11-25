import ReactMarkdown from "react-markdown";
import Image from "next/image";


const Message = ({ role, content }) => {
  return (
    <div className="my-4 mx-auto flex w-full max-w-4xl ">
      <Image
        src={
          role === "user"
            ? "/profile.PNG"
            : role === "assistant"
            ? "/Effbot.PNG"
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
        {
          (content.includes("URL:")) ?
          <Image
            src={content.split("URL: ")[1].split("\n\nInstruction")[0]}
            alt="Avatar"
            className="border"
          />:
        <div></div>
        }
        
        <div className="text-lg prose">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Message;
