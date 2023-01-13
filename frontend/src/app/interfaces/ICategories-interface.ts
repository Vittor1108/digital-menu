export interface ICategoriesForm {
  name: string;
  description: string;
  photo: string;
}

export interface ICategoriesCreate {
  id: number;
  user_id: number;
  name: string;
  description: string;
  updeated_at: Date;
  created_at: Date;
}

export interface IGetAllCategories {
  id: number;
  name: string;
  description: string;
  PhotoCategory: IPhotoCategory[];
}

export interface IGetAllCategoriesCount {
  categories: Array<IGetAllCategories>;
  count: number;
}

interface IPhotoCategory {
  id: number;
  filename: string;
  url: string;
}

export interface IUpdatedFormCategory {
  name: string;
  description: string;
}

export interface IUpdatedReturnCategory {
  id: number;
  user_id: number;
  description: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface IDataGetCategories {
  skip: number;
  take: number;
  text: string;
}
