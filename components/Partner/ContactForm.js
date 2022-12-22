import { useState } from "react";
import { Row, Col, Table, Button, InputGroup } from "reactstrap";
import ListContact from "../Contact/ListContact";
import ModalForm from "../Core/ModalForm";
import AddContactForm from "../Contact/AddContact";
import axios from "axios";
import swal from "sweetalert";

const columns = [{ id: 1, title: "Nombre", accessor: "name" }];

export default function PartnerForm({ setContacts }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [records, setRecords] = useState([]);
  const [selected, setSelected] = useState([]);
  const closeModal = () => setOpen(!open);

  const addContact = (contacts) => {
    let tmp = [];

    contacts.map((contact) => {
      let found = records.find((e) => e.id === contact.id);
      if (!found) {
        tmp.push(contact);
      }
    });
    const tempList = records.concat(tmp);

    setRecords(tempList);
    setContacts(tempList);
    setOpen(false);
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

  const openAddContact = (e) => {
    e.preventDefault;
    setOpenAdd(true);
  };

  const saveContact = async (contact) => {
    const url = "/api/contacts/create";

    let tmp = records;
    tmp.push(contact);
    setRecords(tmp);
    setOpenAdd(false);

    // try {
    //   const res = await axios.post(url, contact);
    //   if (res.status === 200) {
    //     swal(
    //       "Operación Exitosa",
    //       "El contacto se ha creado con éxito",
    //       "success"
    //     );
    //     setOpenAdd(false);
    //     setLoading(false);
    //   }
    // } catch (errors) {
    //   swal("Error", "Ha ocurrido un error con la API", "error");
    // }
  };

  return (
    <div style={{ padding: "8px" }}>
      <Row>
        <Col md={8} style={{ display: "flex", alignItems: "flex-end" }}>
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
            >
              <i 
                className="bi bi-person-plus-fill"
                data-toggle="tooltip"
                title="Eliminar">
              </i>
            </Button>
          </InputGroup>
        </Col>
        <Col md={2}>
          <InputGroup size="sm" style={{ paddingLeft: "6px" }}>
            <Button
              id="btnSelectContact"
              type="button"
              onClick={() => {
                setOpen(true);
              }}
              color="secondary"
              outline
            >
              <i className="bi bi-person-lines-fill"></i>
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

      <ModalForm id={"listContact"} open={open}>
        <ListContact
          columns={columns}
          onClose={closeModal}
          addContact={addContact}
        />
      </ModalForm>

      <ModalForm id={"addContactForm"} open={openAdd}>
        <AddContactForm onAdd={saveContact} onClose={() => setOpenAdd(false)} />
      </ModalForm>
    </div>
  );
}
