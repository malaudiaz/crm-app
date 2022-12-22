import { useState } from "react";
import {
  InputGroup,
  InputGroupText,
  Input,
  FormFeedback,
} from "reactstrap";

export default function FinderContact() {
    return (
        <InputGroup size="sm">
            <Input
                type="text"
                name="contact"
                placeholder="Contacto"
                readOnly
            />
            <InputGroupText>
                <a style={{cursor: "pointer"}}><i class="bi bi-search"></i></a>
            </InputGroupText>  

            <FormFeedback>
                Por favor seleccione el contácto
            </FormFeedback>

        </InputGroup>
    )
};
