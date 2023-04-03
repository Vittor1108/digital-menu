import { IPhoto } from "@interfaces/IPhoto";

export interface ICategorie {
  id?: number;
  establishmentId?: number;
  name: string;
  description: string;
  createdAt?: Date;
  updeatedAt?: Date;
  PhotoCategory?: IPhoto[];
}