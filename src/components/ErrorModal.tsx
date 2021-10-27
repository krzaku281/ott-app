import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ErrorModal({ error }: any) {
  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);
  useEffect(() => {
    !error && setModal(true);
  }, [error]);

  return (
    <div>
      <Modal show={error && modal} onHide={toggle}>
        <Modal.Header closeButton>Błąd</Modal.Header>
        <Modal.Body>
          <h3 className="text-center">{error && error.status}</h3>
          <div className="p-2 text-center">Skontaktuj się z administratorem lub spróbuj jeszcze raz</div>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" color="primary" onClick={toggle}>
            OK
          </Button>{' '}
        </Modal.Footer>
      </Modal>
    </div>
  );
}