import { useState, useEffect, useRef } from "react";
import {
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    Row,
    Col,
    Table,
    FormGroup,
    Button,
    Label,
    InputGroup    
} from "reactstrap";

import ModalForm from "../../components/Core/ModalForm";
import TableTool from "../../components/Core/TableTool";
import FindProductForm from "../../components/Product/FindProduct";
import AppContext from "../../AppContext";
import Swal from 'sweetalert2'
import axios from "axios";


const columns = [{ id: 1, title: "Código", accessor: "code" },
                 { id: 2, title: "Nombre", accessor: "name" }
];

export default function AddProdOffer({session, onClose}) {
    
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [params, setParams] = useState("");
    const [openFind, setOpenFind] = useState(false);
    const [findMode, setFindMode] = useState(false);
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selected, setSelected] = useState([]);
    
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
            const url = `/api/products/services?page=${page}&per_page=${rowsPerPage}`;
            
            if (params != "") {
                url = url + params;
            }
            setLoading(true);

            try {
                const { data } = await axios.get(url, config);
                
                setLoading(false);

                setTotal(data.result.total);
                setTotalPages(data.result.total_pages);
                setRecords(data.result.data);

                setReload(false);
            } catch (error) {
                setLoading(false);

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ha ocurrido un error al consultar la API",
                    showConfirmButton: true,
                });
            }
        };
        fetchData();

        // if (!mounted.current) {
        //     // do componentDidMount logic
        //     mounted.current = true;
        //     fetchData();
        // } else {
        //     // do componentDidUpdate logic
        //     if (reload) {
        //         fetchData();
        //     }
        // }        
    },[page]);

    const productSubmit = async (e) => {
        e.preventDefault();

    };

    const findProduct = (filter) => {
        setPage(1);
        let condition = "";
        if (filter.criteria_key != "" && filter.criteria_value != "") {
            condition =
                "&criteria_key=" +
                filter.criteria_key +
                "&criteria_value=" +
                filter.criteria_value;
        }
        setParams(condition);
        setFindMode(true);

        setOpenFind(!openFind);
        setReload(true);
    };

    const openFindProduct = (e) => {
        e.preventDefault;
        setOpenFind(true);
    };

    const closeFindProduct = () => {
        setParams("");
        setOpenFind(false);
        setFindMode(false);
        setReload(true);
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
        selected = records.filter((e) => e.selected);
        setSelected(selected);
    };

    return (
        <Form lassName="form" onSubmit={productSubmit}>
            <ModalHeader toggle={onClose}>Adicionar Productos a la Oferta</ModalHeader>
            <ModalBody>
                <Row>
                    <FormGroup>
                        <TableTool
                            title={"Productos"}
                            openFind={openFindProduct}
                            closFind={closeFindProduct}
                            isFindMode={findMode}
                            showNewBtn={false}
                            loading={loading}
                        />
                    </FormGroup>                    
                </Row>
                <Row>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th style={{ width: "2%", textAlign: "center" }}>
                                    <span className="custom-checkbox">
                                        <input type="checkbox" id="selectAll" enabled />
                                        <label htmlFor="selectAll"></label>
                                    </span>
                                </th>
                                <th style={{ width: "5%", textAlign: "center" }} scope="col" key={columns[0].id}>
                                    {columns[0].title}
                                </th>
                                <th style={{ width: "25%", textAlign: "center" }} scope="col" key={columns[1].id}>
                                    {columns[1].title}
                                </th>                                
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
                                    </tr>
                                ))}
                        </tbody>
                    </Table>                    
                </Row>
            </ModalBody>
            <ModalForm id={"findProductForm"} open={openFind}>
                <FindProductForm
                    onFind={openFindProduct}
                    isFindMode={findMode}
                    onClose={closeFindProduct}
                />
            </ModalForm>
            <ModalFooter>
                <Button type="submit" color="primary">
                    <i className="bi bi-check2-circle"></i> Salvar
                </Button>
                <Button type="button" onClick={onClose} color="secondary">
                    <i className="bi bi-x-circle"></i> Cerrar
                </Button>
            </ModalFooter>
        </Form>
    );
};

