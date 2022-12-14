import axios from 'axios';

export default async function updateContract(req, res) {
    const { id } = req.query;
    const contract = req.body;

    let url = `${process.env.API_URL}contracts/${id}`;
    try {
        const response = await axios.put(url, contract)
        if (response.status == 200) {
            return res.status(200).json({
                message: response.statusText
            });
        }
    } catch (errors) {
        return res.status(errors.response.status).json({ error: errors.response.statusText });
    }
};
