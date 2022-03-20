import axios from "axios";
import React, { useContext } from "react";
import { Store } from "../../utils/Store";

function UploadImage() {
  const { state, dispatch } = useContext(Store);
  const { imageLink } = state;

  console.log("imageLink:", imageLink);

  const uploadImage = async (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "awo376nd");

    await axios
      .post("https://api.cloudinary.com/v1_1/dc1vsoxuq/image/upload", formData)
      .then((res) => {
        dispatch({
          type: "GET_IMAGE_LINK_CLOUD",
          payload: res.data.secure_url,
        });
      });
  };
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          uploadImage(e.target.files);
        }}
      ></input>
    </div>
  );
}

export default UploadImage;
