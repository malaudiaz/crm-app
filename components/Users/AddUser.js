import { useState } from "react";
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

export default function AddUserForm({ onAdd, onClose }) {
  const [users, setUsers] = useState({
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
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidate({
      ...validate,
      username: users.username != "" ? "success" : "error",
      dni: users.dni != "" ? "success" : "error",
      fullname: users.fullname != "" ? "success" : "error",
      email: users.email != "" ? "success" : "error",
      password: users.password != "" ? "success" : "error",
    });

    if (
      validate.username === "success" &&
      validate.dni === "success" &&
      validate.fullname === "success" &&
      validate.password === "success" &&
      validate.email === "success"
    ) {
      onAdd(users);
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
      <ModalHeader toggle={onClose}>Nuevo Usuario</ModalHeader>
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

          <Col md={6}>
            <FormGroup>
              <Label>Contraseña</Label>
              <InputGroup size="sm">
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Contraseña"
                  valid={validate.password === "success"}
                  invalid={validate.password === "error"}
                  value={users.password}
                  onChange={(e) => {
                    validForm(e);
                    handleChange(e);
                  }}
                />
                <FormFeedback>
                  Por favor teclee una contraseña valida.
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
