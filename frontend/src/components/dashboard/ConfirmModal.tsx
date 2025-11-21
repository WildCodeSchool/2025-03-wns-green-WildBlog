
"use client";

import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface ModalProps {
    openModal?: boolean
    closeModal?: () => void // setOpenModal(false) ->on ferme la modale
    onConfirm?: () => void // fonction pour confirmer
    title?: string;
    message?: string;
}

export function ConfirmModal({openModal, closeModal, onConfirm, message='Are you sure you want to delete this product?' }: ModalProps) {

  return (
    <>
      <Modal show={openModal} size="md" onClose={closeModal} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={onConfirm}>
                Oui, supprimer
              </Button>
              <Button color="alternative" onClick={closeModal}>
                Annuler
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
