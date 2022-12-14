import axios from "axios";
import { getToken, config } from "../../_common";
import fs from "fs";

const getProfile = async (req, res) => {
  const { id } = req.query;
  let url = `${process.env.API_URL}users/${id}`;

  try {
    const response = await axios.get(url, config);

    if (response.status == 200) {
      const user = response.data;
      const userImage = `./public/profile/${user.id}.jpg`;

      const fileExists = fs.existsSync(userImage);
      if (fileExists) {
        // if (fs.existsSync(userImage)) fs.unlinkSync(userImage)
        user.photo = `/profile/${user.id}.jpg`;
      } else {
        user.photo = "/profile/empty.png";
      }

      return res.status(200).json({
        result: user,
      });
    }
  } catch (errors) {
    return res
      .status(errors.response.status)
      .json({ error: errors.response.statusText });
  }
};

const updProfile = async (req, res) => {
  const { id } = req.query;
  const user = req.body;
  const url = `${process.env.API_URL}users/${id}`;

  try {
    const response = await axios.put(url, user, config);
    if (response.status == 200) {
      if (user.photo === "/profile/empty.png") {
        const userImage = `./public/profile/${user.id}.jpg`;
        if (fs.existsSync(userImage)) fs.unlinkSync(userImage);
      }
      return res.status(200).json({
        message: response.statusText,
      });
    }
  } catch (errors) {
    return res
      .status(errors.response.status)
      .json({ error: errors.response.statusText });
  }
};

const changePassword = async (req, res) => {
  const { currentpassword, newpassword, renewpassword } = req.body;
  const url = `${process.env.API_URL}users/password`;

  const response = await axios.post(url, {
    current_password: currentpassword,
    new_password: newpassword,
    renew_password: renewpassword
  }, config);

  if (response.status == 200) {
    return res.status(200).json({
      message: "La contraseña ha sido cambiada",
    });
  } else {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }

};

export default async function profilemgr(req, res) {
  const token = await getToken(req.cookies);
  if (token) {
    config.headers["authorization"] = `Bearer ${token}`;
  }

  switch (req.method) {
    case "GET":
      return getProfile(req, res);
      break;
    case "POST":
      return changePassword(req, res);
      break;
    case "PUT":
      return updProfile(req, res);
      break;
    default:
      res.status(405).json({
        mensaje: `El método HTTP ${req.method} no esta disponible en esta ruta`,
      });
      break;
  }
}
