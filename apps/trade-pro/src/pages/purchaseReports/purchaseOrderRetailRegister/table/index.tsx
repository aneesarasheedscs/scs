import { columns } from './columns';
import { AntTable } from '@tradePro/components';
import { useGetPurchaseOrder, useGetPurchaseOrderStatus } from '../queries';
import SearchCriteriaFrom from './SearchCriteriaForm';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row, theme } from 'antd';
import PurchaseOrderStatus from './purchaseOrderStatus';

const { useToken } = theme;

function PurchaseOrderTable() {
  const { t } = useTranslation();
  const { data, refetch, isError, isLoading, isFetching } = useGetPurchaseOrder();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  function CriteriaString() {
    return (
      <Row style={{ border: '1px solid #25A7DF', padding: 7, borderRadius: 5 }}>
        <h5> {data?.data?.Data?.Result?.[0]?.ReportCriteria}</h5>
      </Row>
    );
  }

  return (
    <>
      <Col xs={24} xl={24} xxl={24} style={{ display: 'flex', justifyContent: 'end', marginLeft: -35 }}>
        <Col xxl={21} xl={24} lg={23} xs={23} sm={23} md={23}>
          <PurchaseOrderStatus />
        </Col>
      </Col>
      <Row justify={'space-around'}>
        <Col xxl={23} xl={23} lg={23} xs={23} sm={23} md={23}>
          <AntTable
            rowKey="Id"
            refetch={refetch}
            isError={isError}
            columns={columns(t)}
            numberOfSkeletons={12}
            isLoading={isLoading || isFetching}
            data={data?.data?.Data?.Result || []}
            searchCriteriaForm={<SearchCriteriaFrom />}
            scroll={{ x: '', y: convertVhToPixels('60vh') }}
            searchCriteriaReport={data?.data?.Data?.Result ? <CriteriaString /> : ''}

            // printData={{pass options here as needed}}
            // downloadExcel={{pass options here as needed}}
            // downloadPdf={{pass options here as needed}}
          />
        </Col>
        {/* </Row> */}
      </Row>
    </>
  );
}

export default PurchaseOrderTable;
