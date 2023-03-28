export interface IGenericModal {
  imagePath: string;
  title: string;
  subTitle: string;
  articleWidth: string;
  isOpen: boolean;
  clickFunction?: Function;
  fontColorConfirm?: string;
  fontColorDeny?: string;
  buttonColorConfirm?: string;
  buttonWidth?: string;
  maxArticleWidth?: string;
  textConfirmButton: string;
  textDenayButton?: string;
  buttonColorDenay?: string;
}
