import { useState, useEffect, useRef } from "react";

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
import swal from "sweetalert";

const columns = [
  { id: 1, title: "Nombre", accessor: "name" },
  { id: 2, title: "DNI", accessor: "dni" },
];

export default function FinderContact({ changeContact, partner_id }) {
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState(null);
  const [contact, setContact] = useState("");
  const [openFinderPartner, setOpenFinderPartner] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const mounted = useRef(false);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const url = `/api/contacts/services?page=${page}&per_page=${rowsPerPage}&partner_id=${partner_id}`;
      setLoading(true);
      try {
        const { data } = await axios.get(url);
        setLoading(false);

        setTotal(data.result.total);
        setTotalPages(data.result.total_pages);
        setRecords(data.result.data);

        if (data.result.data.length == 0) {
          swal(
            "Información",
            "No existen contáctos que cumplan con el críterio de búsqueda",
            "info"
          );
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        swal("Error", "ha ocurrido un error al consultar el API", "error");
      }
    };

    if (!mounted.current) {
      // do componentDidMount logic
      if (partner_id) {
        mounted.current = true;
        fetchData();
      }
    } else {
      // do componentDidUpdate logic
      if (reload) {
        fetchData();
      }
    }
  });

  const onChangePage = (pageNumber) => {
    setPage(pageNumber);
    fetchData();
  };

  const onOpenFinder = () => {
    if (partner_id !== "") {
        setOpenFinderPartner(true);
    } else {
        swal("Atención", "Debe seleccionar un cliente, antes de seleccionar el contácto", "info");
    }
  };

  const onCloseFinder = () => {
    mounted.current = false;
    setRecord(null);
    setRecords([]);
    setOpenFinderPartner(false);
  };

  const onAcceptFinder = () => {
    setContact(record.name);

    changeContact(record);
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
        type="text"
        name="contact"
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
