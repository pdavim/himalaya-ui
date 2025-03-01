'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import useScale, { withScale } from '../use-scale';
import useRealShape from '../utils/use-real-shape';
import useResize from '../utils/use-resize';
import TableBody from './table-body';
import TableColumn from './table-column';
import { TableConfig, TableContext } from './table-context';
import TableHead from './table-head';
import { TableAbstractColumn, TableDataItemBase, TableOnCellClick, TableOnChange, TableOnRowClick, TableRowClassNameHandler } from './table-types';

interface Props<TableDataItem extends TableDataItemBase> {
  data?: Array<TableDataItem>;
  initialData?: Array<TableDataItem>;
  emptyText?: string;
  hover?: boolean;
  onRow?: TableOnRowClick<TableDataItem>;
  onCell?: TableOnCellClick<TableDataItem>;
  onChange?: TableOnChange<TableDataItem>;
  className?: string;
  rowClassName?: TableRowClassNameHandler<TableDataItem>;
  hasBorder?: boolean;
}

type NativeAttrs = Omit<React.TableHTMLAttributes<any>, keyof Props<any>>;
export type TableProps<TableDataItem extends TableDataItemBase> = Props<TableDataItem> & NativeAttrs;

function TableComponent<TableDataItem extends TableDataItemBase>(tableProps: React.PropsWithChildren<TableProps<TableDataItem>>) {
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  const {
    children,
    data: customData,
    initialData = [],
    hover = true,
    hasBorder = true,
    emptyText = '',
    onRow,
    onCell,
    onChange,
    className = '',
    rowClassName = () => '',
    ...props
  } = tableProps as React.PropsWithChildren<TableProps<TableDataItem>>;
  /* eslint-enable @typescript-eslint/no-unused-vars */
  const { SCALES } = useScale();
  const ref = useRef<HTMLTableElement>(null);
  const [{ width }, updateShape] = useRealShape<HTMLTableElement>(ref);
  const [columns, setColumns] = useState<Array<TableAbstractColumn<TableDataItem>>>([]);
  const [data, setData] = useState<Array<TableDataItem>>(initialData);

  const updateColumn = (column: TableAbstractColumn<TableDataItem>) => {
    setColumns(last => {
      const hasColumn = last.find(item => item.prop === column.prop);
      if (!hasColumn) return [...last, column];
      return last.map(item => {
        if (item.prop !== column.prop) return item;
        return column;
      });
    });
  };

  const deleteColumn = (prop: keyof TableDataItem) => {
    setColumns(last => {
      return last.filter(item => item.prop !== prop);
    });
  };

  const contextValue = useMemo<TableConfig<TableDataItem>>(
    () => ({
      columns,
      updateColumn,
      deleteColumn,
    }),
    [columns],
  );

  useEffect(() => {
    if (typeof customData === 'undefined') return;
    setData(customData);
  }, [customData]);

  useResize(() => updateShape());

  return (
    <TableContext.Provider value={contextValue}>
      <table ref={ref} className={className} {...props}>
        <TableHead columns={columns} width={width} hasBorder={hasBorder} />
        <TableBody<TableDataItem> data={data} hover={hover} emptyText={emptyText} onRow={onRow} onCell={onCell} rowClassName={rowClassName} />
        {children}

        <style jsx>{`
          table {
            border-collapse: separate;
            border-spacing: 0;
            --table-font-size: ${SCALES.font(1)};
            font-size: var(--table-font-size);
            width: ${SCALES.width(1, '100%')};
            height: ${SCALES.height(1, 'auto')};
            padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
          }
        `}</style>
      </table>
    </TableContext.Provider>
  );
}

TableComponent.displayName = 'HimalayaTable';
TableComponent.Column = TableColumn;
const Table = withScale(TableComponent) as any;
Table.Column = TableColumn;

export type TableType = typeof Table & {
  Column: typeof TableColumn;
};

export default Table as TableType;
