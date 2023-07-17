import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRegisters } from "../api/register";
import { IRegister } from "../types/Register";
import { useEffect, useState } from "react";
import { faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

declare global {
  interface Window {
    addRegisterToPageModal: any;
  }
}

export default function AddRegisterToPageModal({ siteId }: { siteId: string }) {
  const [originalRegisters, setOriginalRegisters] = useState<IRegister[]>([]);
  const [displayedRegisters, setDisplayedRegisters] = useState<IRegister[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    getRegisters(siteId).then((registers) => {
      setOriginalRegisters(registers);
      setDisplayedRegisters(registers);
    });
  }, [siteId]);

  useEffect(() => {
    const lowerCaseSearch = search.toLowerCase();

    const filteredRegisters = originalRegisters.filter((register) =>
      register.name.toLowerCase().includes(lowerCaseSearch)
    );

    setDisplayedRegisters(filteredRegisters);
  }, [search, originalRegisters]);

  // Categorize the registers by the first letter of their names
  const categorizedRegisters = displayedRegisters.reduce<
    Record<string, IRegister[]>
  >((categories, register) => {
    const firstLetter = register.name[0].toUpperCase();
    if (!categories[firstLetter]) {
      categories[firstLetter] = [];
    }

    categories[firstLetter].push(register);
    return categories;
  }, {});
  return (
    <>
      <div className="tooltip fixed bottom-7 right-7" data-tip="Add Register">
        <button
          className="btn btn-primary"
          onClick={() => window.addRegisterToPageModal.showModal()}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <dialog id="addRegisterToPageModal" className="modal">
        <form method="dialog" className="modal-box">
          <h1 className="text-lg font-bold">Add Register</h1>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full mt-5"
          />

          <div className="overflow-x-auto h-72 shadow-sm rounded-md mt-5">
            <table className="table table-pin-rows">
              {Object.keys(categorizedRegisters).map((letter) => (
                <>
                  <thead>
                    <tr>
                      <th>{letter}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categorizedRegisters[letter].map((register) => (
                      <tr key={register._id}>
                        <td>{register.name}</td>
                        <td>
                          <button
                            className="btn btn-accent"
                            onClick={() => console.log(register)}
                          >
                            Add
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              ))}
            </table>
          </div>

          <div className="modal-action">
            <button className="btn btn-error">Cancel</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
