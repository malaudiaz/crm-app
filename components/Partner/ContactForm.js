import { useState, useEffect, useRef } from "react";
import { Row, Col, Table, Button, InputGroup } from "reactstrap";
import ModalForm from "../Core/ModalForm";
import AddContactForm from "../Contact/AddContact";
import axios from "axios";
import swal from "sweetalert";

const columns = [{ id: 1, title: "Nombre", accessor: "name" }];

export default function ContactForm({ setContacts, partner_id }) {
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [records, setRecords] = useState([]);
  const [selected, setSelected] = useState([]);
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

      } catch (error) {
        console.log(error);
        setLoading(false);
        swal("Error", "ha ocurrido un error al consultar el API", "error");
      }

    };

    if (!mounted.current) {
      // do componentDidMount logic
      if (partner_id != "") {
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

  const onDelete = (event, row) => {
    event.preventDefault();

    let item = records.find((e) => e.id === row.id);
    let tmp = [];
    records.map((record) => {
      if (record.id !== item.id) {
        tmp.push(record);
      }
    });
    setRecords(tmp);
  };

  const saveContact = (contact) => {
    let tmp = records.length > 0 ? records : [];
    tmp.push(contact);
    setRecords(tmp);
    setContacts(tmp);
    setOpenAdd(false);
  };

  return (
    <div style={{ padding: "8px" }}>
      <Row>
        <Col md={9} style={{ display: "flex", alignItems: "flex-end" }}>
          <h6>Contáctos del Cliente</h6>
        </Col>
        <Col md={2}>
          <InputGroup size="sm" style={{ paddingLeft: "50px" }}>
            <Button
              id="btnAddContact"
              type="button"
              onClick={() => {
                setOpenAdd(true);
              }}
              color="primary"
              outline
              data-toggle="tooltip"
              title="Nuevo Contácto"
          >
              <i className="bi bi-person-plus-fill"></i>
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
              {columns.map(({ id, title, accessor }, idx) => (
                <th scope="col" key={idx}>
                  {title}
                </th>
              ))}
              <th style={{ textAlign: "center", width: "10%" }}>Acción</th>
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
                  <td style={{ width: "10p%", textAlign: "center" }}>
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

      <ModalForm id={"addContactForm"} open={openAdd}>
        <AddContactForm onAdd={saveContact} onClose={() => setOpenAdd(false)} />
      </ModalForm>
    </div>
  );
}
