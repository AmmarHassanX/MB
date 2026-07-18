import { motion } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";

//////
import { BodyText } from "../../utilities/theme/components";

export const FooterSection = styled.section`
  width: 100%;
  background: #2e2929;
  display: flex;
  display: grid;
  place-items: center;
  height: 37.94;
  overflow: hidden;
  padding: 0 1em;
`;

export const FooterContainer = styled.div`
  width: 100%;
  /* max-width: 1454px; */
  max-width: 103.87rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 0;
  @media screen and (max-width: 768px) {
    max-width: 100vw;
  }
`;

export const FooterLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-left: auto;
  padding: 4em 0em;
  /* padding-bottom: 4em; */
`;
export const FooterLinksBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  h6 {
    // text-transform: uppercase;
    font-size: 23px;
    font-weight: 500;
    color: #ffffff;
    // line-height: 26.01px;
    margin-bottom: 0.6em;
    position: relative;
  }
  @media screen and (max-width: 768px) {
    h6 {
      font-size: 23px;
      // height: 3.8rem;
      font-weight: 500;
      margin-bottom: 0.2em;
    }
    margin-bottom: 0.5em;
    width: 95%;
  }
`;
export const FooterCol = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  // min-width: max-content;
  padding: 0 2em 0 0;

  b {
    font-weight: 700;
  }
  @media screen and (max-width: 746px) {
    justify-content: space-between;
  }
  &.second {
    margin-left: 66px;
  }
`;
export const FooterLinksCol = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => props.align};
  min-width: 100%;
`;

export const FooterText = styled(BodyText)`
  font-weight: 400;
  margin: ${(props) => props.margin};
  font-size: 14px;
  line-height: 23.01px;
  @media screen and (max-width: 746px) {
    font-size: 1.8rem;
  }
`;

const LinkText = styled(FooterText)`
  display: flex;
  align-items: start;
  gap: 5px;
  cursor: pointer;
  transition: 0.5s;
  font-weight: 300;
  font-size: 18px;
  margin: 0.4em 0;
  white-space: pre-line;
  line-height: 25px;
  color: #ffffff;
  svg {
    color: #ffffff;
  }
  &:hover {
    color: #65b9f6;
  }
  @media screen and (max-width: 768px) {
    margin: 0.3rem 0;
  }
`;

export const FooterLink = ({ children, url, fontWeight, icon }, ...rest) => {
  if (url) {
    return (
      <Link href={url}>
        <LinkText {...rest} fontWeight={fontWeight}>
          {icon && (
            <span
              style={{ marginRight: 10, display: "flex", color: "#ffffff" }}
            >
              {icon}
            </span>
          )}

          {children}
        </LinkText>
      </Link>
    );
  } else {
    return (
      <LinkText {...rest} fontWeight={fontWeight}>
        {children}
      </LinkText>
    );
  }
};

export const IconsBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  color: white;
  font-size: 2.2rem;
  .icon {
    cursor: pointer;
    transition: all 0.4s;
    &:hover {
      transform: scale(1.3);
    }
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 21px 1em 43px 1em;
  border-top: 1px solid #cacaca;
  @media screen and (max-width: 746px) {
    flex-direction: column;
    p {
      margin-top: 1em;
    }
  }
`;
