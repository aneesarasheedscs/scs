import { column, columns } from './columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row, Table, theme } from 'antd';
import { TMonthlySaleReport } from '../types';

const { useToken } = theme;

function SaleReportbyMonth({ getMonthandQuarter, refetch, isError, isLoading, isFetching }: any) {
  const { t } = useTranslation();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Row justify={'end'}>
        <Col span={24}>
          <Table
            dataSource={getMonthandQuarter?.data?.Data?.Result?.Table2 || []}
            columns={columns(t)}
            pagination={false}
            size="small"
            scroll={{ x: '', y: convertVhToPixels('21vh') }}
          />
        </Col>
      </Row>
    </>
  );
}

export default SaleReportbyMonth;

export function SaleReportbyQuarter({ getMonthandQuarter, refetch, isError, isLoading, isFetching }: any) {
  const { t } = useTranslation();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const totalAmount = getMonthandQuarter?.data?.Data?.Result?.Table1.reduce(
    (acc: number, item: TMonthlySaleReport) => acc + item.CurrSaleAmount,
    0
  );
  console.log(totalAmount);

  return (
    <>
      <Table
        dataSource={getMonthandQuarter?.data?.Data?.Result?.Table1 || []}
        columns={column(t)}
        pagination={false}
        size="small"
        scroll={{ x: '', y: convertVhToPixels('21vh') }}
        // footer={() => (
        //   <div>
        //     <strong>Total:</strong> {numberFormatter(totalAmount)}
        //   </div>
        // )}
      />
    </>
  );
}
