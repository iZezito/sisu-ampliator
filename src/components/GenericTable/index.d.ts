interface TableColumn<T> {
    title: string;
    dataIndex: keyof T;
    key: string;
    responsive?: string[];
}

interface GenericTableProps<T> {
    data: T[];
    title?: string;
    loading?: boolean;
}