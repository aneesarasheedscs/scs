import { columns } from './columns';
import { AntTable, BackButton } from '@tradePro/components';
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
    <div style={{backgroundColor:'#fff'}}>
          <Row justify={'space-between'} align={'middle'}>
        <Col xs={12} sm={10} md={12} lg={12} xl={14} xxl={16} className="forms-heading-container">
          <h1 className="report_heading">{t('purchase_order_retail_register')}</h1>
        </Col>

        <Col xxl={1} style={{ marginRight: '50px' }}>
          <BackButton goToDashboard={true} />
        </Col>
      </Row>
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
            scroll={{ x: '', y: convertVhToPixels('55vh') }}
            searchCriteriaReport={data?.data?.Data?.Result?.[0]?.ReportCriteria ? <CriteriaString /> : ''}

            // printData={{pass options here as needed}}
            // downloadExcel={{pass options here as needed}}
            // downloadPdf={{pass options here as needed}}
          />
        </Col>
        {/* </Row> */}
      </Row>
    </div>
  );
}

export default PurchaseOrderTable;
