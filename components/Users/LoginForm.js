import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from 'sweetalert2'
import { Col, Label, Form, FormGroup, InputGroup, Input, FormFeedback, Button, InputGroupText } from "reactstrap";
import Password from "../Core/Password";

export default function LoginForm() {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const [validate, setValidate] = useState({
        username: "",
        password: ""
      });
    

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setValidate({
            ...validate,
            username: credentials.username != "" ? "success" : "error",
            password: credentials.password != "" ? "success" : "error"
        });        

        if (validate.username === "success" && validate.password === "success") {
            try {
                const res = await axios.post("/api/auth/login", credentials);   
                if (res.status === 200) {
                    router.push("/");
                }
            } catch(errors) { 
                Swal.fire({
                    icon: 'error',
                    title: 'Atención',
                    text: 'Nombre de usuario o contraseña incorrecta',
                    showConfirmButton: true,
                });              
            }
        }
    };  

    const validForm = (event) => {
        const { target } = event;
        const value = target.value;
        const { name } = target;
    
        setValidate({
          ...validate,
          [name]: value != "" ? "success" : "error",
        });
    };
    
    const handleChange = (event) => {
        const { target } = event;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const { name } = target;
    
        setCredentials({
          ...credentials,
          [name]: value,
        });
    };    
    
    return (                           
        <Form className="form" onSubmit={handleSubmit}>
            <Col md={12}>
                <FormGroup>
                  <Label>Usuario</Label>
                    <InputGroup size="sm">
                        <InputGroupText>
                            <i className="bi bi-person-fill"></i>
                        </InputGroupText>                        
                        <Input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Usuario"
                            // valid={validate.username === "success"}
                            invalid={validate.username === "error"}
                            value={credentials.username}
                            onChange={(e) => {
                                validForm(e);
                                handleChange(e);
                            }}
                            onKeyPress={(event) => {
                                if (!/^[a-z_.\s]*$/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                        />
                        <FormFeedback>
                            Por favor teclee su nombre de usuario.
                        </FormFeedback>
                    </InputGroup>
                </FormGroup>
            </Col>
            <Col md={12}>
                <FormGroup>
                    <Label>Contraseña</Label>
                    <Password credentials={credentials} validate={validate} validForm={validForm} handleChange={handleChange}/>
                </FormGroup>
            </Col>
            <Col md={12}>
            </Col>
            <Col md={12} style={{textAlign: "end"}}>
                <Button type="submit" color="primary">
                    <i className="bi bi-check2-circle"></i> Aceptar
                </Button>
            </Col>
        </Form>
    );
}
