import './Card.scss';
import './DetailTableFile.scss';
import { useState } from 'react';
import CardView from './CardView';
import { Col, Row, theme } from 'antd';
import { columns } from './columns';
import { AntButton, AntTable, AntTablecopy } from '@tradePro/components';
import { useTranslation } from 'react-i18next';
import { useGetJournalVocherHistory } from '../../quries';
import JournalVoucherDetailTable from '../JournalVoucherDetail';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import SearchCriteria from './SearchCriteriaForm';
import VouchersStatus from './voucherStatus';

function JournalVoucherTable({
  setSelectedRecordId,
  setActiveTab,
  setSelectedRecordDetailId,
  refetch,
  isLoading,
}: TJVHistory) {
  const { t } = useTranslation();
  const { data, isError, isLoading: isLoadingJV, refetch: refetchJV, isFetching } = useGetJournalVocherHistory();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [showComponent, setShowComponent] = useState(false);

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
  const totalUnApprovedVouchers = data?.data?.Data?.Result?.[0]?.TotalUnApprovedVoucher;
  const totalApprovedVouchers = data?.data?.Data?.Result?.[0]?.TotalApprovedVoucher;
  const totalVouchers = data?.data?.Data?.Result?.[0]?.TotalVouchers;
  return (
    <>
      <Row gutter={0} style={{ width: '94%' }}>
        <Col span={24} style={{ marginLeft: '0%', borderTop: '1px solid #dfdfdf', background: '#fff' }}>
          <Row style={{}}>
            <Col xxl={4} xl={5}>
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
            <Col xxl={20} xl={19} lg={24} md={24} sm={24} xs={24}>
              <VouchersStatus
                totalUnApprovedVouchers={totalUnApprovedVouchers}
                totalApprovedVouchers={totalApprovedVouchers}
                totalVouchers={totalVouchers}
              />
            </Col>
          </Row>
        </Col>
        {showComponent ? (
          <>
            <CardView setSelectedRecordId={setSelectedRecordId} setActiveTab={setActiveTab} />{' '}
          </>
        ) : (
          <Col span={24}>
            <>
              <>
                {/* <AntTable
                  refetch={refetchJV}
                  isError={isError}
                  numberOfSkeletons={10}
                  isLoading={isLoadingJV || isFetching}
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
                  refetch={refetchJV}
                  isError={isError}
                  numberOfSkeletons={8}
                  isLoading={isLoadingJV || isFetching}
                  scroll={{ x: '', y: convertVhToPixels('35vh') }}
                  data={data?.data?.Data?.Result || []}
                  columns={columns(t, setSelectedRecordId, setActiveTab, setSelectedRecordDetailId)}
                  searchCriteriaForm={<SearchCriteria />}
                  reportCriteriaString={data?.data?.Data?.Result?.[0]?.ReportCriteria ? <CriteriaString /> : ''}
                  // printSlip={{ data: reportData?.data, enabled: true, onClick: () => mutate(), isSuccess, isPending }}
                />
                <JournalVoucherDetailTable refetch={refetch} isLoading={isLoading} />
              </>
            </>
          </Col>
        )}
      </Row>
    </>
  );
}

type TJVHistory = {
  setSelectedRecordId: (id: number | null) => void;
  setActiveTab: (tab: string) => void;
  setSelectedRecordDetailId: (id: number | null) => void;
  refetch: () => void;
  isLoading: boolean;
};

export default JournalVoucherTable;
