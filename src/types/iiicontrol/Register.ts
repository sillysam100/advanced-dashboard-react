export interface IRegister {
  _id: string;
  name: string;
  organizationId: string;
  value: string;
  controlType: "read" | "write";
  unit: string;
}
