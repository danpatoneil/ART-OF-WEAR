// import { createContext, useEffect, useState } from "react";
// import { ADD_DESIGN } from "../utils/mutations";
// import { useMutation } from "@apollo/client";

// // Create a context to manage the script loading state
// const CloudinaryScriptContext = createContext();

// function CloudinaryUploadWidget({ uwConfig, setPublicId }) {
//     const [loaded, setLoaded] = useState(false);
//   const [addDesign, { error }] = useMutation(ADD_DESIGN);

//   useEffect(() => {
//     // Check if the script is already loaded
//     if (!loaded) {
//       const uwScript = document.getElementById("uw");
//       if (!uwScript) {
//         // If not loaded, create and load the script
//         const script = document.createElement("script");
//         script.setAttribute("async", "");
//         script.setAttribute("id", "uw");
//         script.src = "https://upload-widget.cloudinary.com/global/all.js";
//         script.addEventListener("load", () => setLoaded(true));
//         document.body.appendChild(script);
//       } else {
//         // If already loaded, update the state
//         setLoaded(true);
//       }
//     }
//   }, [loaded]);

//   const initializeCloudinaryWidget = async () => {
//     if (loaded) {
//       var myWidget = window.cloudinary.createUploadWidget(
//         uwConfig,
//         (error, result) => {
//           if (!error && result && result.event === "success") {
//             console.log("Done! Here is the image info: ", result.info);
//             console.log(result.info.secure_url)
//             addDesign({
//                 variables:{
//                     image:result.info.secure_url
//                 }
//             });
//             setPublicId(result.info.public_id);
//           }
//         }
//       );

//       document.getElementById("upload_widget").addEventListener(
//         "click",
//         function () {
//           myWidget.open();
//         },
//         false
//       );
//     }
//   };

//   return (
//     <CloudinaryScriptContext.Provider value={{ loaded }}>
//       <button
//         id="upload_widget"
//         className="cloudinary-button"
//         onClick={initializeCloudinaryWidget}
//       >
//         Upload
//       </button>
//     </CloudinaryScriptContext.Provider>
//   );
// }

// export default CloudinaryUploadWidget;
// export { CloudinaryScriptContext };




import { useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import { ADD_DESIGN } from "../utils/mutations"; // Import your ADD_DESIGN mutation

export default function UploadWidget({onSetImageUrl}) {

    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const [addDesign, {error}] = useMutation(ADD_DESIGN);

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dhbdcvydg',
            uploadPreset: 'nulsrzkz',
            multiple: false,  //restrict upload to a single file
            sources: [ "local", "url"], // restrict the upload sources to URL and local files
        }, function(error, result) {
            if (!error && result && result.event === "success") {
                addDesign({ variables: { image:result.info.secure_url } }); // Call the ADD_DESIGN mutation with the imageUrl
                console.log(result.info.secure_url);
    }});
    }, [])
    return (
        <div>
        <button type="button"
          className="ui inverted button fluid blue small"
          onClick={() => widgetRef.current.open()}>
            Upload
        </button>
            {/* Display error message if there is an error */}
            {error && (
                <div>
                    <p className="error-text">Error: {error.message}</p>
                </div>
            )}
        </div>
    )
}
