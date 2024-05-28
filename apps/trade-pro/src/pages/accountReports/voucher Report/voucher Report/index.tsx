import { AntTable, BackButton } from '@scs/ui';
import { Col, Row } from 'antd';
import { useGetVoucherReport } from './queries';
import { columnsVoucherReport } from './columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';
import './style.scss';
import SearchCriteriaVoucherReport from './searchCriteria';

function VoucherReport() {
  const { data, refetch, isError, isLoading, isFetching } = useGetVoucherReport();
  const { t } = useTranslation();


  const CriteriaString =()=>{
  return(
    <Row  style={{border: '1px solid #25A7DF',padding:7,borderRadius:5}}>
      <h5>{data?.data?.Data?.Result?.[0]?.ReportCriteria}</h5>
    </Row>
  )
  }
  return (
    <div style={{ background: '#fff' }}>
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={10} sm={10} md={12} lg={12} xl={14} xxl={16} className="">
          <h1 className="report_heading">{t('voucher_report')}</h1>
        </Col>
        <Col xxl={1} style={{ marginRight: '50px' }}>
          <BackButton goToDashboard={false} />
        </Col>
      </Row>

      <Row justify={'space-around'}>
        <Col xl={23} xxl={23} xs={23} sm={23} md={23}>
          <AntTable
            refetch={refetch}
            isError={isError}
            columns={columnsVoucherReport(t)}
            numberOfSkeletons={12}
            isLoading={isLoading || isFetching}
            data={data?.data?.Data?.Result || []}
            searchCriteriaForm={<SearchCriteriaVoucherReport  />}
            searchCriteriaReport={data?.data?.Data?.Result?.[0]?.ReportCriteria ? <CriteriaString/>:''}
            scroll={{ x: '', y: convertVhToPixels('65vh') }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default VoucherReport;
