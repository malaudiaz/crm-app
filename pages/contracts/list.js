
import { useState, useEffect, useRef } from "react";
import Layout from "../../components/Core/Layout";
import PageTitle from "../../components/Core/Pagetitle";
import DataTable from "../../components/Core/DataTable";
import Pagination from "../../components/Core/Pagination";
import ModalForm from "../../components/Core/ModalForm";
import TableTool from "../../components/Core/TableTool";
import { getServerProps } from "../_common";

import AddContractForm from "../../components/Contract/AddContract";
import EditContractForm from "../../components/Contract/EditContract";
import FindContractForm from "../../components/Contract/FindContract";

import axios from "axios";
import Swal from 'sweetalert2'
import LoadingForm from "../../components/Core/Loading";

const columns = [
  { id: 1, title: "Número", accessor: "number" },
  { id: 2, title: "Cliente", accessor: "partner" },
  { id: 3, title: "Contacto", accessor: "contact" },
  { id: 4, title: "Monto Contratado", accessor: "initial_aproved_import"},
  { id: 5, title: "Monto Disponible", accessor: "real_import" },
  { id: 6, title: "Estado", accessor: "status_description" },
  { id: 7, title: "Firmado por", accessor: "sign_full_name" },
  { id: 8, title: "Fecha de Firma", accessor: "sign_date"}
];

export default function List({ user, rowsPerPage }) {
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
  const [openFind, setOpenFind] = useState(false);
  const [findMode, setFindMode] = useState(false);

  const mounted = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = `/api/contracts/services?page=${page}&per_page=${rowsPerPage}`
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
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al consultar la API',
          showConfirmButton: true,
        });              
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
    const url = "/api/contracts/services"

    try {
      const res = await axios.post(url, contract);
      if (res.status === 200) {
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Operación Exitosa',
          text: 'El contrato se ha creado con éxito',
          showConfirmButton: true,
        });              
        setOpenAdd(false);
        setReload(true);
      }
    } catch (errors) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al consultar la API',
        showConfirmButton: true,
      });              
    }
  };

  const editContract = async (contract) => {

    if (selectedList.length > 0) {
      const row = selectedList[0];

      setLoading(true);

      const url = `/api/contracts/services?id=${row.id}`;

      await axios
        .put(url, contract)
        .then((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Operación Exitosa',
            text: 'Contrato modificado con éxito',
            showConfirmButton: true,
          });                     
          setLoading(false);
          setOpenEdit(false);
        })
        .catch((errors) => {
          setLoading(false);        
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al consultar la API',
            showConfirmButton: true,
          });           
            
        });

        setReload(true);
    }
  };

  const delContract = async (e) => {
    e.preventDefault();

    if (selectedList.length > 0) {
      const row = selectedList[0];

      setLoading(true);

      const url = `/api/contracts/services?id=${row.id}`
      await axios
        .delete(url)
        .then((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Operación Exitosa',
            text: 'Contrato eliminado con éxito',
            showConfirmButton: true,
          });                     
          setLoading(false);
        })
        .catch((errors) => {
          setLoading(false);
          
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al consultar la API',
            showConfirmButton: true,
          });           
            
        });

        setReload(true);
    }
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

    Swal.fire({
      title: '¿ Estás seguro ?',
      text: "! Esta opción no podrá ser revertida !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',      
      reverseButtons: true,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        delContract(e);
      }     
    })
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
                <div className="table-title">
                  <TableTool
                    title={"Contratos"}
                    openForm={openAddContract}
                    openFind={openFindContract}
                    closFind={closeFindContract}
                    isFindMode={findMode}
                  />
                </div>                
                <DataTable
                  tableId={"contracts"}
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
        id={"findContractForm"}
        open={openFind}
      >
        <FindContractForm
          onFind={findContract} 
          isFindMode={findMode}
          onClose={closeFindContract}
        />
      </ModalForm>

      <LoadingForm
        id={"loading"}
        open={loading}
        size='sm'
        waitMsg={"Por favor, espere"}
      />

    </Layout>
  );
}
export async function getServerSideProps({ req, res }) {
  return getServerProps(req, res);
}
