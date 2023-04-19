import { IScreens } from "@interfaces/IScreens";

//USERTYPE
export type InfoType =  {
  screens: IScreens[],
  nameUser: string;
}

//PROPSUSERCONTEXT
export type IContext  = {
  state: InfoType;
  setState: React.Dispatch<React.SetStateAction<InfoType>>
}
