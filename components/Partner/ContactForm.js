import { useState } from "react";
import { Row, Col, Table, Button, Tooltip } from "reactstrap";
import ListContact from "../Contact/ListContact";
import ModalForm from "../Core/ModalForm";

const columns = [
    { id: 1, title: "Nombre", accessor: "name" }
];

export default function PartnerForm() {
  const [open, setOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const [selected, setSelected] = useState([]);
  const toggleToolTip = () => setTooltipOpen(!tooltipOpen);
  const closeModal = () => setOpen(!open);

  const addContact = (contacts) => {
    let tmp = [];

    contacts.map( (contact) => {
        let found = records.find(e => e.id === contact.id);
        if (!found) {
            tmp.push(contact);
        }
    })
    const tempList = records.concat(tmp);

    setRecords(tempList);
    setOpen(false);
  }

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
    
    let item = records.find(e => e.id === row.id);
    let tmp = [];
    records.map( (record) => {
        if (record.id !== item.id) {
            tmp.push(record);
        }
    });
    setRecords(tmp);
  };

  return (
    <div style={{ padding: "8px" }}>
      <Row>
        <Col md={9} style={{ display: "flex", alignItems: "flex-end" }}>
          <h6>Contáctos del Cliente</h6>
        </Col>
        <Col md={3} style={{ textAlign: "right" }}>
          <Button id="btnAdd" type="button" onClick={()=>{setOpen(true)}} color="secondary" outline>
            <i className="bi bi-person-plus-fill"></i>
          </Button>
          <Tooltip
            placement="left"
            isOpen={tooltipOpen}
            target="btnAdd"
            toggle={toggleToolTip}
          >
            Asociar contáctos al Cliente
          </Tooltip>
        </Col>
      </Row>
      <Row style={{ paddingTop: "6px" }}>

        <Table bordered>
          <thead>
            <tr>
              <th style={{width: "10p%", textAlign: "center"}}>
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
              <th style={{textAlign: "center", width: "10%"}}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 && records.map((row, i) => (
              <tr key={i}>
                <td style={{width: "10p%", textAlign: "center"}}>
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
                <td style={{width: "10p%", textAlign: "center"}}>
                    <a
                        className={row.selected ? "delete" : "disabled"}
                        onClick={(event) => onDelete(event, row)}
                    >
                        <i
                            className="bi bi-trash-fill"
                            data-toggle="tooltip"
                            title="Eliminar"
                        >                           
                        </i>
                    </a>
                </td>                
              </tr>
            ))}
          </tbody>
        </Table>

      </Row>

      <ModalForm id={"listContact"} open={open}>
        <ListContact columns={columns} onClose={closeModal} addContact={addContact} />
      </ModalForm>
    </div>
  );
}
