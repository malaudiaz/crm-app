import { useState } from "react";
import {
  InputGroup,
  InputGroupText,
  Input,
  FormFeedback,
} from "reactstrap";

export default function FinderPartner() {
    return (
        <InputGroup size="sm">
            <Input
                type="text"
                name="partner"
                placeholder="Cliente"
                readOnly
            />
            <InputGroupText>
                <a><i class="bi bi-search"></i></a>
            </InputGroupText>  

            <FormFeedback>
                Por favor seleccione el cliente
            </FormFeedback>

        </InputGroup>
    )
};
