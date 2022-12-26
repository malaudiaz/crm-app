import { useState } from "react";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Col,
  FormGroup,
  Button,
  Label,
  InputGroup,
  Input,
  FormFeedback,
} from "reactstrap";

import FinderContact from "../Contact/FinderContact";
import FinderPartner from "../Partner/FinderPartner";
import SignUser from "../Users/SignUsers";
import ContractStatus from "./ContractStatus";

export default function AddContractForm({ onAdd, onClose }) {
  const [contract, setContract] = useState({
    id: "",
    number: "",
    id_partner: "",
    name_partner: "",
    id_contact: "",
    name_contact: "",
    initial_aproved_import: "",
    sign_by: "",
    sign_date: "",
    status: "",
  });

  const [validate, setValidate] = useState({
    number: "",
    id_partner: "",
    id_contact: "",
    initial_aproved_import: "",
    sign_by: "",
    sign_date: "",
    status: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidate({
      ...validate,
      number: contract.number != "" ? "success" : "error",
      id_partner: contract.id_partner != "" ? "success" : "error",
      id_contact: contract.id_contact != "" ? "success" : "error",
      initial_aproved_import:
        contract.initial_aproved_import != "" ? "success" : "error",
      sign_by: contract.sign_by != "" ? "success" : "error",
      sign_date: contract.sign_date != "" ? "success" : "error",
      status: contract.status != "" ? "success" : "error",
    });

    if (
      validate.number === "success" &&
      validate.id_partner === "success" &&
      validate.id_contact === "success" &&
      validate.initial_aproved_import === "success" &&
      validate.sign_by === "success" &&
      validate.sign_date === "success" &&
      validate.status === "success"
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

    setContract({
      ...contract,
      [name]: value,
    });
  };

  const setContact = (record) => {
    setContract({
      ...contract,
      id_contact: record.id,
      name_contact: record.name,
    });
  };

  const setPartner = (record) => {
    setContract({
      ...contract,
      id_partner: record.id,
      name_partner: record.name,
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
            <FinderPartner changePartner={setPartner} />
          </FormGroup>
        </Col>
        <Col md={12}>
          <FormGroup>
            <Label for="contact">Contácto</Label>
            <FinderContact
              changeContact={setContact}
              partner_id={contract.id_partner}
            />
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
                Por favor, teclee el monto contratado.
              </FormFeedback>
            </InputGroup>
          </FormGroup>
        </Col>
        <Col md={12}>
          <FormGroup>
            <Label for="signuser">Firmado por</Label>
            <SignUser />
          </FormGroup>
        </Col>
        <Col md={12}>
          <FormGroup>
            <Label for="signdate">Fecha</Label>
            <InputGroup size="sm">
              <Input
                id="signdate"
                name="signdate"
                placeholder="Fecha de Firma"
                type="date"
              />
            </InputGroup>
          </FormGroup>
        </Col>
        <Col sm="12">
          <FormGroup>
            <Label for="status">Estado</Label>
            <ContractStatus />
          </FormGroup>
        </Col>
      </ModalBody>
      <ModalFooter>
        <Button
          type="button"
          onClick={onClose}
          color="secondary"
          data-toggle="tooltip"
          title="Cerrar"
        >
          <i className="bi bi-x-circle"></i> Cerrar
        </Button>
        <Button
          type="submit"
          color="primary"
          data-toggle="tooltip"
          title="Aceptar"
        >
          <i className="bi bi-check2-circle"></i> Grabar
        </Button>
      </ModalFooter>
    </Form>
  );
}
