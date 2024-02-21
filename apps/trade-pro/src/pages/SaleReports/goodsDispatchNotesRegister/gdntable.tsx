import { columns } from './columns';
import { AntTable, BackButton } from '@tradePro/components';
import { useGetGdnRegister } from './queries';
import SearchCriteria from './SearchCriteria';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import './style.scss';
import { t } from 'i18next';
import { Col, Row } from 'antd';

function GdnRegisterTable() {
  const { data, refetch, isError, isLoading, isFetching } = useGetGdnRegister();

  return (
    <div style={{ background: '#fff' }}>
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={15} sm={10} md={12} lg={12} xl={20} xxl={16} className="">
          <h1 className="report_heading">{t('good_dispatch_notes')}</h1>
        </Col>
        <Col xs={3} sm={2} xxl={1} md={2} lg={2} xl={2} style={{ marginRight: '50px' }}>
          <BackButton goToDashboard={false} />
        </Col>
      </Row>
      <Row justify={'space-around'}>
        <Col xxl={23} xs={23} xl={23} lg={23} sm={23} md={23}>
          <AntTable
            rowKey="Id"
            refetch={refetch}
            isError={isError}
            columns={columns(t)}
            numberOfSkeletons={12}
            isLoading={isLoading || isFetching}
            data={data?.data?.Data?.Result || []}
            searchCriteriaForm={<SearchCriteria />}
            scroll={{ x: '', y: convertVhToPixels('60vh') }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default GdnRegisterTable;
