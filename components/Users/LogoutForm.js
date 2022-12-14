
const LogoutForm = props => {
    const {
        title,
        message,
        secondatyText="No",
        primaryText="Sí",
        onPrimaryClick
    } = props;

    return(
        <div className="modal fade" id="verticalycentered" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {message}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{secondatyText}</button>
                        <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={() => onPrimaryClick()}>{primaryText}</button>
                    </div>
                </div>
            </div>
        </div>         
    )
};
export default LogoutForm;