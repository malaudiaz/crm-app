import { jwtVerify } from "jose";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "accept-Language": "es-ES,es;"
  }
}

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
}

const getServerProps = async (req, res) => {
    const { crmToken } = req.cookies;
    try {
      const { payload } = await jwtVerify(
        crmToken,
        new TextEncoder().encode(process.env.TOKEN_SECRET)
      );
      return {
        props: {
          user: {
            userid: payload.userid,
            username: payload.username,
            fullname: payload.fullname,
            job: payload.job,
          },
          rowsPerPage: process.env.ROW_PER_PAGE
        },
      };
    } catch (error) {
      return {
        props: { user: { username: "", fullname: "", job: payload.job },  rowsPerPage: process.env.ROW_PER_PAGE},
      };
    }    
}


export {config, getToken, getServerProps}