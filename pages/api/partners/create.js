import axios from 'axios';

export default async function createParners(req, res) {  
    const partner = req.body;
    let url = `${process.env.API_URL}partners`;

    try {
        const response = await axios.post(url, partner);   
        if (response.status == 200) {
            return res.status(200).json({
                message: response.statusText
            });
        }
    } catch (errors) {
        return res.status(errors.response.status).json({ error: errors.response.statusText });
    }
};
