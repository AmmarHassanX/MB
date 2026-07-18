import { serialize } from "cookie";

export default function handler(req, res) {
  // Set a cookie using the 'Set-Cookie' header
  res.setHeader(
    "Set-Cookie",
    serialize("myCookie", "cookieValue", {
      httpOnly: true, // Makes it accessible only through HTTP (not JavaScript)
      secure: process.env.NODE_ENV !== "development", // Use 'secure' only in production
      maxAge: 60 * 60 * 24, // 1 day expiration
      path: "/", // Cookie available on all pages
    })
  );

  res.status(200).json({ message: "Cookie set" });
}
