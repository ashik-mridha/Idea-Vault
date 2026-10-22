"use client";

import { Modal, useOverlayState } from "@heroui/react";
import { useEffect } from "react";

export default function DeleteConfirmModal({ isOpen, title, deleting, onClose, onConfirm }) {
  const state = useOverlayState({
    isOpen,
    onOpenChange: (open) => {
      if (!open) onClose();
    },
  });

  useEffect(() => {
    state.setOpen(isOpen);
  }, [isOpen, state]);

  return (
    <Modal state={state}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Delete idea</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>
                Are you sure you want to delete <strong>{title}</strong>? Its comments will be removed too. This
                cannot be undone.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <button type="button" className="btn-outline" onClick={onClose}>
                Cancel
              </button>
              <button type="button" className="btn-danger" onClick={onConfirm} disabled={deleting}>
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
