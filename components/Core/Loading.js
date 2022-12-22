import {
    ModalBody
} from "reactstrap";
import { HashLoader } from "react-spinners";

const LoadingForm = () => {

    return (
        <ModalBody>
            <div className="css-15dql7d"><HashLoader color="#36d7b7" size={"30px"} />Procesando...</div>
        </ModalBody>
    )
}
export default LoadingForm;