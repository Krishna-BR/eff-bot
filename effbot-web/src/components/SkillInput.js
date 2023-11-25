import classNames from "classnames";
import { ChangeEvent, useState } from "react"

const SkillInput = ({
  field,
  title,
  placeholder,
  type,
  value,
  onChange,
  options = [],
}) => {
  switch (type) {
    case "textarea":
    case "code":
      return (
        <div>
          <label
            htmlFor={field}
            className="block text-sm font-medium leading-6 text-gray-900 "
          >
            {title}
          </label>
          <div className="mt-2 mb-4">
            <textarea
              rows={4}
              name={field}
              id={field}
              className={classNames(
                type === "code" && "font-mono",
                "block w-full rounded-md border-0 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ",
                " placeholder:text-gray-400 focus:ring-2 focus:ring-inset ",
                " focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
              )}
              placeholder={placeholder}
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        </div>
      );

    case "select":
      return (
        <div className="mb-4">
          <label
            htmlFor={field}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {title}
          </label>
          <select
            id={field}
            name={field}
            className="mt-2 block w-full rounded-md border-0 px-2 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">Select an Option</option>
            {options.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>
        </div>
      );
    case "file":
        const [image, setImage] = useState("");
  
        // useState to hold a base64 string
        // useState to hold the chatGPT response
  
        //Image upload logic
        //1. User upload an image
        //2. We can take the image and convert it into a b64 string
        //3. When we request API route we create, we will pass the image string to the backend
  
        function handleFileChange(event){
  
          if (event.target.files === null){
            window.alert("No file selected. Choose a file")
            return;
          }
          const file = event.target.files[0];
  
          // Convert the users file to a base64 string
          //FileReader
          const reader = new FileReader();
          reader.readAsDataURL(file);
  
          reader.onload = () => {
            // reader.result -> base 64 string
            if (typeof reader.result === "string"){
              console.log(reader.result);
              setImage(reader.result);
            }
          }
  
          reader.onerror = (error) => {
            console.log("error: "+ error);
          }
        }
  
        return (
          <div className="min-h-screen flex items-center justify-center text-md text-white" >
            <div className="bg-slate-800 w-full max-w-2xl rounded-lg shadow-md p-8">
              <h2 className="text-xl font-bold mb-4">Uploaded Image</h2>
              {image !== ""?
                <div className="mb-4 overflow-hidden">
                  <img src={image}
                    className = "w-full object-conatin max-h-72"
                  />
                  <input
                    type="text"
                    name={field}
                    id={field}
                    className="hidden text-sm border rounded-lg cursor-pointer"
                    value={image}
                    onChange={(e) => onChange(e.target.value)}
                    //style="display: none;"
                  />
                </div> 
                
                :
                <div className="mb-4 p-8 text-center">
                <p>Once you upload an image, you will see it here.</p>
              </div> 
              }
              
  
              <div className="flex flex-col mb-6">
                <label htmlFor={field} className ='mb-2 text-sm font-medium'>{title}</label>
                <input
                  type={type}
                  name="image1"
                  id="image1"
                  className="text-sm border rounded-lg cursor-pointer"
                  onChange={(e)=> handleFileChange(e)}
                />
              </div>
            </div>
          </div>
        )
        
    default:
      return (
        <div>
          <label
            htmlFor={field}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {title}
          </label>
          <div className="mt-2 mb-4">
            <input
              type={type}
              name={field}
              id={field}
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder={placeholder}
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
            />
            
          </div>
        </div>
      );
  }
};

export default SkillInput;
