export interface IAction {
  type: "link";
  url: string;
  name: string;
}

export interface IAlert {
  title: string;
  body: string;
  severity: "warning" | "danger";
  id: string;
  action: IAction;
}
