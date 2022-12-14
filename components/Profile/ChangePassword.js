import { useState } from "react";

import {
  Form,
  Row,
  FormGroup,
  Label,
  Col,
  InputGroup,
  InputGroupText,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";

import axios from "axios";
import Swal from 'sweetalert2'

export default function ChangePassword({ profile }) {
  
  const [currentPasswordType, setCurrentPasswordType] = useState("password");
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [renewPasswordType, setRenewPasswordType] = useState("password");

  const [password, setPassword] = useState({
    currentpassword: "",
    newpassword: "",
    renewpassword: "",
  });

  const [validate, setValidate] = useState({
    currentpassword: "",
    newpassword: "",
    renewpassword: "",
  });

  const togglePassword = (fieldName) => {
    switch (fieldName) {
      case "currentpassword":
        if (currentPasswordType === "password") {
          setCurrentPasswordType("text");
          return;
        }
        setCurrentPasswordType("password");
        break;
      case "newpassword":
        if (newPasswordType === "password") {
          setNewPasswordType("text");
          return;
        }
        setNewPasswordType("password");
        break;
      case "renewpassword":
        if (renewPasswordType === "password") {
          setRenewPasswordType("text");
          return;
        }
        setRenewPasswordType("password");
        break;
    }
  };

  const validForm = (event) => {
    const { target } = event;
    const value = target.value;
    const { name } = target;

    setValidate({
      ...validate,
      [name]: value != "" ? "success" : "error",
    });
  };

  const handleChange = (event) => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;

    setPassword({
      ...password,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidate({
      ...validate,
      currentpassword: password.currentpassword != "" ? "success" : "error",
      newpassword: password.newpassword != "" ? "success" : "error",
      renewpassword: password.newpassword === password.renewpassword ? "success" : "error"
    });

    if (validate.currentpassword === "success" && validate.renewpassword === "success") {

      const url = "/api/profile/services";

      try {
        const res = await axios.post(url, password);
        if (res.status === 200) {
          
          setPassword({
            currentpassword: "",
            newpassword: "",
            renewpassword: ""            
          });

          Swal.fire({
            icon: "success",
            title: "Cambiar contrase??a",
            text: "Su contrase??a ha sido cambiada.",
            showConfirmButton: true,
          });
        }
      } catch (errors) {
        Swal.fire({
          icon: "error",
          title: "Cambiar contrase??a",
          text: "Ha ocurrido un error al cambiar la contrase??a",
          showConfirmButton: true,
        });
      }
    }
  };

  return (
    <div className="tab-pane pt-3" id="profile-change-password">
      <Form onSubmit={handleSubmit}>
        <Row>
          <FormGroup row>
            <Label for="currentPassword" size="sm" sm={3}>
              Contrase??a Actual:
            </Label>
            <Col sm={9}>
              <InputGroup size="sm">
                <Input
                  type={currentPasswordType}
                  id="currentpassword"
                  name="currentpassword"
                  placeholder="Contrase??a Actual"
                  invalid={validate.currentpassword === "error"}
                  value={password.currentpassword}
                  onChange={(e) => {
                    validForm(e);
                    handleChange(e);
                  }}
                />
                <InputGroupText>
                  <a onClick={() => togglePassword("currentpassword")}>
                    {currentPasswordType === "password" ? (
                      <i className="bi bi-eye-slash"></i>
                    ) : (
                      <i className="bi bi-eye"></i>
                    )}
                  </a>
                </InputGroupText>
                <FormFeedback>Teclee la contrase??a actual.</FormFeedback>
              </InputGroup>
            </Col>
          </FormGroup>
        </Row>

        <Row>
          <FormGroup row>
            <Label for="newpassword" size="sm" sm={3}>
              Nueva Contrase??a:
            </Label>
            <Col sm={9}>
              <InputGroup size="sm">
                <Input
                  type={newPasswordType}
                  id="newpassword"
                  name="newpassword"
                  placeholder="Nueva Contrase??a"
                  invalid={validate.newpassword === "error"}
                  value={password.newpassword}
                  onChange={(e) => {
                    validForm(e);
                    handleChange(e);
                  }}
                />
                <InputGroupText>
                  <a onClick={() => togglePassword("newpassword")}>
                    {newPasswordType === "password" ? (
                      <i className="bi bi-eye-slash"></i>
                    ) : (
                      <i className="bi bi-eye"></i>
                    )}
                  </a>
                </InputGroupText>
                <FormFeedback>Teclee la nueva contrase??a.</FormFeedback>
              </InputGroup>
            </Col>
          </FormGroup>
        </Row>

        <Row>
          <FormGroup row>
            <Label for="renewpassword" size="sm" sm={3}>
              Confirmar Contrase??a:
            </Label>
            <Col sm={9}>
              <InputGroup size="sm">
                <Input
                  type={renewPasswordType}
                  id="renewpassword"
                  name="renewpassword"
                  placeholder="Confirmar Contrase??a"
                  invalid={
                    validate.renewpassword === "error" ||
                    password.newpassword != password.renewpassword
                  }
                  value={password.renewpassword}
                  onChange={(e) => {
                    validForm(e);
                    handleChange(e);
                  }}
                />
                <InputGroupText>
                  <a onClick={() => togglePassword("renewpassword")}>
                    {renewPasswordType === "password" ? (
                      <i className="bi bi-eye-slash"></i>
                    ) : (
                      <i className="bi bi-eye"></i>
                    )}
                  </a>
                </InputGroupText>
                <FormFeedback>Confirme la nueva contrase??a.</FormFeedback>
              </InputGroup>
            </Col>
          </FormGroup>
        </Row>

        <div className="text-center">
          <Button
            type="submit"
            color="primary"
            data-toggle="tooltip"
            title="Guardar"
          >
            <i className="bi bi-check2-circle"></i> Guardar
          </Button>
        </div>
      </Form>
    </div>
  );
}
