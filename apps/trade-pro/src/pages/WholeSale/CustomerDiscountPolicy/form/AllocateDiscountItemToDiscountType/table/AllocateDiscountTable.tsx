import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useGetCustomerDetailPolicyDiscountTable } from '../../../queries';
import { column2 } from './columns';

function AllocateDiscountTable({ setSelectedRecordId2 }: TAddUpdateRecord) {
  const { t } = useTranslation();
  const { data, isError, isLoading } = useGetCustomerDetailPolicyDiscountTable();
  return (
    <>
      <Card style={{ border: 'none' }}>
        <Col span={24}>
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
                isError={isError}
                numberOfSkeletons={12}
                isLoading={isLoading}
                scroll={{ x: '', y: convertVhToPixels('18vh') }}
                data={data?.data?.Data?.Result || []}
                columns={column2(t, setSelectedRecordId2)}
              />
            </Card>
          </Col>
        </Col>
      </Card>
    </>
  );
}

type TAddUpdateRecord = {
  selectedRecordId2?: number | null;
  setSelectedRecordId2?: (selectedRecordId2: number | null) => void;
};
export default AllocateDiscountTable;
