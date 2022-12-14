import { useState, useEffect, useRef } from "react";
import { InputGroup, Input, FormFeedback } from "reactstrap";
import axios from "axios";

export default function ContractStatus({id, handleChange, validForm, valDefault}) {
  const mounted = useRef(false);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `/api/contracts/status`;
      // setLoading(true);
      try {
        const { data } = await axios.get(url);
        // setLoading(false);
        setRecords(data.result);

      } catch (error) {
        console.log(error);
        // setLoading(false);
        swal("Error", "Ha ocurrido un error al consultar el API", "error");
      }
    };

    if (!mounted.current) {
        mounted.current = true;
        fetchData();
    }
  });


  return (
    <InputGroup size="sm">
      <Input  
        id={id}
        name={id}
        type="select"
        value={valDefault}
        onChange={(e) => {
          validForm(e);
          handleChange(e);
        }}
      >
        <option value="">Seleccione...</option>
        {records.map((record, i) => {
           return <option key={i} value={record.name}>{record.description}</option>;
        })}
      </Input>
      <FormFeedback>
        Por favor, seleccione el estado del contrato.
      </FormFeedback>
    </InputGroup>
  );
}
