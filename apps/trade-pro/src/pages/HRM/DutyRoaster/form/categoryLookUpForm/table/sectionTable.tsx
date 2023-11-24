import { AntButton, AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { columns } from './columns';

function CategoryTable() {
  const { t } = useTranslation();
  return (
    <>
      <Card style={{ border: 'none' }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Col span={24}>
            <h2 style={{ boxShadow: '2px 2px 12px 1px #5a54f9' }} className="form-heading">
              {t('history')}
            </h2>
          </Col>
          <br />

          <Col span={24}>
            <Card style={{ border: 'none', boxShadow: '2px 2px 12px 1px #5a54f9', textAlign: 'left' }}>
              {' '}
              <AntTable
                // isError={isError}
                numberOfSkeletons={12}
                // isLoading={isLoading}
                scroll={{ x: '', y: convertVhToPixels('18vh') }}
                // style={{ width: 'auto', padding: '2%' }}
                // data={data?.data?.Data?.Result || []}
                columns={columns(t)}
              />
            </Card>
          </Col>
        </Col>
      </Card>
    </>
  );
}

export default CategoryTable;
