import React, { useRef, useState, useContext } from "react";
import ReactDOM from "react-dom"; // to use ReactDOM.createPortal function
import "./Modal.css";

// React context
const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  // React ref called modalRef using the useRef React hook
  const modalRef = useRef();
  const [modalContent, setModalContent] = useState(null);
  // callback function that will be called when modal is closing
  const [onModalClose, setOnModalClose] = useState(null);

  // closeModal function should trigger the closing of the modal by setting the modalContent to null.
  // It should also call onModalClose if onModalClose is a function
  const closeModal = () => {
    setModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (typeof onModalClose === "function") {
      setOnModalClose(null);
      onModalClose();
    }
  };

  // Create an object literal as a dynamic context value and add the modalRef as a key-value pair.
  // Pass the dynamic context value into the ModalContext.Provider as the value prop.
  // Add the state variables and the functions that update it as key-value pairs in the dynamic context value
  const contextValue = {
    modalRef, // reference to modal div
    modalContent, // React component to render inside modal
    setModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function called when modal is closing
    closeModal, // function to close the modal
  };

  // set the ref prop on the rendered div element to this modalRef.
  // modalRef.current will be set to the actual HTML DOM element that gets rendered from the div.
  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
  // consume ModalContext and extract values
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);
  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
  if (!modalRef || !modalRef.current || !modalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={closeModal} />
      <div id="modal-content">{modalContent}</div>
    </div>,
    // value of modalRef.current is the reference to the actual HTML DOM element of the ModalProvider's div
    modalRef.current
  );
}
// custom React hook called useModal that can be used by React components to easily consume the ModalContext.
export const useModal = () => useContext(ModalContext);
