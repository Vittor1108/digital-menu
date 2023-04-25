export interface IGetAllEmployees {
  where: {
    establishmentId: number;
    name?: {
      contains?: string;
    };
  };
  take?: number;
  skip?: number;
}
