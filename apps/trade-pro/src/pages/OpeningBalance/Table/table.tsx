import { AntTable } from '@tradePro/components';

import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

import { useTranslation } from 'react-i18next';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { Col, Row } from 'antd';

// import { useSaleOrderTable } from '../query/query';
// import { Columns } from './columns';
// import SearchCriteriaForm from '../searchCriteria/SearchCriteriaForm';
import { useGetOpeningBalanceTable } from '../queries/table';
// import { columns } from './columns';

function VoucherReportTable() {
  const {
    data: OpeningBalance,
    isError: Error,
    isLoading: Loading,
    isSuccess: Success,
    isFetching: Fetching,
    refetch: Refetch,
  } = useGetOpeningBalanceTable();
  const { t } = useTranslation();
  //   const totalSaleAmount =
  //     sale?.data?.Data?.Result.reduce((total: number, item: any) => total + item.SaleAmount, 0) || 0;
  //   const totalCgsAmount = sale?.data?.Data?.Result.reduce((total: number, item: any) => total + item.CgsAmount, 0) || 0;
  //   const totalSaleQty = sale?.data?.Data?.Result.reduce((total: number, item: any) => total + item.SaleQty, 0) || 0;
  //   const totalSaleWeight =
  //     sale?.data?.Data?.Result.reduce((total: number, item: any) => total + item.SaleWeight, 0) || 0;
  //   const totalGrossProfitLosst =
  //     sale?.data?.Data?.Result.reduce((total: number, item: any) => total + item.GrossProfitLoss, 0) || 0;

  return (
    <>
      <Row
        style={{
          marginBottom: '5px',
          width: '100%',
        }}
        className="row-border"
      >
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
          <h2 className="tableTitle">{t('sale_order_history')}</h2>
        </Col>
      </Row>

      <AntTable
        // refetch={Refetch}
        // isError={Error}
        // columns={columns()}
        numberOfSkeletons={12}
        // expandable={expandable}
        // isLoading={Loading || Fetching}
        // data={OpeningBalance?.data?.Data?.Result}
        // searchCriteriaForm={<SearchCriteriaForm />}
        scroll={{ x: '', y: convertVhToPixels('62vh') }}
        // footer={() => (
        //   <>
        //     <div>
        //       <Row justify="center" gutter={[16, 16]}>
        //         <Col xs={24} sm={12} md={8} lg={6} xl={2}>
        //           <p>{t('detail_total')}:</p>
        //         </Col>
        //         <Col xs={24} sm={12} md={8} lg={6} xl={2}>
        //           <p>{numberFormatter(totalSaleQty)}</p>
        //         </Col>
        //         <Col xs={24} sm={12} md={8} lg={6} xl={2}>
        //           <p>{numberFormatter(totalSaleWeight)}</p>
        //         </Col>
        //         <Col xs={24} sm={12} md={8} lg={6} xl={2}>
        //           <p>{numberFormatter(totalSaleAmount)}</p>
        //         </Col>
        //         <Col xs={24} sm={12} md={8} lg={6} xl={2}>
        //           <p>{numberFormatter(totalCgsAmount)}</p>
        //         </Col>

        //         <Col xs={24} sm={12} md={8} lg={6} xl={2}>
        //           <p>{numberFormatter(totalGrossProfitLosst)}</p>
        //         </Col>
        //       </Row>
        //     </div>
        //   </>
        // )}
      />
    </>
  );
}

export default VoucherReportTable;
