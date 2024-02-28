import './Card.scss';
import './DetailTableFile.scss';
import { columns } from './columns';
import { useState } from 'react';
import CardView from './CardView';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import ExpenseVoucherDetailTable from './DetailTable';
import { AntButton, AntTable } from '@tradePro/components';
import { useGetExpenseVoucherTable } from '../queries/queries';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

function ExpenseVoucherTable({
  setSelectedRecordId,
  setActiveTab,
  setSelectedRecordDetailId,
  refetch,
  isLoading,
}: TEVHistory) {
  const { t } = useTranslation();
  const {
    data,
    isError,
    isLoading: isLoadingExpense,
    refetch: refetchExpense,
    isFetching,
  } = useGetExpenseVoucherTable();
  const [showComponent, setShowComponent] = useState<boolean>(false);

  const toggleCardView = () => {
    setShowComponent(true);
  };
  const toggleGridView = () => {
    setShowComponent(false);
  };

  return (
    <>
      <Row gutter={10}>
        <Col span={24} style={{ marginLeft: '0.5%', borderTop: '1px solid #dfdfdf' }}>
          <AntButton
            onClick={toggleGridView}
            className={showComponent ? 'toggleGridView' : 'toggleCardView'}
            label={t('grid_view')}
          />
          <AntButton
            onClick={toggleCardView}
            className={showComponent ? 'toggleCardView' : 'toggleGridView'}
            label={t('card_view')}
          />
        </Col>

        {showComponent ? (
          <CardView setSelectedRecordId={setSelectedRecordId} setActiveTab={setActiveTab} />
        ) : (
          <Col span={24}>
            <>
              <AntTable
                refetch={refetchExpense}
                isError={isError}
                numberOfSkeletons={8}
                isLoading={isLoadingExpense || isFetching}
                scroll={{ x: '', y: convertVhToPixels('35vh') }}
                data={data?.data?.Data?.Result}
                columns={columns(t, setSelectedRecordId, setActiveTab, setSelectedRecordDetailId)}
              />
              <ExpenseVoucherDetailTable refetch={refetch} isLoading={isLoading} />
            </>
          </Col>
        )}
      </Row>
    </>
  );
}

type TEVHistory = {
  setSelectedRecordId: (Id: number | null) => void;
  setActiveTab: (tab: string) => void;
  setSelectedRecordDetailId: (Id: number | null) => void;
  refetch: () => void;
  isLoading: boolean;
};

export default ExpenseVoucherTable;
