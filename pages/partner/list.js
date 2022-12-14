import { useState, useEffect, useRef } from "react";
import { jwtVerify } from "jose";
import Layout from "../../components/Core/Layout";
import PageTitle from "../../components/Core/Pagetitle";
import Table from "../../components/Core/Table";
import Pagination from "../../components/Core/Pagination";
import ModalForm from "../../components/Core/ModalForm";
import AddParnetForm from "../../components/Partner/AddPartner";
import EditPartnerForm from "../../components/Partner/EditPartner";
import DeleteForm from "../../components/Core/DeleteForm";
import TableTool from "../../components/Core/TableTool";
import FindPartnerForm from "../../components/Partner/FindPartner";
import { HashLoader } from "react-spinners";

import axios from "axios";
import swal from "sweetalert";

const columns = [
  { id: 1, title: "Tipo", accessor: "type" },
  { id: 2, title: "Nombre", accessor: "name" },
  { id: 3, title: "DNI | NIF", accessor: "dni" },
  { id: 4, title: "Teléfono", accessor: "phone" },
  { id: 5, title: "Móvil", accessor: "mobile" },
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
      const url = `/api/partners/read?page=${page}&per_page=${rowsPerPage}`;
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

  const addPartner = async (partner) => {
    const url = "/api/partners/create";

    try {
      const res = await axios.post(url, partner);
      if (res.status === 200) {
        swal(
          "Operación Exitosa",
          "El cliente se ha creado con éxito",
          "success"
        );
        setReload(true);
      }
    } catch (errors) {
      swal("Error", "Ha ocurrido un error con la API", "error");
    }
  };

  const editPartner = async (partner) => {
    selectedList.map(async (row) => {
      setLoading(true);
      const url = `/api/partners/update?id=${row.id}`
      try {
        await axios.put(url, partner);
        setLoading(false);
      } catch (errors) {
        swal("Error", "Ha ocurrido un error con la API", "error");
      }
      swal("Operación Exitosa", "Cambios guardados con éxito", "success");
      setReload(true);
    });
  };

  const delPartner = async (e) => {
    e.preventDefault();

    if (selectedList.length > 0) {
      const row = selectedList[0];

      setLoading(true);

      const url = `/api/partners/delete?id=${row.id}`

      await axios
        .delete(url)
        .then((res) => {
          swal("Operación Exitosa", "Cliente eliminado con éxito", "success");
          setLoading(false);
        })
        .catch((errors) => {
          swal("Error", "Ha ocurrido un error con la API", "error");
        });
      setReload(true);
    }
  };

  const findPartner = (filter) => {
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

  const openAddPartner = (e) => {
    e.preventDefault;
    setOpenAdd(true);
  }

  const openEditPartner = (e) => {
    e.preventDefault;
    setOpenEdit(true);
  }

  const openFindPartner = (e) => {
    e.preventDefault;
    setOpenFind(true);
  }

  const openDelPartner = (e) => {
    e.preventDefault;
    setOpenDelete(true);
  }

  const closeAddPartner = () => {
    setOpenAdd(false);
  }

  const closeEditPartner = () => {
    setOpenEdit(false);
  }

  const closeDelPartner = () => {
    setOpenDelete(false);
  }

  const closeFindPartner = () => {
    setParams("");
    setOpenFind(false);
    setFindMode(false);
    setReload(true);
  }

  return (
    <Layout user={user}>
      <PageTitle title={"Clientes"} except={"Clientes"} />
      <div className="row">
        <div className="container">
          <div className="table-responsive">
            <div className="table-wrapper">

              {loading && <div className="css-15dql7d"><HashLoader color="#36d7b7" /></div>}
              {!loading && (
                <>
                  <div className="table-title">
                    <TableTool
                      title={"Clientes"}
                      openForm={openAddPartner}
                      openFind={openFindPartner}
                      closFind={closeFindPartner}
                      isFindMode={findMode}
                      loading={loading}
                    />
                  </div>
                  <Table
                    records={records}
                    columns={columns}
                    onItemCheck={onItemCheck}
                    onEdit={openEditPartner}
                    onDelete={openDelPartner}
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
        id={"addPartnerForm"}
        open={openAdd}
      >
        <AddParnetForm onAdd={addPartner} onClose={closeAddPartner} />
      </ModalForm>      

      <ModalForm
        id={"editPartnerForm"}
        open={openEdit}
      >
        <EditPartnerForm record={selectedList} onEdit={editPartner} onClose={closeEditPartner} />
      </ModalForm>

      <ModalForm
        id={"deletePartnerForm"}
        open={openDelete}
      >
        <DeleteForm
          title={"Eliminar Clientes"}
          onDelete={delPartner}
          onClose={closeDelPartner}
        />
      </ModalForm>

      <ModalForm
        id={"findPartnerForm"}
        open={openFind}
      >
        <FindPartnerForm
          onFind={findPartner} 
          isFindMode={findMode}
          onClose={closeFindPartner}
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
