import { Col, Row, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import SearchCriteriaForm from './SearchCriteriaForm';
import { columns } from './columns';
import { useGetAccountReceivablesTable } from '../queries';

function AccountReceivablesTable() {
  const { t } = useTranslation();

  const { data, isError, isLoading } = useGetAccountReceivablesTable();

  const formHeading = {
    fontFamily: 'Times New Roman',
    // borderRadius: '5px',
    padding: '5px',
    // boxShadow: '2px 4px 12px 1px lightgray',
    marginBottom: '7px',
    fontSize: '1.8rem',
  };

  return (
    <>
      <h2 style={formHeading}>{t('account_receivables_by_due_date')}</h2>
      <Row justify={'space-around'}>
        <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 23 }} lg={{ span: 23 }} xl={{ span: 23 }}>
          <AntTable
            rowKey="Id"
            isError={isError}
            numberOfSkeletons={8}
            isLoading={isLoading}
            scroll={{ x: '', y: convertVhToPixels('60vh') }}
            data={data?.data?.Data?.Result || []}
            searchCriteriaForm={<SearchCriteriaForm />}
            columns={columns(t)}
          />
        </Col>
      </Row>
    </>
  );
}

export default AccountReceivablesTable;

