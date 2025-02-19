import Table, { ColumnType } from "antd/es/table";
import { useMemo } from "react";
import { getSorter } from "../../utils/sort";
import "./index.scss";

interface AntDComponentProps<T> {
  dataSource: T[];
  columns: ColumnType<T>[];
  bordered?: boolean;
  columnFlex?: number;
}

const AntDComponent = <T extends Record<string, any>>({
  dataSource = [],
  columns,
  bordered = true,
  columnFlex = 1,
}: AntDComponentProps<T>) => {
  const processedColumns = useMemo(() => {
    return columns.map((col) => ({
      ...col,
      sorter:
        col.sorter !== false && col.dataIndex
          ? getSorter(col.dataIndex as keyof T)
          : col.sorter,
      width: col.width || undefined,
      onHeaderCell: () => ({
        style: {
          flex: col.width ? `0 0 ${col.width}px` : `${columnFlex} 1 0`,
          minWidth: col.width ? col.width : 100, // Tránh cột quá bé
          maxWidth: col.width ? col.width : "auto",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      }),
    }));
  }, [columns, columnFlex]);
  return (
    <>
      <Table
        dataSource={dataSource}
        columns={processedColumns}
        bordered={bordered}
        pagination={{ pageSize: 7 }}
        scroll={{ x: "max-content" }}
      />
    </>
  );
};

export default AntDComponent;
