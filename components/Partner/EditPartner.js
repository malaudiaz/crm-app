import { useState, useEffect } from "react";

export default function EditPartnerForm({record, onEdit}) {
    const [partner, setPartner] = useState({
        id: "",
        type: "",
        name: "",
        address: "",
        dni: "",
        email: "",
        phone: "",
        mobile: "",
        nit: ""
    });

    useEffect(()=>{
        if (record.length > 0) {
            setPartner({
                id: record[0].id,
                id: record[0].type,
                name: record[0].name,
                address: record[0].address,
                dni: record[0].dni,
                email: record[0].email,
                phone: record[0].phone,
                mobile: record[0].mobile,
                nit: record[0].nit
            })
        }
    }, [record]);

    const handleSubmit = async (e) => {
        e.preventDefault();    
        onEdit(partner);
    };   

    if (record.length > 0) {      
        return (
            <form className="needs-validation" noValidate onSubmit={handleSubmit}>            
                <div className="modal-header">						
                    <h4 className="modal-title">Editar Cliente</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div className="modal-body">

                    <div className="row">
                    </div>

                    <div className="col-12">
                    </div>

                    <div className="col-12">
                    </div>

                    <div className="col-12">
                    </div>

                    <div className="row">
                    </div>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Guardar</button>
                </div>
            </form>   
        )
    } else {
        return (
            <form>
                <div className="modal-header">						
                    <h4 className="modal-title">Editar Cliente</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div className="modal-body">					
                    <p>Por favor, seleccione el registro que desea editar</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                </div>
            </form>
        )
    }
};
