import { message } from "antd";

export const uppercaseFL = (string, startIndex) => {
  let array = string.split("_");

  for (let i = startIndex; i < array.length; i++) {
    if (array[i].length > 0) {
      array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
    }
  }
  return array.join("");
};

export const copyToClipboard = (text) => {
  // Copy the content of the Editor component to the clipboard
  navigator.clipboard.writeText(text).then(
    () => {
      return message.success("Code copied to clipboard");
    },
    () => {
      return message.error("Failed to copy code to clipboard");
    }
  );
};

export const handleDonwloadFile = (data, filename) => {
  // Create a blob of the data
  const file = new Blob([data], { type: "text/javascript" });
  // Create a link to download the file
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
