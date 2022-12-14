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

export default function EditContractForm({ onAdd, onClose }) {
  const [contract, setContract] = useState({
    id: "",
    name: "",
    address: "",
    dni: "",
    email: "",
    phone: "",
    mobile: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    onAdd(users);
  };

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <ModalHeader toggle={onClose}>Editar Contrato</ModalHeader>
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
