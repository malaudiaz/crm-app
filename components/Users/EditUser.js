import { useState, useEffect } from "react";
import {
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    FormFeedback,
    Label,
    Input,
    Row,
    Col,
    InputGroup,
    Button,
} from "reactstrap";

export default function EditUserForm({record, onEdit, onClose}) {
    const [users, setUsers] = useState({
        id: "",
        username: "",
        fullname: "",
        dni: "",
        job: "",
        email: "",
        phone: "",
        password: ""
    });

    const [validate, setValidate] = useState({
        username: "",
        fullname: "",
        dni: "",
        email: ""
    });
    

    useEffect(()=>{
        if (record.length > 0) {
            setUsers({
                id: record[0].id,
                username: record[0].username,
                fullname: record[0].fullname,
                dni: record[0].dni,
                job: record[0].job,
                email: record[0].email,
                phone: record[0].phone
            })
            setValidate({
                username: record[0].username != "" ? "success" : "error",
                fullname: record[0].fullname != "" ? "success" : "error",
                dni: record[0].dni != "" ? "success" : "error",
                email: record[0].email != "" ? "success" : "error"
            })
        }
    }, [record]);

    const handleSubmit = async (e) => {
        e.preventDefault();    

        setValidate({
            ...validate,
            username: users.username != "" ? "success" : "error",
            dni: users.dni != "" ? "success" : "error",
            fullname: users.fullname != "" ? "success" : "error",
            email: users.email != "" ? "success" : "error"
        });
      
        if (
            validate.username === "success" &&
            validate.dni === "success" &&
            validate.fullname === "success" &&
            validate.email === "success"
        ) {
            onEdit(users);
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
    
        setUsers({
          ...users,
          [name]: value,
        });
    };  

    return (
        <Form className="form" onSubmit={handleSubmit}>
            <ModalHeader toggle={onClose}>Editar Usuario</ModalHeader>
            <ModalBody>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label>Nombre de Usuario</Label>
                            <InputGroup size="sm">
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Nombre de Usuario"
                                valid={validate.username === "success"}
                                invalid={validate.username === "error"}
                                value={users.username}
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
                                Por favor teclee el nombre de usuario.
                            </FormFeedback>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label>DNI</Label>
                            <InputGroup size="sm">
                                <Input
                                    type="text"
                                    name="dni"
                                    id="dni"
                                    maxLength={11}
                                    placeholder="DNI"
                                    valid={validate.dni === "success"}
                                    invalid={validate.dni === "error"}
                                    value={users.dni}
                                    onChange={(e) => {
                                        validForm(e);
                                        handleChange(e);
                                    }}
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                                <FormFeedback>Por favor entre el DNI del usuario.</FormFeedback>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>

                <Col md={12}>
                    <FormGroup>
                    <Label>Nombre y Apellidos</Label>
                    <InputGroup size="sm">
                        <Input
                        type="text"
                        name="fullname"
                        id="fullname"
                        placeholder="Nombre y Apellidos"
                        valid={validate.fullname === "success"}
                        invalid={validate.fullname === "error"}
                        value={users.fullname}
                        onChange={(e) => {
                            validForm(e);
                            handleChange(e);
                        }}
                        onKeyPress={(event) => {
                            if (!/^[a-zA-Z\s]*$/.test(event.key)) {
                            event.preventDefault();
                            }
                        }}
                        />
                        <FormFeedback>
                        Por favor entre el Nombre y los Apellidos del usuario.
                        </FormFeedback>
                    </InputGroup>
                    </FormGroup>
                </Col>
        
                <Col md={12}>
                    <FormGroup>
                    <Label>Cargo</Label>
                    <InputGroup size="sm">
                        <Input
                        type="text"
                        name="job"
                        id="job"
                        placeholder="Cargo"
                        value={users.job}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        onKeyPress={(event) => {
                            if (!/^[a-zA-Z\s]*$/.test(event.key)) {
                            event.preventDefault();
                            }
                        }}
                        />
                    </InputGroup>
                    </FormGroup>
                </Col>
        
                <Col md={12}>
                    <FormGroup>
                    <Label>Correo</Label>
                    <InputGroup size="sm">
                        <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Correo"
                        valid={validate.email === "success"}
                        invalid={validate.email === "error"}
                        value={users.email}
                        onChange={(e) => {
                            validForm(e);
                            handleChange(e);
                        }}
                        onKeyPress={(event) => {
                            if (!/^[a-z@_.\s]*$/.test(event.key)) {
                            event.preventDefault();
                            }
                        }}
                        />
                        <FormFeedback>
                        Por favor entre el correo del usuario.
                        </FormFeedback>
                    </InputGroup>
                    </FormGroup>
                </Col>
    
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label>Teléfono</Label>
                            <InputGroup size="sm">
                                <Input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    placeholder="Teléfono"
                                    maxLength={8}
                                    value={users.phone}
                                    onChange={(e) => {
                                    handleChange(e);
                                    }}
                                    onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                    }}
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>       
                </Row>
            </ModalBody>
    
            <ModalFooter>
                <Button type="button" onClick={onClose} color="secondary">
                    <i className="bi bi-x-circle"></i> Cerrar
                </Button>
                <Button type="submit" color="primary">
                    <i className="bi bi-check2-circle"></i> Grabar
                </Button>
            </ModalFooter>
        </Form>
    )
};
