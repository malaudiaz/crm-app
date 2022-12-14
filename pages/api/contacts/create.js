import axios from 'axios';

export default async function createContact(req, res) {  
    const contact = req.body;
    let url = `${process.env.API_URL}contacts`;

    try {
        const response = await axios.post(url, contact);   
        if (response.status == 200) {
            return res.status(200).json({
                message: response.statusText
            });
        }
    } catch (errors) {
        return res.status(errors.response.status).json({ error: errors.response.statusText });
    }
};
