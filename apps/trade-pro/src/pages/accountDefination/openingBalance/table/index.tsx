import { AntTable } from '@scs/ui';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { OpeningBalanceColumns } from './Columns';
import { useTranslation } from 'react-i18next';
import { useGetOpenBalanceHistory } from '../quries';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useAtom } from 'jotai';
import { selectedRowsAtom } from './Atom';

const OpeningBalanceTable = () => {
  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);
  const { t } = useTranslation();
  const { data, isError, isLoading, refetch } = useGetOpenBalanceHistory();

  const handleEditButtonClick = (record: any) => {
    // const selectedRow = data?.data?.Data?.Result.find((row: any) => row.Id === recordId);
    setSelectedRows([record]);
    // if (selectedRow) {
    //   setSelectedRows([...selectedRows, selectedRow]);
    // } else {
    //   console.log('Row not found for ID:', recordId);
    // }
  };

  return (
    <div>
      <Row justify={'space-around'}>
        <Col xxl={23} xl={23} xs={23} lg={23} sm={23} md={23} style={{ marginTop: '10px' }}>
          <AntTable
            columns={OpeningBalanceColumns(t, handleEditButtonClick)}
            data={data?.data?.Data?.Result || []}
            scroll={{ x: '', y: convertVhToPixels('55vh') }}
            isError={isError}
            isLoading={isLoading}
            refetch={refetch}
            numberOfSkeletons={12}
          />
        </Col>
      </Row>
    </div>
  );
};

export default OpeningBalanceTable;
