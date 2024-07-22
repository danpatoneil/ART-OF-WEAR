
import { useState } from "react";
import UploadWidget from "../components/uploadWidget"

export default function Upload() {
    const [imageUrl, setImageUrl] = useState("");

    return (
      <div>
        <UploadWidget onSetImageUrl={setImageUrl}/>
        <div style={{ width: "800px" }}>
        </div>
      </div>
    );
  }














