import ReactModal from 'react-modal'
ReactModal.setAppElement('#root-modal')
const customStyles = {
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -30%)',
        padding: 0,
        border: 0,
        backgroundColor: 'transparent',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0, .9)',
    },
}
const Modal = ({ children, closeModal, modalIsOpen, afterOpenModal }) => {
    return (
        <div>
            <ReactModal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button
                    className="text-white text-2xl fixed right-4  font-medium "
                    onClick={closeModal}
                >
                    X
                </button>
                {children}
            </ReactModal>
        </div>
    )
}

export default Modal
