import { useState, useEffect, useRef } from "react";
import { Row, Col, Table, Button, InputGroup } from "reactstrap";
import ModalForm from "../Core/ModalForm";
import AddProdOfferForm from "../Offer/AddProdOffer";
import axios from "axios";
import Swal from 'sweetalert2'

const columns = [{ id: 1, title: "Código", accessor: "code" },
                 { id: 2, title: "Nombre", accessor: "name" }
];

export default function ProductForm({ session, setProducts, offer_id, onClose}) {

  console.log("****>", session.token);


  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [records, setRecords] = useState([]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const mounted = useRef(false);
  const rowsPerPage = 10;
  
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": session.locale,
      "Authorization": `Bearer ${session.token}`,
    },
  };  

  useEffect(() => {
    const fetchData = async () => {
      const url = `/api/products/services?page=${page}&per_page=${rowsPerPage}&offer_id=${offer_id}`;
      setLoading(true);
      try {
        const { data } = await axios.get(url, config);
        setLoading(false);

        setTotal(data.result.total);
        setTotalPages(data.result.total_pages);
        setRecords(data.result.data);
        
      } catch (error) {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al consultar el API',
          showConfirmButton: true,
        })        
      }

    };

    if (!mounted.current) {
      // do componentDidMount logic
      if (offer_id != "") {
        mounted.current = true;
        fetchData();
      }
    } else {
      // do componentDidUpdate logic
      if (reload) {
        fetchData();
      }
    }
  }, [reload]);

  const onItemCheck = (e, item) => {
    let tempList = records;
    tempList.map((row) => {
      if (row.id === item.id) {
        row.selected = e.target.checked;
      } else {
        row.selected = false;
      }
      return row;
    });

    setRecords(tempList);
    selected = records.filter((e) => e.selected);
    setSelected(selected);
  };

  const delProduct = async (product_id) => {
    const url = `/api/offers/services?id=${product_id}`;
    await axios
    .delete(url)
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Operación Exitosa',
        text: 'Producto eliminado a la Oferta con éxito',
        showConfirmButton: true,
      });                     
      setLoading(false);
    })
    .catch((errors) => {
      setLoading(false);
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al consultar la API',
        showConfirmButton: true,
      });           
        
    });

  }

  const onDelete = (event, row) => {
    event.preventDefault();
   
    Swal.fire({
      title: '¿ Estás seguro ?',
      text: "! Esta opción no podrá ser revertida !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',      
      reverseButtons: true,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        let item = records.find((e) => e.id === row.id);
        let tmp = [];
        records.map((record) => {
          if (record.id !== item.id) {
            tmp.push(record);
          }
        });
        delProduct(item.id);
        setRecords(tmp);
      }     
    })
  };

  
  const addProduct = (product) => {
    let tmp = records.length > 0 ? records : [];
    tmp.push(product);
    setRecords(tmp);
    setProducts(tmp);
    setOpenAdd(false);
  };

  
  return (
    <div style={{ padding: "8px" }}>
      <Row>
        <Col md={9} style={{ display: "flex", alignItems: "flex-end" }}>
          <h6>Productos</h6>
        </Col>
        <Col md={2}>
          <InputGroup style={{ paddingLeft: "50px" }}>
            <Button
              id="btnAddProduct"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setOpenAdd(true);
              }}
              color="primary"
              outline
              data-toggle="tooltip"
              title="Adicionar Productos"          >
              <i className="bi bi-plus-circle"></i>
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row style={{ paddingTop: "6px" }}>
        <Table bordered>
          <thead>
            <tr>
              <th style={{ width: "10p%", textAlign: "center" }}>
                <span className="custom-checkbox">
                  <input type="checkbox" id="selectAll" disabled />
                  <label htmlFor="selectAll"></label>
                </span>
              </th>    
              <th style={{ width: "10p%", textAlign: "center" }} scope="col" key={columns[0].id}>
                  {columns[0].title}
              </th>              
              <th style={{ width: "4p%", textAlign: "center" }} scope="col" key={columns[1].id}>
                {columns[1].title}
              </th>              
              <th style={{ textAlign: "center", width: "2%" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 &&
              records.map((row, i) => (
                <tr key={i}>
                  <td style={{ width: "10p%", textAlign: "center" }}>
                    <span className="custom-checkbox">
                      <input
                        type="checkbox"
                        id={`check` + i}
                        checked={row.selected}
                        onChange={(event) => onItemCheck(event, row)}
                      />
                      <label htmlFor={`check` + i}></label>
                    </span>
                  </td>
                  {columns.map((col, j) => (
                    <td key={j}>{row[col.accessor]}</td>
                  ))}
                  <td style={{ width: "20p%", textAlign: "center" }}>
                    <a
                      className={row.selected ? "delete" : "disabled"}
                      onClick={(event) => onDelete(event, row)}
                    >
                      <i
                        className="bi bi-trash-fill"
                        data-toggle="tooltip"
                        title="Eliminar"
                      ></i>
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
      <ModalForm id={"AddProdOfferForm"} open={openAdd}>
        <AddProdOfferForm session={session} onClose={() => setOpenEdit(false)} />
      </ModalForm>
    </div>
  );
}
