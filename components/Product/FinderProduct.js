import { useState, useEffect } from "react";

import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Button,
  InputGroup,
  InputGroupText,
  Input,
  FormFeedback,
} from "reactstrap";

import ModalForm from "../Core/ModalForm";
import DataTable from "../Core/DataTable";
import Pagination from "../Core/Pagination";
import axios from "axios";
import Swal from 'sweetalert2'

const columns = [
  { id: 1, title: "Nombre", accessor: "name" },
  { id: 2, title: "DNI", accessor: "dni" },
];

export default function FinderProduct({ session, id, changeProduct, product}) {
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState(null);
  const [product, setProduct] = useState("");
  const [openFinderProduct, setOpenFinderProduct] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 10;

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "accept-Language": session.locale,
      "Authorization": `Bearer ${session.token}`
    },
  };    

  const fetchData = async () => {
    const url = `/api/product/services?page=${page}&per_page=${rowsPerPage}&product_id=${product.id_product}`;
    setLoading(true);
    try {
      const { data } = await axios.get(url, config);
      setLoading(false);

      setTotal(data.result.total);
      setTotalPages(data.result.total_pages);
      setRecords(data.result.data);

      if (data.result.data.length == 0) {
        Swal.fire({
          icon: 'info',
          title: 'Información',
          text: 'No existen productos que cumplan con el criterio de búsqueda',
          showConfirmButton: true,
        });           
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al consultar la API',
        showConfirmButton: true,
      });           
    }
  };


  useEffect(() => {
    setProduct(product.name_product);
  },[product.name_product]);

  const onChangePage = (pageNumber) => {
    setPage(pageNumber);
    fetchData();
  };

  const onOpenFinder = () => {
    if (product.id_product !== "") {
        fetchData();      
        setOpenFinderProduct(true);
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Atención',
        text: 'Debe seleccionar un producto, antes de seleccionar el contácto',
        showConfirmButton: true,
      });         
    }
  };

  const onCloseFinder = () => {
    setRecord(null);
    setRecords([]);
    setOpenFinderPartner(false);
  };

  const onAcceptFinder = () => {
    setProduct(record.name);

    changeProduct(record);
    onCloseFinder();
  };

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

    record = records.filter((e) => e.selected)[0];
    setRecord(record);
  };

  return (
    <InputGroup size="sm">
      <Input
        id={id}
        type="text"
        name={id}
        placeholder="Contácto"
        value={contact}
        readOnly
      />
      <InputGroupText>
        <a
          style={{ cursor: "pointer" }}
          onClick={onOpenFinder}
          data-toggle="tooltip"
          title="Buscar contácto"
        >
          <i className="bi bi-search"></i>
        </a>
      </InputGroupText>
      <FormFeedback>Por favor seleccione el contácto</FormFeedback>

      <ModalForm id={"finderPartner"} open={openFinderPartner}>
        <ModalHeader toggle={onCloseFinder}>Contáctos</ModalHeader>
        <ModalBody>
          {records.length > 0 && (
            <>
              <Row>
                <DataTable
                  records={records}
                  columns={columns}
                  onItemCheck={onItemCheck}
                />
              </Row>

              <Row>
                <Pagination
                  onChangePage={onChangePage}
                  currentPage={page}
                  totalPage={totalPages}
                  totalCount={total}
                  rowsPerPage={rowsPerPage}
                  siblingCount={1}
                  showInfo={false}
                />
              </Row>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            onClick={onCloseFinder}
            color="secondary"
            data-toggle="tooltip"
            title="Cerrar"
          >
            <i className="bi bi-x-circle"></i> Cerrar
          </Button>
          <Button
            type="button"
            color="primary"
            disabled={record ? false : true}
            data-toggle="tooltip"
            onClick={onAcceptFinder}
            title="Aceptar"
          >
            <i className="bi bi-check2-circle"></i> Aceptar
          </Button>
        </ModalFooter>
      </ModalForm>
    </InputGroup>
  );
}
