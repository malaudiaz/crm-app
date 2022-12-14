import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import swal from 'sweetalert';

export default function LoginForm() {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("/api/auth/login", credentials);   
            if (res.status === 200) {
                router.push("/");
            }
        } catch(errors) { 
            swal("Error", "Nombre de usuario o contraseña incorrecta", "error");
        }

    };  
    
    return (                           
        <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>

            <div className="col-12">
                <label className="form-label">Usuario</label>
                <div className="input-group has-validation">
                    <input 
                        type="text" 
                        name="username" 
                        className="form-control has-validation" 
                        id="username" 
                        required 
                        onChange={(e) =>
                            setCredentials({
                            ...credentials,
                            username: e.target.value,
                            })
                        }            
                    />
                    <div className="invalid-feedback">Por favor entre su nombre de usuario.</div>
                </div>
            </div>

            <div className="col-12">
                <label className="form-label">Contraseña</label>
                <input 
                    type="password" 
                    name="password" 
                    className="form-control has-validation" 
                    id="password" 
                    required 
                    onChange={(e) =>
                        setCredentials({
                        ...credentials,
                        password: e.target.value,
                        })
                    }                            
                />
                <div className="invalid-feedback">Por favor entre su contraseña !</div>
            </div>

            <div className="col-12">
            </div>

            <div className="col-12">
                <button className="btn btn-primary w-100" type="submit">Aceptar</button>
            </div>

        </form>
    );
}
