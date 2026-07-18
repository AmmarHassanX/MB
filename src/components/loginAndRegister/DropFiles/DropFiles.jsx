import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Stack, Button } from "@mui/material";
import styled from "styled-components";
const Container = styled.div`
  border: 1px solid #ededed;

  background-color: white;
  transition: 0.4s;
  cursor: pointer;
  padding: 0.5em 1em;
  &:hover {
    background-color: #f7f7f7;
  }
  button {
    color: red;
    font-weight: 600;
    text-transform: uppercase;
  }
`;
function MyDropzone({ setFiles, maxSize = 1048576, required = false }) {
  const [errors, setErrors] = useState("");

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (fileRejections?.length > 0) {
      fileRejections.forEach((file) => {
        file.errors.forEach((err) => {
          if (err.code === "file-too-large") {
            setErrors(`Error: File is larger than 1mb`);
          }
          if (err.code === "file-invalid-type") {
            setErrors(`Error: ${err.message}`);
          }
        });
      });
    } else {
      setErrors(null);
    }

    // Do something with the files
    // acceptedFiles.map((file) => {
    //   const reader = new FileReader();

    //   reader.onload = function (e) {
    //     setFiles((prevState) => [
    //       ...prevState,
    //       { id: uuid(), src: e.target.result, fileName: file.name, file },
    //     ]);
    //   };
    //   reader.readAsDataURL(file);
    //   return file;
    // });
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
  });

  return (
    <>
      <Container {...getRootProps()} style={{ color: "var(--text)" }}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Stack flexDirection="row" alignItems="center" sx={{ color: "var(--text)" }} justifyContent="flex-start">
            <Button variant="outlined" color="error" style={{ margin: 0 }}>
              uploading...
            </Button>
            &nbsp; &nbsp; <p> Release to drop the files here.</p>
          </Stack>
        ) : (
          <Stack
            flexDirection="row"
            alignItems="center"
            sx={{ color: "var(--text)", button: { height: "37px !important" } }}
            justifyContent="flex-start"
          >
            <Button variant="outlined" color="error" style={{ margin: 0 }}>
              UPLOAD
            </Button>
            &nbsp; &nbsp; <p>or drag files here{required && <span style={{ color: "red" }}>*</span>}</p>
          </Stack>
        )}
      </Container>
      {errors && <p style={{ color: "red" }}>{errors}</p>}
    </>
  );
}

export default MyDropzone;
