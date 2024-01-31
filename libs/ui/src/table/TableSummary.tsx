import { Table } from 'antd';
import { numberFormatter } from './utils';
import { ColumnType } from 'antd/es/table';
import { map, meanBy, size, sumBy } from 'lodash';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

function TableSummary({ data, columns, filteredData }: TTableSummary) {
  const { t } = useTranslation();
  return (
    <Table.Summary.Row style={{}}>
      {map(columns, (col: AntColumnType<any>, index: any) => {
        const dataIndex = col?.dataIndex as string;
        if (col.hidden) {
          return null;
        }
        const dataToCalculate = size(filteredData) > 0 && size(filteredData) !== size(data) ? filteredData : data;
        if (col.hidden) {
          return null;
        }
        const total = sumBy(dataToCalculate, (item) => item?.[dataIndex]);
        const average = meanBy(dataToCalculate, (item) => item?.[dataIndex]);
        const count = _.size(_.filter(dataToCalculate, (item) => item?.[dataIndex]));

        return (
          <Table.Summary.Cell key={index + '' + dataIndex} index={index}>
            <b>
              {col?.showTotal ? (
                <span style={{ display: 'flex', justifyContent: 'end', marginRight: '4.5%' }}>
                  {numberFormatter(total)}
                </span>
              ) : col?.showAverage ? (
                numberFormatter(average)
              ) : col?.showCount ? (
                // <span style={{ display: 'flex', justifyContent: 'center', marginLeft: '-30%' }}>
                <span style={{ display: 'flex', justifyContent: 'start', marginLeft: '' }}>
                  {/* Total No of Records: {numberFormatter(count)} */}
                  {t('records')}: {numberFormatter(count)}
                </span>
              ) : null}
            </b>

            {/* <b>{col?.showTotal ? numberFormatter(total) : col?.showAverage ? numberFormatter(average) : col?.showCount ? numberFormatter(count) : null}</b> */}
          </Table.Summary.Cell>
        );
      })}
    </Table.Summary.Row>
  );
}

type TTableSummary = { data?: any[]; columns: any[]; filteredData: any[] };
type AntColumnType<T> = {
  showTotal?: boolean;
  showAverage?: boolean;
  showCount?: boolean;
  hidden?: boolean;
} & ColumnType<T>;

export default TableSummary;
