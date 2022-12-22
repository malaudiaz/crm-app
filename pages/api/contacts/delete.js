import axios from 'axios';

export default async function deleteContact(req, res) {
    const { id } = req.query;

    let url = `${process.env.API_URL}contacts/${id}`;
    try {
        const response = await axios.delete(url)
        if (response.status == 200) {
            return res.status(200).json({
                message: response.statusText
            });
        }
    } catch (errors) {
        return res.status(errors.response.status).json({ error: errors.response.statusText });
    }
};