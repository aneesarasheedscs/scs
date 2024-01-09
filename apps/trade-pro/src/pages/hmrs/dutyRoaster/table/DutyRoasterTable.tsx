import { AntButton, AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { columns, dateColumns, employeeDaysColumns } from './columns';

function DutyRoasterHistory({ setSelectedRecordId, setActiveTab }: TFrom) {
  const { t } = useTranslation();
  return (
    <>
      <Card>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Col span={24}>
            <h2 style={{ boxShadow: '2px 2px 12px 1px #5a54f9' }} className="form-heading">
              {t('employee_days')}
            </h2>
          </Col>

          <Col span={2} style={{ marginTop: '1%', marginBottom: '0.5%' }}>
            <AntButton label={t('apply_all')} />
          </Col>
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
                columns={employeeDaysColumns(t, setSelectedRecordId, setActiveTab)}
              />
            </Card>
          </Col>
          <br />
          <Col span={24}>
            <Card style={{ border: 'none', boxShadow: '2px 2px 12px 1px #5a54f9', textAlign: 'left' }}>
              {' '}
              <AntTable
                // isError={isError}
                numberOfSkeletons={12}
                // isLoading={isLoading}
                scroll={{ x: '', y: convertVhToPixels('25vh') }}
                // style={{ width: 'auto', padding: '2%' }}
                // data={data?.data?.Data?.Result || []}
                columns={dateColumns(t, setSelectedRecordId, setActiveTab)}
              />
            </Card>
          </Col>
        </Col>
      </Card>
    </>
  );
}

type TFrom = {
  setSelectedRecordId: (Id: string | null) => void;
  setActiveTab: (tab: string) => void;
};

export default DutyRoasterHistory;
