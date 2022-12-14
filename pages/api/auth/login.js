import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import axios from 'axios';

export default async function loginHandler(req, res) {
  const { username, password } = req.body;

  const url = `${process.env.API_URL}login`;
  
  const response = await axios.post(url, {
    username: username,
    password: password
  });

  if (response.status == 200) {
    // expire in 30 days

    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        username,
        userid: response.data.user_id,
        fullname: response.data.fullname,
        job: response.data.job,
        token: response.data.token
      },
      process.env.TOKEN_SECRET
    );

    const serialized = serialize("crmToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json({
      message: "Login successful",
    });
  }

  return res.status(401).json({ error: "Invalid credentials" });
}
