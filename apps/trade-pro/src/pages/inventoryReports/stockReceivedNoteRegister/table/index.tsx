import { Col, Row } from 'antd';
import SearchCriteria from './searchCriteria';
import { AntTable, BackButton } from '@tradePro/components';
import { DetailColumns } from './columns';
import { useTranslation } from 'react-i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetStockReceivedNoteRegister } from '../quries';

function StockReceivedNoteRegisterTable() {
  const { t } = useTranslation();

  const {
    refetch,
    data,
    isFetching,
    isError: isErrorStockReceivedRegister,
    isLoading: isStockReceivedRegisterLoading,
  } = useGetStockReceivedNoteRegister(true);


  function CriteriaString() {
    return (
      <Row style={{ border: '1px solid #25A7DF', padding: 7, borderRadius: 5 }}>
        <h5> {data?.data?.Data?.Result?.[0]?.ReportCriteria}</h5>
      </Row>
    );
  }
  
  return (
    <div style={{ background: '#fff' }}>
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={9} sm={10} md={6} lg={7} xl={6} xxl={5} className="forms-heading-container">
          <h1 className="report_heading" style={{ textAlign: 'center' }}>
            {t('stock_received_note_register')}
          </h1>
        </Col>
        <Col xxl={1} lg={1} md={1} style={{ marginRight: '50px' }}>
          <BackButton goToDashboard={false} />
        </Col>
      </Row>

      <Row justify={'space-around'}>
        <Col xxl={23}>
          <AntTable
            refetch={refetch}
            isError={isErrorStockReceivedRegister}
            data={data?.data?.Data?.Result || []}
            numberOfSkeletons={12}
            columns={DetailColumns(t)}
            searchCriteriaReport={data?.data?.Data?.Result?.[0]?.ReportCriteria ? <CriteriaString /> : ''}
            isLoading={isStockReceivedRegisterLoading || isFetching}
            searchCriteriaForm={<SearchCriteria />}
            scroll={{ x: '', y: convertVhToPixels('60vh') }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default StockReceivedNoteRegisterTable;
