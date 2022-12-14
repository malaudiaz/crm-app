import axios from 'axios';

export default async function getPartners(req, res) {
    const { page, per_page, criteria_key, criteria_value } = req.query;

    let url = `${process.env.API_URL}contacts?page=${page}&per_page=${per_page}`;
    if (criteria_key && criteria_value) {
        url = url + `&criteria_key=${criteria_key}&criteria_value=${criteria_value}`;
    }

    try {
        const response = await axios.get(url)
        if (response.status == 200) {
            return res.status(200).json({
                result: response.data
            });
        }
    } catch (errors) {
        return res.status(errors.response.status).json({ error: errors.response.statusText });
    }
};
