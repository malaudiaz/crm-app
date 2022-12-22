import { useState } from "react";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  InputGroup,
  Input,
  FormFeedback
} from "reactstrap";
import FinderContact from "../Contact/FinderContact";
import FinderPartner from "../Partner/FinderPartner";

export default function AddContractForm({ onAdd, onClose }) {

  const [contract, setContract] = useState({
    id: "",
    number: "",
    id_partner: "",
    id_contact: "",
    initial_aproved_import: "",
    sign_by: "",
    sign_date: "",
    status: ""
  });

  const [validate, setValidate] = useState({
    name: "",
    address: "",
    dni: "",
    email: "",
    phone: "",
    mobile: ""
  });  

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidate({
      ...validate,
      name: users.name != "" ? "success" : "error",
      address: users.address != "" ? "success" : "error",
      dni: users.dni != "" ? "success" : "error",
      email: users.email != "" ? "success" : "error",
      phone: users.phone != "" ? "success" : "error",
      mobile: users.mobile != "" ? "success" : "error"
    });

    if (
      validate.name === "success" &&
      validate.address === "success" &&
      validate.dni === "success" &&
      validate.email === "success" &&
      validate.mobile === "success"
    ) {
      onAdd(contact);
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
      <ModalHeader toggle={onClose}>Nuevo Contrato</ModalHeader>
      <ModalBody>
        <Col md={12}>
          <FormGroup>
              <Label for="number">Número</Label>
              <InputGroup size="sm">
                  <Input
                      type="text"
                      name="number"
                      id="number"
                      maxLength={8}
                      placeholder="Número de Contrato"
                      valid={validate.number === "success"}
                      invalid={validate.number === "error"}
                      value={contract.number}
                      onChange={(e) => {
                          validForm(e);
                          handleChange(e);
                      }}
                      onKeyPress={(event) => {
                          if (!/[0-9/]/.test(event.key)) {
                          event.preventDefault();
                          }
                      }}
                  />   
                  <FormFeedback>
                    Por favor, teclee el número del contrato.
                  </FormFeedback>                                                  
              </InputGroup>
          </FormGroup>
        </Col>
        <Col md={12}>
          <FormGroup>
              <Label for="partner">Cliente</Label>
              <FinderPartner />
          </FormGroup>
        </Col>
        <Col md={12}>
          <FormGroup>
              <Label for="contact">Contácto</Label>
              <FinderContact />
          </FormGroup>
        </Col>
        <Col md={12}>
          <FormGroup>
              <Label for="initial_aproved_import">Monto Contratado</Label>
              <InputGroup size="sm">
                  <Input
                      type="text"
                      name="initial_aproved_import"
                      id="initial_aproved_import"
                      maxLength={8}
                      placeholder="Monto Contratado"
                      valid={validate.initial_aproved_import === "success"}
                      invalid={validate.initial_aproved_import === "error"}
                      value={contract.initial_aproved_import}
                      onChange={(e) => {
                          validForm(e);
                          handleChange(e);
                      }}
                      onKeyPress={(event) => {
                          if (!/[0-9.]/.test(event.key)) {
                          event.preventDefault();
                          }
                      }}
                  />   
                  <FormFeedback>
                    Por favor, teclee el monto contratado del contrato.
                  </FormFeedback>                                                  
              </InputGroup>
          </FormGroup>
        </Col>
        <Col sm="12">
          <FormGroup>
              <Label for="status">Estado</Label>
              <InputGroup size="sm">
                <Input
                    id="status"
                    name="status"
                    type="select"
                    value={contract.status}
                    valid={validate.status === "success"}
                    invalid={validate.status === "error"}
                    onChange={(e) => {
                        validForm(e);
                        handleChange(e);
                    }}
                >
                    <option value="">Seleccione...</option>
                    <option value="delivered">Entregado</option>
                    <option value="received">Recivido</option>
                    <option value="approved">Aprobado</option>
                    <option value="cancelled">Cancelado</option>
                </Input> 
                <FormFeedback>
                  Por favor, seleccione el tipo de cliente.
                </FormFeedback>
            </InputGroup>
          </FormGroup>                
        </Col>
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
