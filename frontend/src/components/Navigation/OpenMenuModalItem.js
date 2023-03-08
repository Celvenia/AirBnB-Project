// frontend/src/components/Navigation/OpenModalMenuItem.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the menu item that opens the modal
  onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();
  const dispatch = useDispatch();
  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onItemClick) onItemClick();
  };

  useEffect(() => {

  },[dispatch])

  return <li className="modal_menu_item" onClick={onClick}>{itemText}</li>;
}

export default OpenModalMenuItem;
