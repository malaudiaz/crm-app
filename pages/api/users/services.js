import axios from 'axios';
import { getToken, config } from '../../_common';

const getUsers = async (req, res) => {
    const { page, per_page, criteria_key, criteria_value } = req.query;
    let url = `${process.env.API_URL}users?page=${page}&per_page=${per_page}`;
    if (criteria_key && criteria_value) {
        url = url + `&criteria_key=${criteria_key}&criteria_value=${criteria_value}`;
    }
    try {
        const response = await axios.get(url, config);
        if (response.status == 200) {
            return res.status(200).json({
                result: response.data
            });
        }
    } catch (errors) {
        return res.status(errors.response.status).json({ error: errors.response.statusText });
    }
};

const createUser = async (req, res) => {
    const user = req.body;
    const url = `${process.env.API_URL}users`;
    try {
        const response = await axios.post(url, user, config);   
        if (response.status == 200) {
            return res.status(200).json({
                message: response.statusText
            });
        }
    } catch (errors) {
        return res.status(errors.response.status).json({ error: errors.response.statusText });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.query;
    const user = req.body;
    const url = `${process.env.API_URL}users/${id}`;

    try {
        const response = await axios.put(url, user, config);
        if (response.status == 200) {
            return res.status(200).json({
                message: response.statusText
            });
        }
    } catch (errors) {
        return res.status(errors.response.status).json({ error: errors.response.statusText });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.query;
    const url = `${process.env.API_URL}users/${id}`;
    try {
        const response = await axios.delete(url, config);
        if (response.status == 200) {
            return res.status(200).json({
                message: response.statusText
            });
        }
    } catch (errors) {
        return res.status(errors.response.status).json({ error: errors.response.statusText });
    }
};

export default async function usermgr(req, res) {

    const token = await getToken(req.cookies);
    if (token) {
        config.headers['authorization'] = `Bearer ${token}`;
    }

    switch (req.method) {
      case "GET":
        // Nuestra l??gica de c??digo para el m??todo GET...
        return getUsers(req, res);      
        break;
      case "POST":
        // Nuestra l??gica de c??digo para el m??todo POST...
        return createUser(req, res);
        break;
      case "PUT":
        // Nuestra l??gica de c??digo para el m??todo PUT...
        return updateUser(req, res);
        break;
      case "DELETE":
        // Nuestra l??gica de c??digo para el m??todo DELETE...
        return deleteUser(req, res);
        break;
      default:
        res.status(405).json({
          mensaje: `El m??todo HTTP ${req.method} no esta disponible en esta ruta`,
        });
        break;
    }
};
