export interface TableProps<T> {
    title: string;
    data: T[];
    columns: TableColumn<T>[];
    keyImage: string;
    deleteAction: Function;
    editAction: string;
    changeDataGet: Function;
    quantityData?: number;
}

interface TableColumn<T> {
    key: string;
    header: string;
    render: (item: T) => JSX.Element
}