import { useEffect, useState } from "react";
import { useAdvancedDashboardProvider } from "../../context/AdvancedDashboardContext";
import AddCustomerModal from "../../components/iiicustomers/AddCustomerModal";
import { deleteCustomer, getCustomers } from "../../api/iiicustomers/customers";
import { ICustomer } from "../../types/iiicustomers/Customer";
import { updateCustomer } from "../../api/iiicustomers/customers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faArchive,
  faBriefcase,
  faFax,
  faFloppyDisk,
  faHammer,
  faMoneyBill,
  faPencil,
  faPeopleRobbery,
  faPerson,
  faPhone,
  faRefresh,
  faSearch,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function CustomersDashboardPage() {
  const { setLoading, setLocation } = useAdvancedDashboardProvider();
  const [reloadLoading, setReloadLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [customers, setCustomers] = useState<ICustomer[]>();
  const [existingCustomer, setExistingCustomer] = useState<
    ICustomer | undefined
  >(undefined);

  const loadCustomers = async () => {
    setLoading(true);
    const allCustomers = await getCustomers();
    setCustomers(allCustomers);
    setLoading(false);
  };

  useEffect(() => {
    setLocation("III Customers");

    loadCustomers();
  }, []);

  const handleArchivedChange = async (id: string, archived: boolean) => {
    try {
      setLoading(true);
      await updateCustomer({ archived: !archived }, id);
      loadCustomers();
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-5 m-5 gap-5">
        <AddCustomerModal
          setExistingCustomer={setExistingCustomer}
          existingCustomer={existingCustomer}
        />
        <button
          className="btn btn-accent"
          onClick={async () => {
            setReloadLoading(true);
            await loadCustomers();
            setReloadLoading(false);
          }}
        >
          Reload <FontAwesomeIcon icon={faRefresh} spin={reloadLoading} />
        </button>
        <div></div>
        <div></div>
        <div className="w-full flex items-center">
          <FontAwesomeIcon
            icon={faSearch}
            size="2x"
            className="mr-1 p-3 rounded hover:bg-base-200"
          />
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full"
          />
        </div>
      </div>
      <div className="overflow-y-scroll m-3">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>
                First Name <FontAwesomeIcon icon={faPerson} />
              </th>
              <th>
                Last Name <FontAwesomeIcon icon={faPerson} />
              </th>
              <th>
                Business Name <FontAwesomeIcon icon={faBriefcase} />
              </th>
              <th>
                Address <FontAwesomeIcon icon={faAddressBook} />
              </th>
              <th>
                Phone <FontAwesomeIcon icon={faPhone} />
              </th>
              <th>
                Fax <FontAwesomeIcon icon={faFax} />
              </th>
              <th>
                Storage <FontAwesomeIcon icon={faFloppyDisk} />
              </th>
              <th>
                Archived <FontAwesomeIcon icon={faArchive} />
              </th>
              <th>
                Estimated Wealth <FontAwesomeIcon icon={faMoneyBill} />
              </th>
              <th>
                Amount Swindled <FontAwesomeIcon icon={faPeopleRobbery} />
              </th>
              <th>
                Perceived Priority (1 - 5) <FontAwesomeIcon icon={faStar} />
              </th>
              <th>
                Actions <FontAwesomeIcon icon={faHammer} />
              </th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((customer, index) => {
              return (
                <tr className="hover:bg-base-200" key={customer._id}>
                  <th>{index + 1}</th>
                  <th>{customer.firstName}</th>
                  <th>{customer.lastName}</th>
                  <th>{customer.businessName}</th>
                  <th>{customer.address}</th>
                  <th>{customer.phone}</th>
                  <th>{customer.fax}</th>
                  <th>{customer.storage}</th>
                  <th>
                    <input
                      type="checkbox"
                      className="hover:cursor-pointer"
                      checked={customer.archived}
                      onChange={() => {
                        if (
                          customer._id == undefined ||
                          customer.archived == undefined
                        ) {
                          return;
                        }
                        handleArchivedChange(customer._id, customer.archived);
                      }}
                    />
                  </th>
                  <th>{customer.estimatedWealth}</th>
                  <th>{customer.amountSwindled}</th>
                  <th>
                    {customer.perceivedPriority}{" "}
                    <FontAwesomeIcon icon={faStar} color="gold" />
                  </th>
                  <th className="grid gap-1 grid-cols-2">
                    <button
                      className="btn btn-error btn-xs"
                      onClick={async () => {
                        setDeleteLoading(true);
                        await deleteCustomer(customer._id);
                        await loadCustomers();
                        setDeleteLoading(false);
                      }}
                    >
                      {deleteLoading ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <FontAwesomeIcon icon={faTrash} />
                      )}
                    </button>
                    <button className="btn btn-success btn-xs">
                      <FontAwesomeIcon
                        icon={faPencil}
                        onClick={() => {
                          setExistingCustomer(customer);
                        }}
                      />
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
