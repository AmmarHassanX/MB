import { Typography } from "@mui/material";
import { MdErrorOutline } from "react-icons/md";
import styled from "styled-components";

export const H1 = styled(Typography)`
  font-size: ${(props) => props.fontSize || props.theme.typography.h1.fontSize};
  font-weight: ${(props) => props.theme.typography.h1.fontWeight};
  color: ${(props) => props.theme.palette.colors.black};
  text-transform: uppercase;
  font-family: ${(props) => props.fontFamily || props.theme.typography.h1.fontFamily};
  margin: ${(props) => props.margin || ".8rem 0"};
  letter-spacing: 0.05em;
  background: ${(props) => props.theme.palette.bg.secondary};
  @media only screen and (max-width: 768px) {
    word-break: break-word;
    /* font-size: ${(props) => props.theme.typography.h1.fontSizeSm}; */
  }
`;
export const FooterHeading = styled(Typography)`
  font-size: ${(props) => props.fontSize || props.theme.typography.h2.fontSize};
  font-weight: ${(props) => props.theme.typography.h2.fontWeight};
  color: ${(props) => props.theme.palette.bg.white};
  text-transform: uppercase;
  font-family: ${(props) => props.fontFamily || props.theme.typography.h2.fontFamily};
  margin: ${(props) => props.margin || ".8rem 0"};
  @media only screen and (max-width: 768px) {
    word-break: break-word;
    /* font-size: ${(props) => props.theme.typography.h2.fontSizeSm}; */
  }
`;

export const BodyText = styled(Typography)`
  font-size: ${(props) => props.fontSize || props.theme.typography.body.fontSize};
  font-weight: ${(props) => props.theme.typography.body.fontWeight};
  color: ${(props) => props.theme.palette.bg.white};
  // margin: 0.8rem 0;
  // margin-bottom: ${(props) => props.marginBottom || ".8rem"};
  font-family: ${(props) => props.theme.typography.body.fontFamily};
  @media only screen and (max-width: 768px) {
    word-break: break-word;
    /* font-size: ${(props) => props.theme.typography.body.fontSizeSm}; */
  }
`;

const Error = styled.div`
  text-transform: uppercase;
  color: red;
  letter-spacing: 1px;
  font-weight: 500;
  background-color: rgb(236, 233, 233);
  padding: 0.6em 1em;
  border-radius: 0.1em;
  display: flex;
  align-items: center;
  font-size: 1rem;
  .icon {
    margin-right: 0.5em;
  }
`;

export const ErrorMessage = ({ children }) => (
  <Error>
    <MdErrorOutline className="icon" />
    <p>
      errror:&nbsp;&nbsp;
      {children}
    </p>
  </Error>
);
