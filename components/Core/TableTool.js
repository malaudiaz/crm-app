import {
    Row,
    Col
} from "reactstrap";

const TableTool = ({title, openForm, openFind, isFindMode, closFind}) => {
    return (
        <Row>
            <Col>
                <h2>Listado de <b>{title}</b></h2>
            </Col>
            <Col>
                <a
                    className={!isFindMode ? "btn btn-danger" : "btn btn-info"}
                    onClick={!isFindMode ? openFind : closFind}
                >
                    <i className={!isFindMode ? "bi bi-funnel" : "bi bi-funnel-fill"}></i>{" "}
                    <span>{!isFindMode ? "Filtrar" : "Quitar Filtro"}</span>
                </a>
                <a
                    className="btn btn-success"
                    onClick={openForm}
                >
                    <i className="bi bi-plus-circle-fill"></i>{" "}
                    <span>Nuevo</span>
                </a>
            </Col>
        </Row>

    )
}
export default TableTool;