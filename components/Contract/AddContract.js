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

export default function AddContractForm({ onAdd, onClose }) {

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
