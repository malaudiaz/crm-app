import axios from 'axios';
import { getToken, config } from '../../_common';

const getContracts = async (req, res) => {
    const { page, per_page, criteria_key, criteria_value } = req.query;
    let url = `${process.env.API_URL}contracts?page=${page}&per_page=${per_page}`;
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

const createContract = async (req, res) => {
    const contract = req.body;
    const url = `${process.env.API_URL}contracts`;
    try {
        const response = await axios.post(url, contract, config);   
        if (response.status == 200) {
            return res.status(200).json({
                message: response.statusText
            });
        }
    } catch (errors) {
        return res.status(errors.response.status).json({ error: errors.response.statusText });
    }
};

const updateContract = async (req, res) => {
    const { id } = req.query;
    const contract = req.body;
    const url = `${process.env.API_URL}contracts/${id}`;

    try {
        const response = await axios.put(url, contract, config);
        if (response.status == 200) {
            return res.status(200).json({
                message: response.statusText
            });
        }
    } catch (errors) {
        return res.status(errors.response.status).json({ error: errors.response.statusText });
    }
};

const deleteContract = async (req, res) => {
    const { id } = req.query;
    const url = `${process.env.API_URL}contracts/${id}`;
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
        return getContracts(req, res);      
        break;
      case "POST":
        // Nuestra l??gica de c??digo para el m??todo POST...
        return createContract(req, res);
        break;
      case "PUT":
        // Nuestra l??gica de c??digo para el m??todo PUT...
        return updateContract(req, res);
        break;
      case "DELETE":
        // Nuestra l??gica de c??digo para el m??todo DELETE...
        return deleteContract(req, res);
        break;
      default:
        res.status(405).json({
          mensaje: `El m??todo HTTP ${req.method} no esta disponible en esta ruta`,
        });
        break;
    }
};
