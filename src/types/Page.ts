export interface ILayoutEntry {
  registerId: string;
  cols: number;
  rows: number;
  position: number;
}

export interface IPage {
  _id?: string;
  siteId: string;
  name: string;
  layout: ILayoutEntry[];
}
