import { Table } from "antd";

const GenericTable = <T extends Record<string, any>>({ title, data, loading }: GenericTableProps<T>) => {
    const columns: TableColumn<T>[] =
        data.length > 0
            ? Object.keys(data[0]).map((key) => ({
                title: key.toUpperCase(),
                dataIndex: key as keyof T,
                key: key,
                ellipsis: true,
            }))
            : [];

    return <Table columns={columns} dataSource={data} loading={loading}/>;
};

export default GenericTable;