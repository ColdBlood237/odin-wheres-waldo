import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "flowbite-react";

export default function StartingModal({ timer }) {
  const modalRef = useRef(null);
  const [openModal, setOpenModal] = useState("default");

  function startGame() {
    setOpenModal(undefined);
    timer.start();
    console.log("timer started " + timer.isStarted());
  }

  return (
    <>
      <Modal
        show={openModal === "default"}
        onClose={() => setOpenModal(undefined)}
      >
        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Where's Waldo game
          </h3>
        </div>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Find the characters above in the shortest possible time.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              When you find a character, click on its position on the image and
              select it from the list that will open.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={startGame}>Start</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
