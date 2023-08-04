import { ICustomer } from "../../types/iiicustomers/Customer";
import { apiDelete, apiGet, apiPost, apiPut } from "../../utils/api";

export async function createCustomer(customer: ICustomer) {
  const response = await apiPost("/api/iiicustomers", customer);
  return response;
}

export async function getCustomers(): Promise<ICustomer[]> {
  const response = await apiGet("/api/iiicustomers");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json(); // Parse the response body as JSON
  return data;
}

export async function updateCustomer(
  customer: Partial<ICustomer>,
  id?: string
) {
  const putId = id || customer._id;

  let updateCustomer: ICustomer = {
    address: customer.address,
    amountSwindled: customer.amountSwindled,
    archived: customer.archived,
    businessName: customer.businessName,
    estimatedWealth: customer.estimatedWealth,
    fax: customer.fax,
    firstName: customer.firstName,
    lastName: customer.lastName,
    perceivedPriority: customer.perceivedPriority,
    phone: customer.phone,
    storage: customer.storage,
  };

  const response = await apiPut(`/api/iiicustomers/${putId}`, updateCustomer);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json(); // Parse the response body as JSON
  return data;
}

export async function deleteCustomer(id: string | undefined) {
  if (!id) return;
  const response = await apiDelete(`/api/iiicustomers/${id}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json(); // Parse the response body as JSON
  return data;
}
