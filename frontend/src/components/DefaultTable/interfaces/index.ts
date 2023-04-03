export interface TableProps<T> {
    title: string;
    data: T[];
    columns: TableColumn<T>[];
    keyImage: string;
    deleteAction: Function;
    editAction: string;
    
}

interface TableColumn<T> {
    key: string;
    header: string;
    render: (item: T) => JSX.Element
}