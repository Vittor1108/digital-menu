export interface TableProps<T> {
    title: string;
    data: T[];
    columns: TableColumn<T>[];
}

interface TableColumn<T> {
    key: string;
    header: string;
    render: (item: T) => JSX.Element
}