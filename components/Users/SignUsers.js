import { useState, useEffect, useRef } from "react";
import { InputGroup, Input, FormFeedback } from "reactstrap";
import axios from "axios";

export default function SignUser() {
  const mounted = useRef(false);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `/api/users/signuser`;
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
      <Input id="signuser" name="signuser" type="select">
        <option value="">Seleccione...</option>
        {records.map((record, i) => {
           return <option key={i} value={record.id}>{record.fullname}</option>;
        })}
      </Input>
      <FormFeedback>
        Por favor, seleccione el quién firmo el contrato.
      </FormFeedback>
    </InputGroup>
  );
}
