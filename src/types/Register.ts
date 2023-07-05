export interface IRegister {
  _id: string;
  name: string;
  value: string;
  userId: string;
  controlType: "read" | "write";
  unit: string;
}
