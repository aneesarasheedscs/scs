import { AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { Card, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useGetCustomerDetailPolicyDiscountTable } from '../../../queries';
import { column2 } from './columns';

function AllocateDiscountTable({ setSelectedRecordId2 }: TAddUpdateRecord) {
  const { t } = useTranslation();
  const { data, isError, isLoading, refetch } = useGetCustomerDetailPolicyDiscountTable();
  return (
    <>
      <Col span={24} style={{ marginTop: '1.5%' }}>
        <AntTable
          refetch={refetch}
          isError={isError}
          numberOfSkeletons={12}
          isLoading={isLoading}
          scroll={{ x: '', y: convertVhToPixels('18vh') }}
          data={data?.data?.Data?.Result || []}
          columns={column2(t, setSelectedRecordId2)}
        />
      </Col>
    </>
  );
}

type TAddUpdateRecord = {
  selectedRecordId2?: number | null;
  setSelectedRecordId2?: (selectedRecordId2: number | null) => void;
};
export default AllocateDiscountTable;
