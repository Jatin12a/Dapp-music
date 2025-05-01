import React, { useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { Create1 } from "../SVG/index";

const CoverImage = ({
  setImageURL,
  imageURL,
  setDescription,
  setTitle,
  notifySuccess,
  notifyError,
  setLoader,
}) => {
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

        setImageURL(`https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`);
        notifySuccess("Cover Image Uploaded Successfully");
      } catch {
        notifyError("Unable to upload image to Pinata");
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
      <h3 className="c-ddfucX">Details</h3>
      <div className="c-gwhzgO max-h-[calc(100vh-265px)] overflow-auto">
        <form>
          <div
            {...getRootProps()}
            className="group relative mx-auto mb-4 h-[180px] w-[180px] overflow-hidden rounded-md"
          >
            {imageURL ? (
              <img
                alt="Playlist cover background"
                width={90}
                height={90}
                className="absolute inset-0 h-full w-full object-cover"
                src={imageURL}
                style={{ color: "transparent" }}
              />
            ) : (
              <>
                <input {...getInputProps()} accept="image/png,image/jpg,image/jpeg" hidden />
                <img
                  alt="Playlist cover background"
                  width={90}
                  height={90}
                  className="absolute inset-0 h-full w-full object-cover"
                  src="playlist_cover_background.png"
                  style={{ color: "transparent" }}
                />
                <div className="absolute right-1 top-1 hidden group-hover:block">
                  <button
                    aria-label="icon-button"
                    className="c-ebvTKE c-ebvTKE-isdEXf-variant-primary three-dots-icon bg-white text-base-s"
                    type="button"
                  >
                    <Create1 />
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="mb-4 mt-2 text-center text-base-s text-base400">
            Min 800 x 800px, Max 100 MB
            <br />
            (.png, .jpg, .jpeg)
          </div>
          <fieldset className="c-cSdPgl mb-4 flex flex-col gap-y-4">
            <label htmlFor="name" className="text-base-m font-semibold text-neutral600">
              Title *
            </label>
            <input
              className="block w-full rounded-[6px] border-0 bg-base200 px-[11px] py-3 text-base-m text-base800 ring-1 ring-inset ring-base200 placeholder:text-base500 focus:ring-2 focus:ring-inset focus:ring-base800 hover:border-base300 hover:bg-base50 hover:ring-1 outline-none"
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </fieldset>
          <fieldset className="c-cSdPgl flex flex-col gap-y-4">
            <label htmlFor="description" className="text-base-m font-semibold text-neutral600">
              Description
            </label>
            <textarea
              className="w-full rounded-[6px] border-0 bg-base200 px-[8px] py-2 text-base-m text-base800 ring-2 ring-inset transition-all placeholder:text-base500 focus:ring-inset focus:ring-base800 hover:border-base300 hover:bg-base50 hover:ring-1 outline-none resize-none scrollbar-light"
              rows={8}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="description"
            />
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default CoverImage;
