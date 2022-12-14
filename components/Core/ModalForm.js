import { Modal } from "reactstrap";

export default function ModalForm(props) {
    return (
        <Modal 
            id={props.id} 
            isOpen={props.open} 
            backdrop={'static'}
            keyboard={true}
            centered={true}
        >
            {props.children}
      </Modal>
    )
}