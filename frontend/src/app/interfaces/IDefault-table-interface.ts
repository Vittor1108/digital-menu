export interface IDefaultTable{
  title: string;
  data: Array<any>,
  columns: Array<string>,
  keyNames: Array<IKeyNames>,
  routerLink: string,
  deleteAction: Function,
  itemQuantity: number,
  changeAction: Function,
}


export interface IKeyNames {
  name: string,
  isPrice?: boolean;
  hasPhoto?: boolean;
}
