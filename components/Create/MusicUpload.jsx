import React, { useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const MusicUpload = ({ fileURL, setFileURL, notifySuccess, notifyError, setLoader }) => {
  const uploadToIPFS = async (file) => {
    if (file) {
      try {
        setLoader(true);
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            maxBodyLength: "Infinity",
            headers: {
              pinata_api_key: `1871a6f19d3cce2fff92`,
              pinata_secret_api_key: `ba4d409414c538bd42c1fed90a6a60d2e79a07b6aaf8a5969b4d9b094c6f7983`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setFileURL(`https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`);
        notifySuccess("Audio Uploaded Successfully");
      } catch {
        notifyError("Unable to upload audio to Pinata");
      } finally {
        setLoader(false);
      }
    }
  };

  const onDrop = useCallback((acceptedFile) => {
    uploadToIPFS(acceptedFile[0]);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({ onDrop, maxSize: 500000000000 });

  return (
    <div className="flex h-full max-h-[calc(100vh-64px)] flex-col overflow-hidden">
      <h3 className="c-ddfucX">Select Audio</h3>
      {fileURL ? (
        <audio className="new_full_width_audio" controls>
          <source src={fileURL} type="audio/ogg" />
          <source src={fileURL} type="audio/mpeg" />
          Your browser does not support the audio tag
        </audio>
      ) : (
        <div {...getRootProps()} className="c-jnBfEb">
          <p>Select your sounds to upload</p>
          <div className="c-cWWxYX">
            <input {...getInputProps()} accept="audio/*" type="file" hidden />
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicUpload;
