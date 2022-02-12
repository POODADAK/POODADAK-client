import axios from "axios";
import imageCompression from "browser-image-compression";

export async function fetchS3Url() {
  const { data } = await axios.get("/s3Url", { withCredentials: true });
  return data.s3Url;
}

export async function uploadImageToS3(uploadUrl, file) {
  const imageCompressionOption = {
    maxSizeMB: 8,
    maxWidthOrHeight: 428,
  };

  const compressedFile = await imageCompression(file, imageCompressionOption);

  await axios.put(uploadUrl, compressedFile, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  const imageUrl = uploadUrl.split("?")[0];
  return imageUrl;
}
