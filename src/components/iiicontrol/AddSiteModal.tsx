import { faAdd, faPlug } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode } from "react";
import Modal from "react-modal";
import { newSite } from "../../api/iiicontrol/site";

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

export default function AddSiteModal({
  reloadTrigger,
}: {
  reloadTrigger: () => {};
}) {
  let subtitle: any;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [siteName, setSiteName] = React.useState("");
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

  async function handleAddSite() {
    setLoading(true);
    await newSite(siteName);
    reloadTrigger();
    setLoading(false);
    closeModal();
  }

  return (
    <div>
      <button
        className="btn btn-secondary col-span-1 h-full w-full"
        onClick={openModal}
      >
        Add Site <FontAwesomeIcon icon={faAdd} />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div>
          <h1 className="font-bold text-2xl">Add Site</h1>
          <div className="mt-3">
            <p className="text-lg my-1">Site Name</p>
            <input
              type="text"
              className="input input-bordered"
              value={siteName}
              onChange={(event) => setSiteName(event.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 justify-end w-full mt-3">
            <button className="btn" onClick={closeModal}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleAddSite}>
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
