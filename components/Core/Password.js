import { useState } from "react";
import {
    Input,
    Row,
    Col,
    InputGroup,
    InputGroupText,
    FormFeedback
  } from "reactstrap";
  
function Password({credentials, validate, validForm, handleChange}){
    const [passwordType, setPasswordType] = useState("password");

    // const [passwordInput, setPasswordInput] = useState("");
    // const handlePasswordChange =(evnt)=>{
    //     setPasswordInput(evnt.target.value);
    // }

    const togglePassword =()=>{
      if(passwordType==="password") {
        setPasswordType("text")
        return;
      }
      setPasswordType("password")
    }
    return(
        <InputGroup size="sm">
            <InputGroupText>
                <i className="bi bi-key-fill"></i>
            </InputGroupText>                        
            <Input
                type={passwordType}
                name="password"
                placeholder="Contraseña"
                // valid={validate.password === "success"}
                invalid={validate.password === "error"}
                value={credentials.password}
                onChange={(e) => {
                    validForm(e);
                    handleChange(e);
                }}
            />
            <InputGroupText>
                <a onClick={togglePassword}>
                        { passwordType==="password"? <i className="bi bi-eye-slash"></i> :<i className="bi bi-eye"></i> }
                    </a>
            </InputGroupText>  

            <FormFeedback>
                Por favor teclee su contraseña
            </FormFeedback>

        </InputGroup>
    )
}
export default Password;