
import { useState, useEffect, useRef } from "react";
import { jwtVerify } from "jose";
import Layout from "../../components/Core/Layout";
import PageTitle from "../../components/Core/Pagetitle";
import Table from "../../components/Core/Table";
import Pagination from "../../components/Core/Pagination";
import ModalForm from "../../components/Core/ModalForm";
import DeleteForm from "../../components/Core/DeleteForm";
import TableTool from "../../components/Core/TableTool";

import AddContractForm from "../../components/Contract/AddContract";
import EditContractForm from "../../components/Contract/EditContract";
import FindContractForm from "../../components/Contract/FindContract";

import { HashLoader } from "react-spinners";

import axios from "axios";
import swal from "sweetalert";

const columns = [
  { id: 1, title: "Número", accessor: "number" },
  { id: 2, title: "Cliente", accessor: "partner" },
  { id: 3, title: "Contacto", accessor: "contact" },
  { id: 4, title: "Importe x Ejecutar", accessor: "real_import" },
  { id: 5, title: "Firmado por", accessor: "sign_by" },
  { id: 6, title: "Fecha de Firma", accessor: "sign_date"}
];

export default function List({ user }) {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [params, setParams] = useState("");

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openFind, setOpenFind] = useState(false);
  const [findMode, setFindMode] = useState(false);

  const rowsPerPage = 10;
  const mounted = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = `/api/contracts/read?page=${page}&per_page=${rowsPerPage}`
      if (params != "") {
        url = url + params;
      }
      setLoading(true);

      try {
        const {data} = await axios.get(url);
        setTotal(data.result.total);
        setTotalPages(data.result.total_pages);
        setRecords(data.result.data);
 
        setLoading(false);
        setReload(false);
      } catch (error) {
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
      } else {
        row.selected = false;
      }
      return row;
    });

    setRecords(tempList);
    selectedList = records.filter((e) => e.selected);
    setSelectedList(selectedList);
  };

  const addContract = async (contract) => {
    setLoading(true);
    const url = "/api/contracts/create"

    try {
      const res = await axios.post(url, contract);
      if (res.status === 200) {
        swal(
          "Operación Exitosa",
          "El contrato se ha creado con éxito",
          "success"
        );
        setOpenAdd(false);
        setLoading(false);
        setReload(true);
      }
    } catch (errors) {
      swal("Error", "Ha ocurrido un error con la API", "error");
    }
  };

  const editContract = async (contract) => {
    setLoading(true);
    selectedList.map(async (row) => {
      const url = `/api/contracts/update?id=${row.id}`
      try {
        await axios.put(url, contract);
        setLoading(false);
      } catch (errors) {
        swal("Error", "Ha ocurrido un error con la API", "error");
      }

      setOpenEdit(false);
      swal("Operación Exitosa", "Cambios en contrato guardados con éxito", "success");
      setReload(true);
    });
  };

  const delContract = (e) => {
    e.preventDefault();
    setLoading(true);

    selectedList.map(async (row) => {
      const url = `/api/contracts/delete?id=${row.id}`
      try {
        await axios.delete(url);
        setLoading(false);
      } catch (errors) {
        swal("Error", "Ha ocurrido un error con la API", "error");
      }
      setOpenDelete(false);
      swal("Operación Exitosa", "Contrato eliminado con éxito", "success");
      setReload(true);
    });
  };

  const findContract = (filter) => {
    let condition = "";
    if (filter.key != "" && filter.value != "") {
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

  const openAddContract = (e) => {
    e.preventDefault;
    setOpenAdd(true);
  }

  const openEditContract = (e) => {
    e.preventDefault;
    setOpenEdit(true);
  }

  const openFindContract = (e) => {
    e.preventDefault;
    setOpenFind(true);
  }

  const openDelContract = (e) => {
    e.preventDefault;
    setOpenDelete(true);
  }

  const closeAddContract = () => {
    setOpenAdd(false);
  }

  const closeEditContract = () => {
    setOpenEdit(false);
  }

  const closeDelContract = () => {
    setOpenDelete(false);
  }

  const closeFindContract = () => {
    setParams("");
    setOpenFind(false);
    setFindMode(false);
    setReload(true);
  }

  return (
    <Layout user={user}>
      <PageTitle title={"Contratos"} except={"Contratos"} />
      <div className="row">
        <div className="container">
          <div className="table-responsive">
            <div className="table-wrapper">

              {loading && <div className="css-15dql7d"><HashLoader color="#36d7b7" /></div>}

              {!loading && (
                <>
                  <div className="table-title">
                    <TableTool
                      title={"Contratos"}
                      openForm={openAddContract}
                      openFind={openFindContract}
                      closFind={closeFindContract}
                      isFindMode={findMode}
                    />
                  </div>                
                  <Table
                    records={records}
                    columns={columns}
                    onItemCheck={onItemCheck}
                    onEdit={openEditContract}
                    onDelete={openDelContract}
                  />

                  <Pagination
                    onChangePage={onChangePage}
                    currentPage={page}
                    totalPage={totalPages}
                    totalCount={total}
                    rowsPerPage={rowsPerPage}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <ModalForm
        id={"addContractForm"}
        open={openAdd}
      >
        <AddContractForm onAdd={addContract} onClose={closeAddContract} />
      </ModalForm>

      <ModalForm
        id={"editContractForm"}
        open={openEdit}
      >
        <EditContractForm record={selectedList} onEdit={editContract} onClose={closeEditContract} />
      </ModalForm>

      <ModalForm
        id={"deleteContractForm"}
        open={openDelete}
      >
        <DeleteForm
          title={"Eliminar Contrato"}
          onDelete={delContract}
          onClose={closeDelContract}
        />
      </ModalForm>

      <ModalForm
        id={"findContractForm"}
        open={openFind}
      >
        <FindContractForm
          onFind={findContract} 
          isFindMode={findMode}
          onClose={closeFindContract}
        />
      </ModalForm>

    </Layout>
  );
}
export async function getServerSideProps({ req, res }) {
  const { crmToken } = req.cookies;
  try {
    const { payload } = await jwtVerify(
      crmToken,
      new TextEncoder().encode(process.env.TOKEN_SECRET)
    );

    return {
      props: {
        user: {
          username: payload.username,
          fullname: payload.fullname,
          job: payload.job,
        },
      },
    };
  } catch (error) {
    return {
      props: { user: { username: "", fullname: "", job: payload.job } },
    };
  }
}
