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
