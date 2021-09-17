import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const SaveTripModal = ({ saveAsFile }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button
        id="save"
        onClick={() => toggle()}
      >
        Save
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Select Save Format
        </ModalHeader>
        <ModalBody>
          <Button onClick={() => console.log("save as json")}>
            json
          </Button>
          <Button onClick={() => console.log("save as csv")}>
            csv
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => saveAsFile()}>Save Trip</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SaveTripModal;