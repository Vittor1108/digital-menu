export interface IPhoto {
    id: number;
    url: string;
    filename: string;
    originalname?: string;
    category_id?: number;
    created_at?: Date;
    updated_at?: Date;
}