import Link from "next/link";
import { BsPerson, BsFileEarmarkRuled, BsArrowCounterclockwise } from "react-icons/bs";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { AiOutlineKey, AiOutlineLock } from "react-icons/ai";
////////
import styles from "./drop.module.scss";

////////////drop down

export const unAuthorizedItems = [
  {
    icon: <BsPerson className={styles.icon} />,
    name: "Login",
    link: "/account/login",
  },
];

export const userAccountItems = [
  {
    icon: <BsPerson className={styles.icon} />,
    name: "Dashboard",
    link: "/account",
  },
  {
    icon: <BsFileEarmarkRuled className={styles.icon} />,
    name: "Statement",
    link: "/account?path=statement",
  },

  {
    icon: <AiOutlineKey className={styles.icon} />,
    name: "Change Password",
    link: "/account?path=changePassword",
  },
  {
    icon: <AiOutlineLock className={styles.icon} />,
    name: "Logout",
    link: "/",
    onClick: () => {
      localStorage.clear();
      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
  },
];
const AccountDropDown = () => {
  return (
    <div className={styles.levelContainer}>
      <span className={styles.notch}></span>
      {userAccountItems?.map((item, i) => {
        return (
          <Link href={item?.link} key={i}>
            <a className={styles.secLink} onClick={item?.onClick}>
              {item?.icon}
              {item?.name}
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default AccountDropDown;
