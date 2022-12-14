import { useState, useEffect } from "react";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Form,
  Button,
  Label,
  FormGroup,
  InputGroup,
  Input,
  FormFeedback
} from "reactstrap";

export default function EditContactForm({ record, onEdit, onClose }) {
  const [contact, setContact] = useState({
    id: "",
    name: "",
    address: "",
    dni: "",
    email: "",
    phone: "",
    mobile: "",
  });

  const [validate, setValidate] = useState({
    name: "",
    address: "",
    dni: "",
    email: "",
    phone: "",
    mobile: ""
  });  

  useEffect(()=>{
    if (record.length > 0) {
        setContact({
            id: record[0].id,
            name: record[0].name,
            address: record[0].address,
            dni: record[0].dni,
            email: record[0].email,
            phone: record[0].phone,
            mobile: record[0].mobile
        })
        setValidate({
          name: record[0].name != "" ? "success" : "error",
          address: record[0].address != "" ? "success" : "error",
          dni: record[0].dni != "" ? "success" : "error",
          email: record[0].email != "" ? "success" : "error",
          phone: record[0].phone != "" ? "success" : "error",
          mobile: record[0].mobile != "" ? "success" : "error"
        })
    }
  }, [record]);  

  const handleSubmit = async (e) => {
    e.preventDefault();    

    setValidate({
        ...validate,
        name: contact.name != "" ? "success" : "error",
        address: contact.address != "" ? "success" : "error",
        dni: contact.dni != "" ? "success" : "error",
        email: contact.email != "" ? "success" : "error",
        phone: contact.phone != "" ? "success" : "error",
        mobile: contact.mobile != "" ? "success" : "error"
    });
  
    if (
        validate.name === "success" &&
        validate.address === "success" &&
        validate.dni === "success" &&
        validate.email === "success" &&
        validate.phone === "success" &&
        validate.mobile === "success"
    ) {
        onEdit(contact);
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

    setContact({
      ...contact,
      [name]: value,
    });
  };  

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <ModalHeader toggle={onClose}>Editar Contacto</ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <FormGroup>
              <Label>Nombre</Label>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Nombre"
                  valid={validate.name === "success"}
                  invalid={validate.name === "error"}
                  value={contact.name}
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
                  Por favor, teclee el nombre del contacto.
                </FormFeedback>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>Dirección</Label>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Dirección"
                  valid={validate.address === "success"}
                  invalid={validate.address === "error"}
                  value={contact.address}
                  onChange={(e) => {
                    validForm(e);
                    handleChange(e);
                  }}
                />
                <FormFeedback>
                  Por favor, teclee la dirección del contacto.
                </FormFeedback>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
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
                  value={contact.dni}
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
                <FormFeedback>
                  Por favor, teclee el DNI del contacto.
                </FormFeedback>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Correo</Label>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Correo"
                  valid={validate.email === "success"}
                  invalid={validate.email === "error"}
                  value={contact.email}
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
                  Por favor, teclee el correo del contacto.
                </FormFeedback>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>Teléfono</Label>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="phone"
                  id="phone"
                  maxLength={8}
                  placeholder="Teléfono"
                  valid={validate.phone === "success"}
                  invalid={validate.phone === "error"}
                  value={contact.phone}
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
                <FormFeedback>
                  Por favor teclee el teléfono del contacto.
                </FormFeedback>
              </InputGroup>
            </FormGroup>          
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Móvil</Label>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="mobile"
                  id="mobile"
                  placeholder="Móvil"
                  maxLength={8}
                  valid={validate.mobile === "success"}
                  invalid={validate.mobile === "error"}
                  value={contact.mobile}
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
                <FormFeedback>
                  Por favor, teclee el móvil del contacto.
                </FormFeedback>
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
  );
}
