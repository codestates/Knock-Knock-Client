import React, { useState } from "react";
import Modal from "react-modal";
const StackSelector = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={setShowModal(true)}>Trigger Modal</button>
      <Modal isOpen={showModal} contentLabel="Minimal Modal Example">
        <button onClick={setShowModal(false)}>Close Modal</button>
      </Modal>
    </div>
  );
};

export default StackSelector;
