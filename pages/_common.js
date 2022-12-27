import { jwtVerify } from "jose";

const getToken = async ( {crmToken} ) => {
    try {
        const { payload } = await jwtVerify(
            crmToken,
            new TextEncoder().encode(process.env.TOKEN_SECRET)
        );

        return payload.token;
    
    } catch (errors) {
        console.log(errors)
        return ""
    }    
};

const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": "es-ES,es;"
    }
};


export {getToken, config}