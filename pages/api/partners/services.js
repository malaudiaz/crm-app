import axios from 'axios';
import { getToken, config } from '../../_common';

const getPartner = async (req, res) => {
    const { page, per_page, criteria_key, criteria_value } = req.query;
    let url = `${process.env.API_URL}partners?page=${page}&per_page=${per_page}`;
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

const createPartner = async (req, res) => {
    const partner = req.body;
    const url = `${process.env.API_URL}partners`;

    try {
        const response = await axios.post(url, partner, config);   
        if (response.status == 200) {
            return res.status(200).json({
                message: response.statusText
            });
        }
    } catch (errors) {
        return res.status(errors.response.status).json({ error: errors.response.statusText });
    }
};

const updatePartner = async (req, res) => {
    const { id } = req.query;
    const partner = req.body;
    const url = `${process.env.API_URL}partners/${id}`;

    try {
        const response = await axios.put(url, partner, config);
        if (response.status == 200) {
            return res.status(200).json({
                message: response.statusText
            });
        }
    } catch (errors) {
        return res.status(errors.response.status).json({ error: errors.response.statusText });
    }
};

const deletePartner = async (req, res) => {
    const { id } = req.query;
    const url = `${process.env.API_URL}partners/${id}`;
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

export default async function partnermgr(req, res) {

    const token = await getToken(req.cookies);
    if (token) {
        config.headers['authorization'] = `Bearer ${token}`;
    }

    switch (req.method) {
      case "GET":
        // Nuestra l??gica de c??digo para el m??todo GET...
        return getPartner(req, res);      
        break;
      case "POST":
        // Nuestra l??gica de c??digo para el m??todo POST...
        return createPartner(req, res);
        break;
      case "PUT":
        // Nuestra l??gica de c??digo para el m??todo PUT...
        return updatePartner(req, res);
        break;
      case "DELETE":
        // Nuestra l??gica de c??digo para el m??todo DELETE...
        return deletePartner(req, res);
        break;
      default:
        res.status(405).json({
          mensaje: `El m??todo HTTP ${req.method} no esta disponible en esta ruta`,
        });
        break;
    }
};
