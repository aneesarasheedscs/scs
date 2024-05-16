import './Card.scss';
import './DetailTableFile.scss';
import { useState } from 'react';
import CardView from './CardView';
import { Col, Row } from 'antd';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import ReceiptsDetailTables from './DetailTable';
import { AntButton, AntTable, AntTablecopy } from '@tradePro/components';
import { useGetBankReceiptVoucherTable } from '../queries/queries';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import SearchCriteria from './SearchCriteriaForm';

function ReceiptsTables({
  setSelectedRecordId,
  setActiveTab,
  setSelectedRecordDetailId,
  refetch,
  isLoading,
}: TRVHistory) {
  const { t } = useTranslation();
  const { data, isError, isLoading: isLoadingBRV, refetch: refetchBRV, isFetching } = useGetBankReceiptVoucherTable();
  const [showComponent, setShowComponent] = useState<boolean>(false);
  const toggleCardView = () => {
    setShowComponent(true);
  };
  const toggleGridView = () => {
    setShowComponent(false);
  };
  const [pageSize, setPageSize] = useState<number | undefined>(10);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const mainData = data?.data?.Data?.Result || [];
  function CriteriaString() {
    return (
      <Row style={{ border: '1px solid #25A7DF', padding: 5, borderRadius: 5 }}>
        <h5> {data?.data?.Data?.Result?.[0]?.ReportCriteria}</h5>
      </Row>
    );
  }
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
            {/* <AntTable
              refetch={refetchBRV}
              isError={isError}
              numberOfSkeletons={8}
              isLoading={isLoadingBRV || isFetching}
              scroll={{ x: '', y: convertVhToPixels('35vh') }}
              data={data?.data?.Data?.Result || []}
              columns={columns(t, setSelectedRecordId, setActiveTab, setSelectedRecordDetailId)}
            /> */}
            <AntTablecopy
              paginate
              tableId="pagination-example-id" // id must be unique
              pageSize={pageSize}
              currentPage={currentPage}
              totalItems={mainData[0]?.row_count}
              onChange={(pagination) => {
                setPageSize(pagination?.pageSize);
                setCurrentPage(pagination?.current);
              }}
              refetch={refetchBRV}
              isError={isError}
              numberOfSkeletons={8}
              isLoading={isLoadingBRV || isFetching}
              scroll={{ x: '', y: convertVhToPixels('35vh') }}
              data={data?.data?.Data?.Result || []}
              columns={columns(t, setSelectedRecordId, setActiveTab, setSelectedRecordDetailId)}
              searchCriteriaForm={<SearchCriteria />}
              reportCriteriaString={data?.data?.Data?.Result?.[0]?.ReportCriteria ? <CriteriaString /> : ''}
              // printSlip={{ data: reportData?.data, enabled: true, onClick: () => mutate(), isSuccess, isPending }}
            />
            <ReceiptsDetailTables refetch={refetch} isLoading={isLoading} />
          </Col>
        )}
      </Row>
    </>
  );
}

type TRVHistory = {
  setSelectedRecordId: (id: number | null) => void;
  setActiveTab: (tab: string) => void;
  setSelectedRecordDetailId: (id: number | null) => void;
  refetch: () => void;
  isLoading: boolean;
};

export default ReceiptsTables;
