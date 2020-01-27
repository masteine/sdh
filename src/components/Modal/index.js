import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CustomModal = (props) => {
  const { isOpen, onClose, className, acceptAction } = props;
  return (
    <div>
      <Modal isOpen={isOpen} className={className}>
        <ModalHeader toggle={onClose}>Warning!</ModalHeader>
        <ModalBody>{props.children}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={acceptAction}>
            Yes
          </Button>{' '}
          <Button color="secondary" onClick={onClose}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CustomModal;
