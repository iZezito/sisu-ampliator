import { Table } from "antd";

const GenericTable = <T extends Record<string, any>>({ title, data, loading }: GenericTableProps<T>) => {
    const columns: TableColumn<T>[] =
        data.length > 0
            ? Object.keys(data[0]).map((key) => ({
                title: key.toUpperCase(),
                dataIndex: key as keyof T,
                key: key,
            }))
            : [];

    return <Table columns={columns} dataSource={data} loading={loading} title={() => title} scroll={{y: 600}}/>;
};

export default GenericTable;