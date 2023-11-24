import classNames from 'classnames';
import { Table, theme } from 'antd';
import type { TableProps } from 'antd';
import ResizeObserver from 'rc-resize-observer';
import { VariableSizeGrid as Grid } from 'react-window';
import React, { useEffect, useRef, useState } from 'react';

export const AntTableVirtualized = <RecordType extends object>(props: TableProps<RecordType>) => {
  const { columns, scroll } = props;
  const [tableWidth, setTableWidth] = useState(0);
  const { token } = theme.useToken();

  const widthColumnCount = columns!.filter(({ width }) => !width).length;
  const mergedColumns: any = columns!.map((column) => {
    if (column.width) {
      return column;
    }

    return {
      ...column,
      width: Math.floor(tableWidth / widthColumnCount),
    };
  });

  const gridRef = useRef<any>();
  const [connectObject] = useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => {
        if (gridRef.current) {
          return gridRef.current?.state?.scrollLeft;
        }
        return null;
      },
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });

  const resetVirtualGrid = () => {
    gridRef.current?.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });
  };

  useEffect(() => resetVirtualGrid, [tableWidth, columns]);

  const renderVirtualList = (rawData: readonly object[], { scrollbarSize, ref, onScroll }: any) => {
    ref.current = connectObject;
    const totalHeight = rawData.length * 40;

    return (
      <Grid
        ref={gridRef}
        width={tableWidth}
        rowHeight={() => 40}
        className="virtual-grid"
        rowCount={rawData.length}
        height={scroll!.y as number}
        columnCount={mergedColumns.length}
        columnWidth={(index: number) => {
          const { width } = mergedColumns[index];
          return totalHeight > (scroll?.y as number) && index === mergedColumns.length - 1
            ? (width as number) - scrollbarSize - 1
            : (width as number);
        }}
        onScroll={({ scrollLeft }: { scrollLeft: number }) => {
          onScroll({ scrollLeft });
        }}
      >
        {({ columnIndex, rowIndex, style }: { columnIndex: number; rowIndex: number; style: React.CSSProperties }) => {
          const column = mergedColumns[columnIndex];
          const cellData: any = (rawData?.[rowIndex] as any)[column?.dataIndex];

          const renderCellContent = () => {
            if (column.render && typeof column.render === 'function') {
              return column.render(cellData, rawData?.[rowIndex], rowIndex);
            }
            return cellData;
          };

          return (
            <div
              className={classNames('virtual-table-cell', {
                'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
              })}
              style={{
                ...style,
                padding: token.padding,
                boxSizing: 'border-box',
                background: token.colorBgContainer,
                borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
              }}
            >
              {renderCellContent()}
            </div>
          );
        }}
      </Grid>
    );
  };

  return (
    <ResizeObserver onResize={({ width }) => setTableWidth(width)}>
      <Table
        {...props}
        size="small"
        pagination={false}
        columns={mergedColumns}
        className="virtual-table"
        components={{ body: renderVirtualList }}
      />
    </ResizeObserver>
  );
};
