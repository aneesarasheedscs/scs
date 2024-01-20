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
  const { data, isError, isLoading, isFetched } = useGetOpenBalanceHistory();

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
      <Row>
        <Col xs={{ span: 23 }} lg={{ span: 23 }} style={{ marginTop: '10px' }}>
          <AntTable
            columns={OpeningBalanceColumns(t, handleEditButtonClick)}
            data={data?.data?.Data?.Result || []}
            scroll={{ x: '', y: convertVhToPixels('55vh') }}
            isError={isError}
            isLoading={isLoading}
          />
        </Col>

        {/* <Col xs={24} lg={12} style={{ marginTop: '10px' }}>
          <AntTable
            columns={OpeningBalanceColumns(t, handleEditButtonClick)} // Define columns for the other table
            data={selectedRows || []}
            isError={isError}
            isLoading={isLoading}
          />
        </Col> */}
      </Row>
    </div>
  );
};

export default OpeningBalanceTable;
