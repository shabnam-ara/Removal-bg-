import { useState } from "react";

import "./Remover.css";
const Remover = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [finalUrl, setFinalUrl] = useState(null);
  const [isUpload, setIsUpload] = useState(false);

  const handleFileInputChange = (e) => {
    let image = e.target.files[0]; 
    console.log(image);
    setSelectedFile(image);
  };

  const handleFileUpload = async () => {
    setIsUpload(true);
    const formData = new FormData();
    formData.append("image_file", selectedFile);
    formData.append("size", "auto");
  
    const api_key = "D29hLkE8Vtt5q7D7t9HaFLDy";
  
    try {
      const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
          "X-Api-Key": api_key,
        },
        body: formData,
      });
  
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
  
      setFinalUrl(url);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUpload(false);
    }
  };
  
  return (
    <div className="container">
      <div className="remover_container">
        <form className="info_container">
          <label className="info_text">Select a File</label>
          <input type="file" onChange={handleFileInputChange} required />
          {!isUpload ? (
            <button
              type="button"
              onClick={handleFileUpload}
              className="btn btn_upload"
            >
              Upload
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFileUpload}
              className="btn btn_upload btn_disabled"
              disabled={true}
            >
              Uploading...
            </button>
          )}
        </form>
        {finalUrl && (
          <a href={finalUrl} download="no-back.png">
            <button className="btn btn_download">Download</button>
          </a>
        )}
        {finalUrl && (
          <div className="final_img_area">
            <img src={finalUrl} alt="final_img" className="final_img" />
          </div>
        )}
      </div>
    </div>
  );
};
export default Remover;