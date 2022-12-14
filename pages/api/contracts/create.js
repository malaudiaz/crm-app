import axios from 'axios';

export default async function createContract(req, res) {  
    const contract = req.body;
    let url = `${process.env.API_URL}contracts`;

    try {
        const response = await axios.post(url, contract);   
        if (response.status == 200) {
            return res.status(200).json({
                message: response.statusText
            });
        }
    } catch (errors) {
        return res.status(errors.response.status).json({ error: errors.response.statusText });
    }
};
