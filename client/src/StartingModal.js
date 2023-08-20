import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "flowbite-react";

export default function StartingModal() {
  const modalRef = useRef(null);
  const [openModal, setOpenModal] = useState("default");

  function startGame() {
    setOpenModal(undefined);
  }

  useEffect(() => {
    console.log(modalRef);
  }, []);

  return (
    // <>
    //   <div
    //     ref={modalRef}
    //     id="staticModal"
    //     data-modal-backdrop="static"
    //     data-modal-placement="bottom-right"
    //     tabIndex="-1"
    //     aria-hidden="true"
    //     className="fixed top-0 left-0 right-0 z-50 show w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    //   >
    //     <div className="relative w-full max-w-2xl max-h-full">
    //       <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
    //         <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
    //           <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
    //             Where's Waldo game
    //           </h3>
    //         </div>

    //         <div className="p-6 space-y-6">
    //           <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
    //             Find the characters above in the shortest possible time.
    //           </p>
    //           <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
    //             When you find a character, click on its position on the image
    //             and select it from the list that will open.
    //           </p>
    //         </div>

    //         <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
    //           <button
    //             onClick={startGame}
    //             data-modal-hide="staticModal"
    //             type="button"
    //             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //           >
    //             Start
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
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
