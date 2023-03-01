import React from "react";
import { useModal } from "../../context/Modal";

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  // It should consume the setModalContent and setOnModalClose from the ModalContext.
  const { setModalContent, setOnModalClose } = useModal();

  // if button is clicked:
  const onClick = () => {
    if (typeof onButtonClick === "function") onButtonClick(); // Invoke onButtonClick if onButtonClick is a function
    if (typeof onModalClose === "function") setOnModalClose(onModalClose); // Invoke setOnModalClose with onModalClose only if onModalClose is a function
    setModalContent(modalComponent); // Open the modal with the modalComponent as the content of the modal by invoking setModalContent with modalComponent
  };

  return <button onClick={onClick}>{buttonText}</button>;
}

export default OpenModalButton;
