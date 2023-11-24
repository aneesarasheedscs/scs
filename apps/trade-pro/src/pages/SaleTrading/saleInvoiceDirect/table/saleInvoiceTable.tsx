import { AntButton, AntTable } from '@scs/ui';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col, Row, theme } from 'antd';
import { columns, detailColumn } from './columns';
import { useTranslation } from 'react-i18next';

function SaleInvoiceTable({ setSelectedRecordId, setActiveTab }: TFrom) {
  const { t } = useTranslation();
  //   const { data, isError, isLoading } = useGetContraVoucherTable();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <div style={{ marginLeft: '1%' }}>
      {/* <h2 style={{ marginTop: '1%' }} className="form-heading">
        {t('sale_invoice_history')}
      </h2> */}

      <Row style={{ marginTop: '1%' }}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}>
            <AntTable
              //   isError={isError}
              numberOfSkeletons={8}
              //   isLoading={isLoading}
              scroll={{ x: '', y: convertVhToPixels('15vh') }}
              // style={{ width: 'auto', padding: '2%' }}
              //   data={data?.data?.Data?.Result}
              columns={columns(t, setSelectedRecordId, setActiveTab)}
            />
          </Card>
        </Col>
      </Row>

      <h2 style={{ marginTop: '1%' }} className="form-heading">
        {t('invoice_detail')}
      </h2>

      <Row style={{ marginTop: '0.5%' }}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}>
            <AntTable
              //   isError={isError}
              numberOfSkeletons={8}
              //   isLoading={isLoading}
              scroll={{ x: '', y: convertVhToPixels('15vh') }}
              //   data={data?.data?.Data?.Result}
              columns={detailColumn(t, setSelectedRecordId, setActiveTab)}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

type TFrom = {
  setSelectedRecordId: (id: number | null) => void;
  setActiveTab: (tab: string) => void;
};

export default SaleInvoiceTable;
