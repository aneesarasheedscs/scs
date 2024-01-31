import { AntTable } from '@scs/ui';
import { Col, Row } from 'antd';
import { useGetVoucherReport } from './queries';
import { columnsVoucherReport } from './columns';
import { t } from 'i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';
import './style.scss';
import SearchCriteriaVoucherReport from './searchCriteria';

function VoucherReport() {
  const { data, refetch, isError, isLoading, isFetching } = useGetVoucherReport();
  const { t } = useTranslation();
  return (
    <div style={{ background: '#fff' }}>
      <Row>
        <Col xs={10} sm={10} md={12} lg={12} xl={14} xxl={16} className="forms-heading-container">
          <h1 className="report_heading">{t('voucher_report')}</h1>
        </Col>
      </Row>
      <Row justify={'space-around'}>
        <Col xl={23} xxl={23} xs={23} sm={23} md={23}>
          <br />
          <AntTable
            refetch={refetch}
            isError={isError}
            columns={columnsVoucherReport(t)}
            numberOfSkeletons={12}
            isLoading={isLoading || isFetching}
            data={data?.data?.Data?.Result || []}
            searchCriteriaForm={<SearchCriteriaVoucherReport />}
            scroll={{ x: '', y: convertVhToPixels('62vh') }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default VoucherReport;
