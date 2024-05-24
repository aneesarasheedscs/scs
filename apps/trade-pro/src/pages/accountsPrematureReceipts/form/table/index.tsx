import { AntButton, AntTablecopy } from '@tradePro/components';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { columns } from './columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetAccountsPrematureReceiptHistory, useGetReadByTrackingNo } from '../../queries';

function AccountsPrematureTable() {
  const { data, refetch, isError, isFetching, isLoading } = useGetAccountsPrematureReceiptHistory();
  const { data: getById } = useGetReadByTrackingNo();
  const mainData = data?.data?.Data?.Result || [];
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
        <Col span={24}>
          <>
            <AntTablecopy
              // paginate
              tableId="pagination-example-id" // id must be unique
              // pageSize={pageSize}
              // currentPage={currentPage}
              totalItems={mainData[0]?.row_count}
              // onChange={(pagination) => {
              //   setPageSize(pagination?.pageSize);
              //   setCurrentPage(pagination?.current);
              // }}
              refetch={refetch}
              isError={isError}
              numberOfSkeletons={8}
              isLoading={isLoading || isFetching}
              scroll={{ x: '', y: convertVhToPixels('50vh') }}
              data={data?.data?.Data?.Result || []}
              // columns={columns(t, setSelectedRecordId, setActiveTab, setSelectedRecordDetailId)}
              columns={columns(t)}
              // searchCriteriaForm={<SearchCriteria />}
              // reportCriteriaString={data?.data?.Data?.Result?.[0]?.ReportCriteria ? <CriteriaString /> : ''}
              // printSlip={{ data: reportData?.data, enabled: true, onClick: () => mutate(), isSuccess, isPending }}
            />
          </>
        </Col>
      </Row>
    </>
  );
}

export default AccountsPrematureTable;
