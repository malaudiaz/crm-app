import axios from "axios";
import { config } from "../../_common";

export default async function status(req, res) {
  if (req.headers["authorization"]) {
    config.headers["Authorization"] = req.headers["authorization"];

    let url = `${process.env.API_URL}resources/status/contract/`;

    try {
      const response = await axios.get(url, config);
      if (response.status == 200) {
        return res.status(200).json({
          result: response.data,
        });
      }
    } catch (errors) {
      console.log(errors);
      return res
        .status(errors.response.status)
        .json({ error: errors.response.statusText });
    }
  } else {
    res.status(401).json({
      mensaje: "Esquema de Autentificación erróneo",
    });
  }
}
