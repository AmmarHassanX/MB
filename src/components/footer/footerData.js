import { BiEnvelope } from "react-icons/bi";
import { FiPhoneCall } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { TbNavigationShare } from "react-icons/tb";

import theme from "../../utilities/theme/theme";
export const links1 = [
  {
    url: "/about-us",
    alias: "About Us ",
  },
  {
    url: "/privacy-policy",
    alias: "Privacy Policy ",
  },
  {
    url: "/terms-conditions",
    alias: "Terms & Conditions",
  },
  {
    url: "/contact-us",
    alias: "Contact Us",
  },
];

export const links2 = [
  {
    url: "/account/register",
    alias: "Registration",
  },
  {
    url: "/account",
    alias: "My Account",
  },
  {
    url: "/account",
    alias: "My Orders ",
  },
  {
    url: "/account/forgotPassword",
    alias: "Recover Password",
  },
];

export const links3 = [
  {
    url: "/contact-us",
    alias: "Help Center",
  },
  {
    url: "/account/register",
    alias: "Sign Up?",
  },
  {
    url: "/stocks",
    alias: "Stock Updates",
  },
];

export const links4 = [
  {
    url: "tel:+19722438273",
    alias: "+1 972-243-8273",
    icon: <FiPhoneCall />,
  },
  {
    url: "mailto:info@MBWholesale.com",
    alias: "info@MBWholesale.com",
    icon: <TfiEmail />,
  },
];
export const links6 = [
  {
    url: "/",
    alias:
      "MB Wholesale\n11528 Harry Hines Blvd Ste B213\nDallas Texas 75229\nUnited States",
    icon: <TbNavigationShare />,
  },
];

export const socialLinks = [
  {
    url: "/",
    imgUrl: "/images/social-icons/Vector-linkedin.png",
  },
  {
    url: "/",
    imgUrl: "/images/social-icons/Vector-facebook.png",
  },
  {
    url: "/",
    imgUrl: "/images/social-icons/Vector-instagram.png",
  },

  {
    url: "/",
    imgUrl: "/images/social-icons/Vector-skype.png",
  },
  {
    url: "/",
    imgUrl: "/images/social-icons/Vector-twitter.png",
  },
  {
    url: "/",
    imgUrl: "/images/social-icons/Vector-pintrest.png",
  },
];
Object.freeze(links1);
Object.freeze(links2);
Object.freeze(links3);
Object.freeze(links4);
Object.freeze(socialLinks);
