
import { useState, useEffect, useRef } from "react";
import { jwtVerify } from "jose";
import Layout from "../../components/Core/Layout";
import PageTitle from "../../components/Core/Pagetitle";
import DataTable from "../../components/Core/DataTable";
import Pagination from "../../components/Core/Pagination";
import ModalForm from "../../components/Core/ModalForm";
import DeleteForm from "../../components/Core/DeleteForm";
import TableTool from "../../components/Core/TableTool";
import AddUserForm from "../../components/Users/AddUser";
import EditUserForm from "../../components/Users/EditUser";
import FindUserForm from "../../components/Users/FindUser";

import axios from "axios";
import swal from "sweetalert";
import LoadingForm from "../../components/Core/Loading";

const columns = [
  { id: 1, title: "Usuario", accessor: "username" },
  { id: 2, title: "Nombre", accessor: "fullname" },
  { id: 3, title: "DNI", accessor: "dni" },
  { id: 4, title: "Cargo", accessor: "job" },
  { id: 5, title: "Correo", accessor: "email" },
  { id: 6, title: "Teléfono", accessor: "phone" },
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
      const url = `/api/users/services?page=${page}&per_page=${rowsPerPage}`
      
      if (params != "") {
        url = url + params;
      }
      setLoading(true);

      try {
        const {data} = await axios.get(url);
        setLoading(false);

        setTotal(data.result.total);
        setTotalPages(data.result.total_pages);
        setRecords(data.result.data);
 
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

  const addUser = async (users) => {
    setLoading(true);
    const url = "/api/users/services";

    try {
      const res = await axios.post(url, users);
      if (res.status === 200) {
        setLoading(false);
        swal(
          "Operación Exitosa",
          "El usuario se ha creado con éxito",
          "success"
        );
        setOpenAdd(false);
        setReload(true);
      }
    } catch (errors) {
      console.log(errors);
      swal("Error", "Ha ocurrido un error con la API", "error");
    }
  };

  const editUser = async (users) => {
    setLoading(true);
    selectedList.map(async (row) => {
      const url = `/api/users/services?id=${row.id}`
      try {
        await axios.put(url, users);
        setLoading(false);
        setOpenAdd(false);
        setReload(true);
      } catch (errors) {
        setLoading(false);
        swal("Error", "Ha ocurrido un error con la API", "error");
      }

      setOpenEdit(false);
      swal("Operación Exitosa", "Cambios guardados con éxito", "success");
      setReload(true);
    });
  };

  const delUsers = (e) => {
    e.preventDefault();
    setLoading(true);

    selectedList.map(async (row) => {
      const url = `/api/users/services?id=${row.id}`
      try {
        await axios.delete(url);
        setLoading(false);
      } catch (errors) {
        setLoading(false);
        swal("Error", "Ha ocurrido un error con la API", "error");
      }
      setOpenDelete(false);
      swal("Operación Exitosa", "Usuario eliminado con éxito", "success");
      setReload(true);
    });
  };

  const findUsers = (filter) => {
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

  const openAddUser = (e) => {
    e.preventDefault;
    setOpenAdd(true);
  }

  const openEditUser = (e) => {
    e.preventDefault;
    setOpenEdit(true);
  }

  const openFindUser = (e) => {
    e.preventDefault;
    setOpenFind(true);
  }

  const openDelUser = (e) => {
    e.preventDefault;
    setOpenDelete(true);
  }

  const closeAddUser = () => {
    setOpenAdd(false);
  }

  const closeEditUser = () => {
    setOpenEdit(false);
  }

  const closeDelUser = () => {
    setOpenDelete(false);
  }

  const closeFindUser = () => {
    setParams("");
    setOpenFind(false);
    setFindMode(false);
    setReload(true);
  }

  return (
    <Layout user={user}>
      <PageTitle title={"Usuarios"} except={"Usuarios"} />
      <div className="row">
        <div className="container">
          <div className="table-responsive">
          <div className="table-wrapper">
                <div className="table-title">
                  <TableTool
                    title={"Usuarios"}
                    openForm={openAddUser}
                    openFind={openFindUser}
                    closFind={closeFindUser}
                    isFindMode={findMode}
                  />
                </div>
                <DataTable
                  tableId={"users"}
                  records={records}
                  columns={columns}
                  onItemCheck={onItemCheck}
                  onEdit={openEditUser}
                  onDelete={openDelUser}
                />

                <Pagination
                  onChangePage={onChangePage}
                  currentPage={page}
                  totalPage={totalPages}
                  totalCount={total}
                  rowsPerPage={rowsPerPage}
                />
            </div>
          </div>
        </div>
      </div>

      <ModalForm
        id={"addUserForm"}
        open={openAdd}
      >
        <AddUserForm onAdd={addUser} onClose={closeAddUser} />
      </ModalForm>

      <ModalForm
        id={"editUserForm"}
        open={openEdit}
      >
        <EditUserForm record={selectedList} onEdit={editUser} onClose={closeEditUser} />
      </ModalForm>

      <ModalForm
        id={"deleteUserForm"}
        open={openDelete}
      >
        <DeleteForm
          title={"Eliminar Usuarios"}
          onDelete={delUsers}
          onClose={closeDelUser}
        />
      </ModalForm>

      <ModalForm
        id={"findUserForm"}
        open={openFind}
      >
        <FindUserForm
          onFind={findUsers} 
          isFindMode={findMode}
          onClose={closeFindUser}
        />
      </ModalForm>

      <ModalForm
        id={"loading"}
        open={loading}
        size='sm'
      >
        <LoadingForm />
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
        }
      }
    };
  } catch (error) {
    return {
      props: { user: { username: "", fullname: "", job: payload.job } },
    };
  }
}
