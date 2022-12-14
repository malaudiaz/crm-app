import { useState, useEffect, useRef } from "react";
import { jwtVerify } from "jose";
import Layout from "../../components/Core/Layout";
import PageTitle from "../../components/Core/Pagetitle";
import Table from "../../components/Core/Table";
import Pagination from "../../components/Core/Pagination";
import ModalForm from "../../components/Core/ModalForm";
import AddContactForm from "../../components/Contact/AddContact";
import EditContactForm from "../../components/Contact/EditContact";
import FindContactForm from "../../components/Contact/FindContact";
import DeleteForm from "../../components/Core/DeleteForm";
import TableTool from "../../components/Core/TableTool";
import { HashLoader } from "react-spinners";

import axios from "axios";
import swal from "sweetalert";

const columns = [
  { id: 1, title: "Nombre", accessor: "name" },
  { id: 2, title: "DNI", accessor: "dni" },
  { id: 3, title: "Teléfono", accessor: "phone" },
  { id: 4, title: "Móvil", accessor: "mobile" },
  { id: 5, title: "Dirección", accessor: "address" },
  { id: 6, title: "Correo", accessor: "email"}
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
      const url = `/api/contacts/read?page=${page}&per_page=${rowsPerPage}`;
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

  const addContact = async (partner) => {
    const url = "/api/contacts/create";

    try {
      const res = await axios.post(url, partner);
      if (res.status === 200) {
        swal(
          "Operación Exitosa",
          "El cliente se ha creado con éxito",
          "success"
        );
        setOpenAdd(false);
        setLoading(false);
        setReload(true);      }
    } catch (errors) {
      swal("Error", "Ha ocurrido un error con la API", "error");
    }
  };

  const editContact = async (partner) => {
    selectedList.map(async (row) => {
      setLoading(true);
      const url = `/api/contacts/update?id=${row.id}`
      try {
        await axios.put(url, partner);
        setOpenEdit(false);
        setLoading(false);
        setReload(true);
      } catch (errors) {
        swal("Error", "Ha ocurrido un error con la API", "error");
      }
      swal("Operación Exitosa", "Cambios guardados con éxito", "success");
      setReload(true);
    });
  };

  const delContact = async (e) => {
    e.preventDefault();

    if (selectedList.length > 0) {
      const row = selectedList[0];

      setLoading(true);

      const url = `/api/contacts/delete?id=${row.id}`

      await axios
        .delete(url)
        .then((res) => {
          swal("Operación Exitosa", "Cliente eliminado con éxito", "success");
          setLoading(false);
          setOpenDelete(false);
          setReload(true);
        })
        .catch((errors) => {
          swal("Error", "Ha ocurrido un error con la API", "error");
      });
    }
  };

  const findContact = (filter) => {
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

  const openAddContact = (e) => {
    e.preventDefault;
    setOpenAdd(true);
  }

  const openEditContact = (e) => {
    e.preventDefault;
    setOpenEdit(true);
  }

  const openFindContact = (e) => {
    e.preventDefault;
    setOpenFind(true);
  }

  const openDelContact = (e) => {
    e.preventDefault;
    setOpenDelete(true);
  }

  const closeAddContact = () => {
    setOpenAdd(false);
  }

  const closeEditContact = () => {
    setOpenEdit(false);
  }

  const closeDelContact = () => {
    setOpenDelete(false);
  }

  const closeFindContact = () => {
    setParams("");
    setOpenFind(false);
    setFindMode(false);
    setReload(true);
  }

  return (
    <Layout user={user}>
      <PageTitle title={"Contactos"} except={"Contactos"} />
      <div className="row">
        <div className="container">
          <div className="table-responsive">
            <div className="table-wrapper">

              {loading && <div className="css-15dql7d"><HashLoader color="#36d7b7" /></div>}
              {!loading && (
                <>
                  <div className="table-title">
                    <TableTool
                      title={"Contactos"}
                      openForm={openAddContact}
                      openFind={openFindContact}
                      closFind={closeFindContact}
                      isFindMode={findMode}
                    />
                  </div>
                  <Table
                    records={records}
                    columns={columns}
                    onItemCheck={onItemCheck}
                    onEdit={openEditContact}
                    onDelete={openDelContact}
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
        id={"addContactForm"}
        open={openAdd}
      >
        <AddContactForm onAdd={addContact} onClose={closeAddContact} />
      </ModalForm>      

      <ModalForm
        id={"editContactForm"}
        open={openEdit}
      >
        <EditContactForm record={selectedList} onEdit={editContact} onClose={closeEditContact} />
      </ModalForm>

      <ModalForm
        id={"deleteContactForm"}
        open={openDelete}
      >
        <DeleteForm
          title={"Eliminar Contacto"}
          onDelete={delContact}
          onClose={closeDelContact}
        />
      </ModalForm>

      <ModalForm
        id={"findContactForm"}
        open={openFind}
      >
        <FindContactForm
          onFind={findContact} 
          isFindMode={findMode}
          onClose={closeFindContact}
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
