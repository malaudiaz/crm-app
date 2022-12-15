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
  const toggleToolTip = () => setTooltipOpen(!tooltipOpen);
  const closeModal = () => setOpen(!open);

  const addContact = (contacts) => {
    setRecords(contacts);
  }

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
              <th style={{width: "10px", textAlign: "center"}}>
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
              <th style={{textAlign: "center"}}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 && records.map((row, i) => (
              <tr key={i}>
                <td>
                  <span className="custom-checkbox">
                    <input
                      type="checkbox"
                      id={`rowcheck` + i}
                      checked={row.selected}
                      onChange={(event) => onItemCheck(event, row)}
                    />
                    <label htmlFor={`rowcheck` + i}></label>
                  </span>
                </td>
                {columns.map((col, j) => (
                  <td key={j}>{row[col.accessor]}</td>
                ))}
                <td>
                    <a
                        className={row.selected ? "delete" : "disabled"}
                        // onClick={onDelete}
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
