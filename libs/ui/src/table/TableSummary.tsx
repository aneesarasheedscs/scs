import { Table } from 'antd';
import { numberFormatter } from './utils';
import { ColumnType } from 'antd/es/table';
import { map, meanBy, size, sumBy } from 'lodash';
import _ from 'lodash';

function TableSummary({ data, columns, filteredData }: TTableSummary) {
  return (
    <Table.Summary.Row>
      {map(columns, (col: AntColumnType<any>, index: any) => {
        const dataIndex = col?.dataIndex as string;

        const dataToCalculate = size(filteredData) > 0 && size(filteredData) !== size(data) ? filteredData : data;

        const total = sumBy(dataToCalculate, (item) => item?.[dataIndex]);
        const average = meanBy(dataToCalculate, (item) => item?.[dataIndex]);
        const count = _.size(_.filter(dataToCalculate, (item) => item?.[dataIndex]));

        return (
          <Table.Summary.Cell key={index + '' + dataIndex} index={index}>
            <b style={{ display: 'flex', justifyContent: 'end', marginRight: '6.5%' }}>
              {col?.showTotal
                ? numberFormatter(total)
                : col?.showAverage
                ? numberFormatter(average)
                : col?.showCount
                ? numberFormatter(count)
                : null}
            </b>
            {/* <b>{col?.showTotal ? numberFormatter(total) : col?.showAverage ? numberFormatter(average) : col?.showCount ? numberFormatter(count) : null}</b> */}
          </Table.Summary.Cell>
        );
      })}
    </Table.Summary.Row>
  );
}

type TTableSummary = { data?: any[]; columns: any[]; filteredData: any[] };
type AntColumnType<T> = { showTotal?: boolean; showAverage?: boolean; showCount?: boolean } & ColumnType<T>;

export default TableSummary;
