import {
    Table
} from "reactstrap";

export default function DataTable({tableId, records, columns, onItemCheck, onEdit, onDelete}) {
    return (
        <Table size="sm" striped id={tableId}>
            <thead>
                <tr>
                    <th>
                        <span className="custom-checkbox">
                            <input 
                                type="checkbox" 
                                id="selectAll"
                                disabled
                            />
                            <label htmlFor="selectAll"></label>
                        </span>
                    </th>
                    {columns.map(({ id, title, accessor }, idx) => (
                        <th scope="col" key={idx}>
                            {title}
                        </th>
                    ))}
                    {onEdit || onDelete ? <th>Acciones</th> : ""}
                </tr>
            </thead>
            <tbody>
                {records.map((row, i) => (
                <tr key={i} className={row.selected ? "selected" : ""}>
                    <td>
                        <span className="custom-checkbox">
                            <input
                                type="checkbox"
                                id={tableId +`_rowcheck_`+i}
                                checked={row.selected}
                                onChange={(event) => onItemCheck(event, row)}                           
                            />
                            <label htmlFor={`rowcheck`+i}></label>
                        </span>
                    </td>
                    {columns.map((col, j) => (
                        <td key={j}>{row[col.accessor]}</td>
                    ))}
                    {onEdit || onDelete ? 
                    <td>
                        <a
                          className={row.selected ? "edit" : "disabled"}
                          onClick={onEdit}
                        >
                          <i
                            className="bi bi-pencil-fill"
                            data-toggle="tooltip"
                            title="Editar"
                          >                            
                          </i>
                        </a>
                        <a
                          className={row.selected ? "delete" : "disabled"}
                          onClick={onDelete}
                        >
                          <i
                            className="bi bi-trash-fill"
                            data-toggle="tooltip"
                            title="Eliminar"
                          >                           
                          </i>
                        </a>
                    </td>
                    : ""}
                </tr>
                ))}
            </tbody>
        </Table> 
    );
  }
  