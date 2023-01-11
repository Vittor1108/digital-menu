export interface IUploadPhoto {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkiRelativePath: string;
  length: number;
}

export interface IReturnUploadPhoto {
  id: number;
  category_id: number;
  originalname: string;
  url: string;
  updated_at: Date;
  created_at: Date;
}

export interface IPhotocategory {
  id?: number;
  filename?: string;
  originalname?: string;
  url: string;
}
