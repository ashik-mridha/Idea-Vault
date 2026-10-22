"use client";

import { Modal, useOverlayState } from "@heroui/react";
import { useEffect } from "react";
import IdeaForm from "./IdeaForm";

export default function EditIdeaModal({ idea, isOpen, saving, onClose, onSave }) {
  const state = useOverlayState({
    isOpen,
    onOpenChange: (open) => {
      if (!open) onClose();
    },
  });

  useEffect(() => {
    state.setOpen(isOpen);
  }, [isOpen, state]);

  if (!idea) return null;

  return (
    <Modal state={state}>
      <Modal.Backdrop>
        <Modal.Container scroll="outside">
          <Modal.Dialog className="sm:max-w-2xl">
            <Modal.Header>
              <Modal.Heading>Update idea</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <IdeaForm
                key={idea._id}
                formId="edit-idea-form"
                initial={idea}
                submitting={saving}
                onSubmit={(values) => onSave(idea._id, values)}
              />
            </Modal.Body>
            <Modal.Footer>
              <button type="button" className="btn-outline" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" form="edit-idea-form" className="btn-primary" disabled={saving}>
                {saving ? "Saving..." : "Save changes"}
              </button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
