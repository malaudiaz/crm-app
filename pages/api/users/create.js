import axios from 'axios';

export default async function createUsers(req, res) {  
    const user = req.body;
    let url = `${process.env.API_URL}users`;

    try {
        const response = await axios.post(url, user);   
        if (response.status == 200) {
            return res.status(200).json({
                message: response.statusText
            });
        }
    } catch (errors) {
        return res.status(errors.response.status).json({ error: errors.response.statusText });
    }
};