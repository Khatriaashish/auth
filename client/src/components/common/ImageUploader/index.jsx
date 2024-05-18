import React from "react";
import { Form } from "react-bootstrap";

const ImageUploader = ({ loading = false, setThumb, setValue, setError }) => {
  return (
    <>
      <Form.Control
        type="file"
        disabled={loading}
        onChange={(e) => {
          const image = e.target.files[0];
          const ext = image.name.split(".").pop();
          if (
            ["jpg", "png", "jpeg", "gif", "svg", "bmp", "webp"].includes(
              ext.toLowerCase()
            )
          ) {
            if (image.size <= 3000000) {
              setThumb(image);
              setValue("image", image);
            } else {
              setError("image", {
                message: "File too large. Should be less than 3MB",
              });
            }
          } else {
            setError("image", { message: "File format not supported" });
          }
        }}
      />
    </>
  );
};

export default ImageUploader;
