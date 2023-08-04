import React, { useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createCustomer,
  updateCustomer,
} from "../../api/iiicustomers/customers";
import { ICustomer } from "../../types/iiicustomers/Customer";

declare global {
  interface Window {
    customer_modal: {
      showModal: () => void;
      close: () => void;
    };
  }
}

export default function CustomerModal({
  existingCustomer,
  setExistingCustomer,
}: {
  existingCustomer?: ICustomer;
  setExistingCustomer: (customer: ICustomer | undefined) => void;
}) {
  const [customer, setCustomer] = useState<ICustomer>({
    firstName: "",
    lastName: "",
    businessName: "",
    address: "",
    phone: "",
    fax: "",
    storage: 0,
    archived: false,
    estimatedWealth: "",
    amountSwindled: "",
    perceivedPriority: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingCustomer) {
      setCustomer(existingCustomer);
      window.customer_modal.showModal();
    } else {
      setCustomer({
        firstName: "",
        lastName: "",
        businessName: "",
        address: "",
        phone: "",
        fax: "",
        storage: 0,
        archived: false,
        estimatedWealth: "",
        amountSwindled: "",
        perceivedPriority: 0,
      });
    }
  }, [existingCustomer]);

  const customerInputs = [
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      class: "input input-bordered",
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
      class: "input input-bordered",
    },
    {
      name: "businessName",
      type: "text",
      label: "Business Name",
      class: "input input-bordered",
    },
    {
      name: "address",
      type: "text",
      label: "Address",
      class: "input input-bordered",
    },
    {
      name: "phone",
      type: "text",
      label: "Phone",
      class: "input input-bordered",
    },
    { name: "fax", type: "text", label: "Fax", class: "input input-bordered" },
    {
      name: "storage",
      type: "number",
      label: "Storage(GB)",
      class: "input input-bordered",
    },
    {
      name: "archived",
      type: "checkbox",
      label: "Archived",
      class: "input input-bordered",
    },
    {
      name: "estimatedWealth",
      type: "text",
      label: "Estimated Wealth",
      class: "input input-bordered",
    },
    {
      name: "amountSwindled",
      type: "text",
      label: "Amount Swindled",
      class: "input input-bordered",
    },
    {
      name: "perceivedPriority",
      type: "number",
      label: "Perceived Priority (1 - 5)",
      class: "input input-bordered",
    },
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setCustomer({
      ...customer,
      [e.target.name as keyof ICustomer]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({
      ...customer,
      [e.target.name as keyof ICustomer]: e.target.checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (existingCustomer) {
      await updateCustomer(customer);
      setExistingCustomer(undefined);
    } else {
      createCustomer(customer);
    }
    setLoading(false);
    window.customer_modal.close();
  };

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => window.customer_modal.showModal()}
      >
        Add Customer <FontAwesomeIcon icon={faPlus} />
      </button>
      <dialog id="customer_modal" className="modal">
        <form method="dialog" className="modal-box" onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">Add Customer</h3>
          <div className="grid grid-cols-2 gap-4">
            {customerInputs.map((input) =>
              input.type !== "checkbox" ? (
                <div key={Math.random()}>
                  <label className="label">{input.label}</label>
                  <input
                    name={input.name}
                    className={input.class}
                    type={input.type}
                    value={
                      customer[input.name as keyof ICustomer]?.toString() || ""
                    }
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <div key={Math.random()} className="flex flex-col">
                  <label className="label">{input.label}</label>
                  <input
                    type="checkbox"
                    name={input.name}
                    className={input.class}
                    checked={customer[input.name as keyof ICustomer] as boolean}
                    onChange={handleCheckboxChange}
                  />
                </div>
              )
            )}
          </div>
          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={() => window.customer_modal.close()}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              Submit{" "}
              {loading && (
                <div className="loading loading-spinner loading-xs" />
              )}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
