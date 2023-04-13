import { EStatusRequest } from "@enums/EStatusRequest";
import { IRequests } from "@interfaces/IRequests";

export interface ICardRequest {
  data: IRequests[];
  titleModal: string;
  subTitleModal: string;
  showCancel: boolean;
  textButton: string;
  actionProcced?: EStatusRequest;
}
