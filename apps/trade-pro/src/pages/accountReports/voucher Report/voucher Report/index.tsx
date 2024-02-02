import { AntTable, BackButton } from '@scs/ui';
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
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={10} sm={10} md={12} lg={12} xl={14} xxl={16} className="">
          <h1 className="report_heading">{t('voucher_report')}</h1>
        </Col>
        <Col xxl={1} style={{ marginRight: '50px' }}>
          <BackButton />
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
            searchCriteriaForm={<SearchCriteriaVoucherReport data={data} />}
            scroll={{ x: '', y: convertVhToPixels('55vh') }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default VoucherReport;
