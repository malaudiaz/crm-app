import { useState, useEffect, useRef } from "react";
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

import axios from "axios";
import Swal from 'sweetalert2'
import LoadingForm from "../Core/Loading";
import { formatNumber } from "../../data";

export default function EditProducttForm({ session, record, onEdit, onClose }) {
  const mounted = useRef(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    id: "",
    code: "",
    name: "",
    description: "",
    unit_price: "",
    cost_price: "",
    sale_price: "",
    measure_id: "",
    ledger_account: ""
  });

  const [validate, setValidate] = useState({
    code: "",
    name: "",
    description: "",
    cost_price: ""
  }); 

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": session.locale,
      "Authorization": `Bearer ${session.token}`,
    },
  };  

  const [measures, setMeasures] = useState([]);

  useEffect(()=>{
    if (record.length > 0) {
        setProduct({
            id: record[0].id,
            code: record[0].code,
            name: record[0].name,
            description: record[0].description,
            unit_price: record[0].unit_price,
            cost_price: record[0].cost_price,
            sale_price: record[0].sale_price,
            measure_id: record[0].measure_id,
            ledger_account: record[0].ledger_account
        })
        setValidate({
          name: record[0].name != "" ? "success" : "error",
          code: record[0].code != "" ? "success" : "error",
          description: record[0].description != "" ? "success" : "error",
          cost_price: record[0].cost_price != "" ? "success" : "error"
        })
    };

    const fetchData = async () => {
      const url = `/api/measure/services`;
      try {
        const { data } = await axios.get(url, config);
        console.log(data.result.data)
        setMeasures(data.result.data);
      } catch (error) {
        console.log(error);
        // setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al consultar la API',
          showConfirmButton: true,
        });
      }
    };

    if (!mounted.current) {
      mounted.current = true;   
      fetchData();  
    }
    // fetchData();    
    
  }, [record]);  

  const handleSubmit = async (e) => {
    e.preventDefault();    

    setValidate({
        ...validate,
        name: product.name != "" ? "success" : "error",
        code: product.code != "" ? "success" : "error",
        description: product.description != "" ? "success" : "error",
        cost_price: product.cost_price != "" ? "success" : "error",
    });
  
    if (
      validate.name === "success" &&
      validate.description === "success" &&
      validate.code === "success" &&
      validate.cost_price === "success"
    ) {

      setLoading(true);
      const url = `/api/product/services?id=${product.id}`
      try {
        await axios.put(url, product);
        setLoading(false);
      } catch (errors) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al consultar la API',
          showConfirmButton: true,
        });           
      }
      Swal.fire({
        icon: 'success',
        title: 'Operación Exitosa',
        text: 'Producto modificado con éxito',
        showConfirmButton: true,
      });      
      onEdit(product); 
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
    <Form className="form" onSubmit={handleSubmit}>
      <ModalHeader toggle={onClose}>Editar Product</ModalHeader>
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
                  value={product.code}
                  onChange={(e) => {
                    validForm(e);
                    handleChange(e);
                  }}
                  // onKeyPress={(event) => {
                  //   if (!/^[a-zA-Z\s]*$/.test(event.key)) {
                  //     event.preventDefault();
                  //   }
                  // }}
                />
                <FormFeedback>
                  Por favor, teclee el código del producto.
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
                  valid={validate.name === "success"}
                  invalid={validate.name === "error"}
                  value={product.name}
                  onChange={(e) => {
                    validForm(e);
                    handleChange(e);
                  }}
                  // onKeyPress={(event) => {
                  //   if (!/^[a-zA-Z\s]*$/.test(event.key)) {
                  //     event.preventDefault();
                  //   }
                  // }}
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
                  valid={validate.description === "success"}
                  invalid={validate.description === "error"}
                  value={product.description}
                  onChange={(e) => {
                    validForm(e);
                    handleChange(e);
                  }}
                />
                <FormFeedback>
                  Por favor, teclee la descripción del producto.
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
                  type="select"
                  name="measure_id"
                  id="measure_id"
                  value={String(product.measure_id)}
                  onChange={(e) => {
                    validForm(e);
                    handleChange(e);
                  }}                
                >
                  {/* <option value="">Seleccione...</option> */}
                  {measures.map((measures) => {
                    return (
                      <option key="measure_id" value={measures.id}>{measures.description}</option>
                    );
                  })}
                </Input>                
              </InputGroup>
            </FormGroup>
          </Col>          
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>Precio Costo</Label>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="cost_price"
                  id="cost_price"
                  placeholder="Precio Costo"
                  valid={validate.cost_price === "success"}
                  invalid={validate.cost_price === "error"}
                  value={formatNumber(String(product.cost_price))}
                  onChange={(e) => {
                    validForm(e);
                    handleChange(e);
                  }}
                  onKeyPress={(event) => {
                    if (/[^0-9.]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Precio Venta</Label>
              <InputGroup size="sm">
                <Input
                  type="text"
                  name="sale_price"
                  id="sale_price"
                  placeholder="Precio Venta"
                  valid={validate.sale_price === "success"}
                  invalid={validate.sale_price === "error"}
                  value={formatNumber(product.sale_price)}
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
                  Por favor teclee el precio de venta del producto.
                </FormFeedback>
              </InputGroup>
            </FormGroup>          
          </Col>          
        </Row>        
      </ModalBody>
      <ModalFooter>
        <Button type="submit" color="primary">
          <i className="bi bi-check2-circle"></i> Salvar
        </Button>
        <Button type="button" onClick={onClose} color="secondary">
          <i className="bi bi-x-circle"></i> Cerrar
        </Button>        
      </ModalFooter>
      <LoadingForm
        id={"loading"}
        open={loading}
        size='sm'
        waitMsg={"Por favor, espere"}
      />

    </Form>
  );
}
