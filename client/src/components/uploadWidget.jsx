import { useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import { ADD_DESIGN } from "../utils/mutations"; // Import your ADD_DESIGN mutation

export default function UploadWidget() {

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
