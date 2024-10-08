const imageUploadToDb = async (data) => {
    const image = new FormData();
    image.append("image", data);
  
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_VITE_IMG_BB_SECRET}`,
      {
        method: "POST",
        body: image,
      }
    );
  
    if (response.status === 400) throw new Error("Unsupported file!");
    const url = await response?.json();
  
    return url.data.url;
  };
  
  const imageUpload = async (data) => {
    const dataArray = Object.values(data);
    const imageUrls = await Promise.all(dataArray.map(imageUploadToDb));
    return imageUrls
  };
  
  export default imageUpload;
  