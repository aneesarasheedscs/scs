import './Card.scss';
import './DetailTableFile.scss';
import CardView from './CardView';
import { useState } from 'react';
import { Col, Row, theme } from 'antd';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import CashReceiptDetailTable from './DetailTable';
import { AntButton, AntTable, AntTablecopy } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetCashReceiptVoucherTable } from '../queries/queries';
import SearchCriteria from './SearchCriteriaForm';
import VouchersStatus from './voucherStatus';

function CashReceiptTable({
  setSelectedRecordId,
  setActiveTab,
  setSelectedRecordIdforDetail,
  refetch,
  isLoading,
}: TCRVHistory) {
  const { t } = useTranslation();
  const { data, isError, isLoading: isLoadingCRV, refetch: refetchCRV, isFetching } = useGetCashReceiptVoucherTable();
  const [showComponent, setShowComponent] = useState(false);
  const {
    token: { colorPrimary },
  } = theme.useToken();

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
      <Row gutter={0}>
        <Col span={24} style={{ borderTop: '1px solid #dfdfdf', background: '#fff' }}>
          <Row>
            <Col xxl={3} xl={5}>
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
            <Col xxl={21} xl={19} lg={24} md={24} sm={24} xs={24}>
              <VouchersStatus
                totalUnApprovedVouchers={totalUnApprovedVouchers}
                totalApprovedVouchers={totalApprovedVouchers}
                totalVouchers={totalVouchers}
              />
            </Col>
          </Row>
        </Col>
        {showComponent ? (
          <CardView setSelectedRecordId={setSelectedRecordId} setActiveTab={setActiveTab} />
        ) : (
          <Col>
            <>
              {/* <AntTable
                refetch={refetchCRV}
                isError={isError}
                numberOfSkeletons={8}
                isLoading={isLoadingCRV || isFetching}
                scroll={{ x: '', y: convertVhToPixels('35vh') }}
                data={data?.data?.Data?.Result || []}
                columns={columns(t, setSelectedRecordId, setActiveTab, setSelectedRecordIdforDetail)}
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
                refetch={refetchCRV}
                isError={isError}
                numberOfSkeletons={8}
                isLoading={isLoadingCRV || isFetching}
                scroll={{ x: '', y: convertVhToPixels('35vh') }}
                data={data?.data?.Data?.Result || []}
                columns={columns(t, setSelectedRecordId, setActiveTab, setSelectedRecordIdforDetail)}
                searchCriteriaForm={<SearchCriteria />}
                reportCriteriaString={data?.data?.Data?.Result?.[0]?.ReportCriteria ? <CriteriaString /> : ''}
                // printSlip={{ data: reportData?.data, enabled: true, onClick: () => mutate(), isSuccess, isPending }}
              />
              <CashReceiptDetailTable refetch={refetch} isLoading={isLoading} />
            </>
          </Col>
        )}
      </Row>
    </>
  );
}

type TCRVHistory = {
  setSelectedRecordId: (id: number | null) => void;
  setActiveTab: (tab: string) => void;
  setSelectedRecordIdforDetail: (id: number | null) => void;
  refetch: () => void;
  isLoading: boolean;
};

export default CashReceiptTable;
