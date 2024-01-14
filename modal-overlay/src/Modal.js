


export default function Modal({ handleClose, handleOfferAccept }) {

    const handleOutsideClick = (e) => {
        console.log(e.target.className);
        if (e.target.className === 'modal') {
            handleClose();
        }
    }
    return <div className="modal" onClick={handleOutsideClick}>
        <div className="modal-content">
            <button
                onClick={handleClose}
                className="close-btn"
            >X
            </button>

            <div className="content">
                click the button below to
                accept our amazing offer!
            </div>

            <button
                className="accept-btn"
                onClick={handleOfferAccept}
            >
                Accept Offer
            </button>
        </div>
    </div>
}