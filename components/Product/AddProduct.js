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

export default function AddProductForm({ onAdd, onClose }) {
 
  const [product, setProduct] = useState({
    id: "",
    code: "",
    name: "",
    description: "",
    unit_price: "",
    sale_price: "",
    ledger_account: "",
    measure_id: ""
  });

  const [validate, setValidate] = useState({
    code: "",
    name: "",
    description: ""
    
  });  

  const productSubmit = async (e) => {
    e.preventDefault();

    setValidate({
      ...validate,
      code: product.code != "" ? "success" : "error",
      name: product.name != "" ? "success" : "error",
      description: product.description != "" ? "success" : "error"      
    });

    if (
      validate.code === "success" &&
      validate.name === "success" &&
      validate.description === "success"       
    ) {
      onAdd(product);
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

    setProduct({
      ...product,
      [name]: value,
    });
  };

  return (
    <Form className="form" onSubmit={productSubmit}>
      <ModalHeader toggle={onClose}>Nuevo Producto</ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <FormGroup>
              <Label>Código</Label>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="code"
                  id="code"
                  placeholder="Código"
                  valid={validate.code === "success"}
                  invalid={validate.code === "error"}
                  value={product.name}
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
                  Por favor teclee el código del producto.
                </FormFeedback>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
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
                  valid={validate.job === "success"}
                  invalid={validate.job === "error"}
                  value={product.description}
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
                  Por favor teclee el nombre del producto.
                </FormFeedback>           
              </InputGroup>
            </FormGroup>          
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>Descripción</Label>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Descripción"
                  valid={validate.address === "success"}
                  invalid={validate.address === "error"}
                  value={product.description}
                  onChange={(e) => {
                    validForm(e);
                    handleChange(e);
                  }}
                />
                <FormFeedback>
                  Por favor teclee la descripción del producto.
                </FormFeedback>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>Unidad de Medida</Label>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="dni"
                  id="dni"
                  maxLength={11}
                  placeholder="DNI"
                  valid={validate.dni === "success"}
                  invalid={validate.dni === "error"}
                  value={product.dni}
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
                  Por favor teclee el DNI del contacto.
                </FormFeedback>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Coreo</Label>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Correo"
                  valid={validate.email === "success"}
                  invalid={validate.email === "error"}
                  value={product.email}
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
                  Por favor teclee el correo del contacto.
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
                  value={product.phone}
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
                  value={product.mobile}
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
                  Por favor teclee el móvil del contacto.
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
          <i className="bi bi-check2-circle"></i> Aceptar
        </Button>
      </ModalFooter>
    </Form>
  );
}
