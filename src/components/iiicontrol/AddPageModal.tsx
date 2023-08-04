import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Modal, { setAppElement } from "react-modal";
import { newSite } from "../../api/iiicontrol/site";
import { createPage } from "../../api/iiicontrol/page";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function AddPageModal({
  reloadTrigger,
  siteId,
}: {
  reloadTrigger: () => {};
  siteId: string;
}) {
  let subtitle: any;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [pageName, setPageName] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleAddPage() {
    setLoading(true);
    await createPage(pageName, siteId);
    reloadTrigger();
    setLoading(false);
    closeModal();
  }

  return (
    <div>
      <button className="tab-bordered tab" onClick={openModal}>
        Add Page <FontAwesomeIcon icon={faAdd} className="ml-2" />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div>
          <h1 className="text-2xl font-bold">Add Page</h1>
          <div className="mt-3">
            <p className="my-1 text-lg">Page Name</p>
            <input
              type="text"
              className="input-bordered input"
              value={pageName}
              onChange={(event) => setPageName(event.target.value)}
            />
          </div>
          <div className="mt-3 grid w-full grid-cols-2 justify-end gap-2">
            <button className="btn" onClick={closeModal}>
              Cancel
            </button>
            <button className="btn-success btn" onClick={handleAddPage}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Add"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
