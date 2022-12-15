import { useState, useEffect, useRef } from "react";
import {
  Table,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  InputGroup,
  Input,
  InputGroupText,
} from "reactstrap";
import Pagination from "../Core/Pagination";
import axios from "axios";
import swal from "sweetalert";

export default function ListContact({ columns, onClose, addContact }) {
    
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selected, setSelected] = useState([]);
  const [findMode, setFindMode] = useState(true);
  const [params, setParams] = useState("");
  const [filter, setFilter] = useState({
    criteria_key: "name",
    criteria_value: "",
  });
  const rowsPerPage = 5;
  const mounted = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = `/api/contacts/read?page=${page}&per_page=${rowsPerPage}`;
      if (params != "") {
        url = url + params;
      }
      setLoading(true);

      try {
        const { data } = await axios.get(url);
        setTotal(data.result.total);
        setTotalPages(data.result.total_pages);
        setRecords(data.result.data);

        setLoading(false);
        setReload(false);
      } catch (error) {
        console.log(error);
        swal("Error", "ha ocurrido un error al consultar el API", "error");
      }
    };

    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      fetchData();
    } else {
      // do componentDidUpdate logic
      if (reload) {
        fetchData();
      }
    }
  });

  const onChangePage = (pageNumber) => {
    setPage(pageNumber);
    setReload(true);
  };

  const onItemCheck = (e, item) => {
    let tempList = records;
    tempList.map((row) => {
      if (row.id === item.id) {
        row.selected = e.target.checked;
      }
      return row;
    });

    setRecords(tempList);
    selected = records.filter((e) => e.selected);
    setSelected(selected);
  };

  const onFind = () => {
    let condition = "";

    if (findMode) {
        if (filter.key != "" && filter.value != "") {
            condition =
                "&criteria_key=" +
                filter.criteria_key +
                "&criteria_value=" +
                filter.criteria_value;

            setFindMode(false);
        }
    }
    setParams(condition);
    setReload(true);
  };

  const onAccept = () => {
    selected.map( (sel) => {sel.selected = false})
    addContact(selected);
  };
  
  const handleChange = (event) => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;

    setFilter({
      ...filter,
      [name]: value,
    });
  };  

  return (
    <div style={{ padding: "8px" }}>
      <ModalHeader toggle={onClose}>Seleccionar Contácto</ModalHeader>
      <ModalBody>
        <Row
          style={{
            display: "flex",
            alignItems: "flex-end",
            paddingBottom: "8px",
          }}
        >
          <InputGroup size="sm">
            <Input
              name="criteria_value"
              placeholder="Buscar por Nombre"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Button color="primary" onClick={onFind}>
              <i className={findMode ? "bi bi-search" : "bi bi-x"}></i>
            </Button>
          </InputGroup>
        </Row>
        <Table bordered>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>
                <span className="custom-checkbox">
                  <input type="checkbox" id="selectAll" disabled />
                  <label htmlFor="selectAll"></label>
                </span>
              </th>
              {columns.map(({ id, title, accessor }, idx) => (
                <th scope="col" key={idx} style={{ width: "90%" }}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((row, i) => (
              <tr key={i}>
                <td style={{ width: "10%", textAlign: "center" }}>
                  <span className="custom-checkbox">
                    <input
                      type="checkbox"
                      id={`checkbox` + i}
                      checked={row.selected}
                      onChange={(event) => onItemCheck(event, row)}
                    />
                    <label htmlFor={`checkbox` + i}></label>
                  </span>
                </td>
                {columns.map((col, j) => (
                  <td key={j} style={{ width: "90%" }}>
                    {row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination
          onChangePage={onChangePage}
          currentPage={page}
          totalPage={totalPages}
          totalCount={total}
          rowsPerPage={rowsPerPage}
        />
      </ModalBody>
      <ModalFooter>
        <Button type="button" onClick={onClose} color="secondary">
          <i className="bi bi-x-circle"></i> Cerrar
        </Button>
        <Button type="button" onClick={onAccept} color="primary">
          <i className="bi bi-check2-circle"></i> Aceptar
        </Button>
      </ModalFooter>
    </div>
  );
}
