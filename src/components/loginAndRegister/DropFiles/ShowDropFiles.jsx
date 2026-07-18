import React from "react";
import { Stack } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { BsFileEarmarkPdf } from "react-icons/bs";
const ShowDropFiles = ({ files, setFiles }) => {
  const removeFile = (selectedFile) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this file."
    );
    if (!confirm) return;
    setFiles(files.filter((file) => file.id !== selectedFile.id));
  };
  return (
    <Stack flexDirection="column" margin="0.5em 0.5em">
      {files?.map((file, i) => (
        <Stack flexDirection="row" alignItems="center" key={i} margin=".5em 0">
          <BsFileEarmarkPdf style={{ fontSize: "1.1em", marginRight: ".5em" }} />
          <p>{file?.name}</p>
          <IoMdClose
            style={{
              marginLeft: "1em",
              color: "red",
              cursor: "pointer",
            }}
            onClick={() => removeFile(file)}
          />
        </Stack>
      ))}
    </Stack>
  );
};

export default ShowDropFiles;
