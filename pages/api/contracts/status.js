import axios from 'axios'
import { getToken, config } from '../../_common';

export default async function status(req, res) {

    const token = await getToken(req.cookies);
    if (token) {
        config.headers['authorization'] = `Bearer ${token}`;
    }

    let url = `${process.env.API_URL}resources/status/contract/`;

    try {
        const response = await axios.get(url, config);
        if (response.status == 200) {
            return res.status(200).json({
                result: response.data
            });
        }
    } catch (errors) {
        console.log(errors);
        return res.status(errors.response.status).json({ error: errors.response.statusText });
    }

};
