import axios from 'axios';

export default async function updatePartners(req, res) {
    const { id } = req.query;
    const partner = req.body;

    let url = `${process.env.API_URL}partners/${id}`;
    try {
        const response = await axios.put(url, partner)
        if (response.status == 200) {
            return res.status(200).json({
                message: response.statusText
            });
        }
    } catch (errors) {
        return res.status(errors.response.status).json({ error: errors.response.statusText });
    }
};
