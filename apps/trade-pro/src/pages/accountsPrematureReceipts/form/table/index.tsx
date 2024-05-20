import { AntButton, AntTablecopy } from '@tradePro/components';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { columns } from './columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetAccountsPrematureReceiptHistory } from '../../queries';

function AccountsPrematureTable() {
  const { data } = useGetAccountsPrematureReceiptHistory();
  const [showComponent, setShowComponent] = useState(false);
  // const toggleCardView = () => {
  //   setShowComponent(true);
  // };
  // const toggleGridView = () => {
  //   setShowComponent(false);
  // };
  const { t } = useTranslation();
  return (
    <>
      <Row gutter={0} style={{ marginTop: 5 }}>
        <Col span={24}>
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
        </Col>
      </Row>
    </>
  );
}

export default AccountsPrematureTable;
