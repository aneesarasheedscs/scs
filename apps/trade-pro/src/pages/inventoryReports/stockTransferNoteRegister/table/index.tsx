import { Col, FormInstance, Row } from 'antd';
import SearchCriteria from './searchCriteria';
import { AntTable, BackButton } from '@tradePro/components';
import { BranchAndItemWiseColumns, DetailColumns } from './columns';
import { useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetStockTransferNoteRegister } from '../quries';
import { useAtom } from 'jotai';
import { actvitityPAtom } from './atom';

function StockTransferNoteRegisterTable() {
  const { t } = useTranslation();

  

  const [selectedActivity] = useAtom(actvitityPAtom);
  const selectedColumns = (() => {
    switch (selectedActivity) {
      case 'Detail':
        return DetailColumns(t);
      case 'BranchAndItemWiseSummary':
        return BranchAndItemWiseColumns(t);
      default:
        return DetailColumns(t);
    }
  })();

  const {
    refetch,
    data,
    isFetching,
    isError: isErrorStockTransferRegister,
    isLoading: isStockTransferRegisterLoading,
    
  } = useGetStockTransferNoteRegister(true);
  function CriteriaString() {
    return (
      <Row  style={{ border: '1px solid #25A7DF', padding: 7, borderRadius: 5 }}>
        <h5> {data?.data?.Data?.Result?.[0]?.ReportCriteria}</h5>
      </Row>
    );
  }
  return (
    <div style={{ background: '#fff' }}>
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={9} sm={10} md={6} lg={7} xl={6} xxl={5} className="forms-heading-container">
          <h1 className="report_heading" style={{ textAlign: 'center' }}>
            {t('stock_transfer_note_register')}
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
            isError={isErrorStockTransferRegister}
            data={data?.data?.Data?.Result || []}
            numberOfSkeletons={12}
            columns={selectedColumns}
            searchCriteriaReport={data?.data?.Data?.Result?.[0]?.ReportCriteria  ? <CriteriaString/> : ''}
            isLoading={isStockTransferRegisterLoading || isFetching}
            searchCriteriaForm={<SearchCriteria />}
            scroll={{ x: '', y: convertVhToPixels('60vh') }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default StockTransferNoteRegisterTable;
