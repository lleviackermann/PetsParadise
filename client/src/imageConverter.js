const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const handleImage = async (e) => {
  if (e.target.files) {
    const file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg"
    ) {
      let base64 = await convertToBase64(file);
      console.log(base64);
      setShowSave(true);
      setImage(base64);
      setChange(true);
    } else {
      toast.error("Allowed formats are - jpeg, png & jpg", {
        position: "top-right",
      });
    }
  }
};

const temp = {
  target: {
    files: [
      {
        name: "example.jpg",
        type: "image/jpeg",
        size: 12345,
      },
    ],
  },
};

handleImage(temp);
