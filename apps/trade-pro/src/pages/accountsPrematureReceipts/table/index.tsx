import { AntButton, AntTablecopy } from '@tradePro/components';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { columns } from './columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetAccountsPrematureReceiptHistory } from '../queries';

function AccountsPrematureHistory() {
  const { data } = useGetAccountsPrematureReceiptHistory();
  const [showComponent, setShowComponent] = useState(false);
  const toggleCardView = () => {
    setShowComponent(true);
  };
  const toggleGridView = () => {
    setShowComponent(false);
  };
  const { t } = useTranslation();
  return (
    <>
      <Row gutter={0}>
        <Col span={24} style={{ borderTop: '1px solid #dfdfdf', background: '#fff' }}>
          <Row>
            <Col xxl={3} xl={5} style={{}}>
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
              {/* <VouchersStatus
                totalUnApprovedVouchers={totalUnApprovedVouchers}
                totalApprovedVouchers={totalApprovedVouchers}
                totalVouchers={totalVouchers}
              /> */}
            </Col>
          </Row>
        </Col>
        {showComponent ? (
          <>{/* <CardView setSelectedRecordId={setSelectedRecordId} setActiveTab={setActiveTab} /> */}</>
        ) : (
          <Col span={24}>
            <>
              <AntTablecopy
                // paginate
                // tableId="pagination-example-id" // id must be unique
                // pageSize={pageSize}
                // currentPage={currentPage}
                // totalItems={mainData[0]?.row_count}
                // onChange={(pagination) => {
                //   setPageSize(pagination?.pageSize);
                //   setCurrentPage(pagination?.current);
                // }}
                // refetch={refetchBPV}
                // isError={isError}
                // numberOfSkeletons={8}
                // isLoading={isLoadingBPV || isFetching}
                scroll={{ x: '', y: convertVhToPixels('40vh') }}
                // data={data?.data?.Data?.Result || []}
                // columns={columns(t, setSelectedRecordId, setActiveTab, setSelectedRecordDetailId)}
                columns={columns(t)}
                // searchCriteriaForm={<SearchCriteria />}
                // reportCriteriaString={data?.data?.Data?.Result?.[0]?.ReportCriteria ? <CriteriaString /> : ''}
                // printSlip={{ data: reportData?.data, enabled: true, onClick: () => mutate(), isSuccess, isPending }}
              />

              {/* <BankPaymentDetailTable refetch={refetch} isLoading={isLoading} /> */}
            </>
          </Col>
        )}
      </Row>
    </>
  );
}

export default AccountsPrematureHistory;
