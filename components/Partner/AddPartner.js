import { useState } from "react";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Row,
  Col,
  NavLink,
  FormGroup,
  Button,
  Label,
  InputGroup,
  Input,
  FormFeedback
} from "reactstrap";
import classnames from 'classnames';

export default function AddPartnerForm({ onAdd, onClose }) {
  const [partner, setPartner] = useState({
    id: "",
    type: "",
    name: "",
    address: "",
    dni: "",
    email: "",
    phone: "",
    mobile: "",
    nit: "",
  });

  const [activeTab, setActiveTab] = useState("1");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onAdd(users);
  };

  const toggle = (tab) => {
    if (activeTab !== tab) {
        setActiveTab(tab);
    }
  }  

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <ModalHeader toggle={onClose}>Nuevo Cliente</ModalHeader>
      <ModalBody>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              Cliente
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
            >
              Contáctos
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="6">
                <FormGroup>
                    <Label for="type">
                        Tipo
                    </Label>
                    <InputGroup size="sm">
                        <Input
                            id="type"
                            name="type"
                            type="select"
                            // value={filter.criteria_key}
                            // valid={validate.criteria_key === "success"}
                            // invalid={validate.criteria_key === "error"}
                            // onChange={(e) => {
                            //     validForm(e);
                            //     handleChange(e);
                            // }}
                        >
                            <option value="">Seleccione...</option>
                            <option value="username">Jurídico</option>
                            <option value="fullname">Natural</option>
                        </Input> 
                        <FormFeedback>
                          Por favor entre seleccione el críterio para el filtro.
                        </FormFeedback>
                    </InputGroup>
                </FormGroup>                
              </Col>
              <Col md={6}>
                  <FormGroup>
                        <Label for="nit">NIT</Label>
                        <InputGroup size="sm">
                            <Input
                                type="text"
                                name="nit"
                                id="nit"
                                maxLength={6}
                                placeholder="NIT"
                                // valid={validate.dni === "success"}
                                // invalid={validate.dni === "error"}
                                // value={users.dni}
                                // onChange={(e) => {
                                //     validForm(e);
                                //     handleChange(e);
                                // }}
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
            <Row>
                <Col md={12}>
                    <FormGroup>
                        <Label for="name">Nombre del Cliente</Label>
                        <InputGroup size="sm">
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Nombre del Cliente"
                                // valid={validate.username === "success"}
                                // invalid={validate.username === "error"}
                                // value={users.username}
                                // onChange={(e) => {
                                //     validForm(e);
                                //     handleChange(e);
                                // }}
                                onKeyPress={(event) => {
                                    if (!/^[a-zA-Z\s]*$/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                            />

                            <FormFeedback>
                                Por favor, teclee el nombre del cliente.
                            </FormFeedback>
                        </InputGroup>
                    </FormGroup>          
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <FormGroup>
                        <Label for="address">Dirección</Label>
                        <InputGroup size="sm">
                            <Input
                                type="text"
                                name="address"
                                id="address"
                                placeholder="Dirección"
                                // valid={validate.username === "success"}
                                // invalid={validate.username === "error"}
                                // value={users.username}
                                // onChange={(e) => {
                                //     validForm(e);
                                //     handleChange(e);
                                // }}
                                onKeyPress={(event) => {
                                    if (!/^[a-zA-Z\s]*$/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                            />

                            <FormFeedback>
                                Por favor, teclee la dirección del cliente.
                            </FormFeedback>
                        </InputGroup>
                    </FormGroup>          
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label for="dni">DNI/NIF</Label>
                        <InputGroup size="sm">
                            <Input
                                type="text"
                                name="dni"
                                id="dni"
                                maxLength={11}
                                placeholder="DNI/NIF"
                                // valid={validate.dni === "success"}
                                // invalid={validate.dni === "error"}
                                // value={users.dni}
                                // onChange={(e) => {
                                //     validForm(e);
                                //     handleChange(e);
                                // }}
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
                        <Label for="email">Correo</Label>
                        <InputGroup size="sm">
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Correo"
                                // valid={validate.email === "success"}
                                // invalid={validate.email === "error"}
                                // value={users.email}
                                // onChange={(e) => {
                                //     validForm(e);
                                //     handleChange(e);
                                // }}
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
            </Row>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label for="phone">Teléfono</Label>
                        <InputGroup size="sm">
                            <Input
                                type="text"
                                name="phone"
                                id="phone"
                                placeholder="Teléfono"
                                maxLength={8}
                                // value={users.phone}
                                // onChange={(e) => {
                                //     handleChange(e);
                                // }}
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
                        <Label for="movile">Móvil</Label>
                        <InputGroup size="sm">
                            <Input
                                type="text"
                                name="movile"
                                id="movile"
                                placeholder="Móvil"
                                maxLength={8}
                                // value={users.phone}
                                // onChange={(e) => {
                                //     handleChange(e);
                                // }}
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
          </TabPane>
          <TabPane tabId="2">
            <Row>
            </Row>
          </TabPane>
        </TabContent>
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
