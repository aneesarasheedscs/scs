import React, { useEffect, useState } from 'react';
import { AntTable } from '@scs/ui';
import { Col, Row, Tooltip, message, theme } from 'antd';
import { ItemsAllocationColumns, PendingItemsForAllocationColumns } from './Columns';
import { useTranslation } from 'react-i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { useAddAllocationItems, useGetDeAllocationItems } from '../quries';
import { map } from 'lodash';
import { useAtom } from 'jotai';
import { selectedRowsAtom, selectedRowsforAllocated } from './Atom';
import { ItemAllocationTypes } from '../types';

const { useToken } = theme;

const ItemAllocationTable = ({
  CompanyId,
  allocatedData,
  tableLoading,
  isError,
  isFetching,
  refetch,
  unallocatedData,
  unallocatedrefetch,
  isErrorunallocated,
  tableLoadingunallocated,
  isFetchingunallocated,
}: any) => {
  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);
  const [selectRowforAllocated, setSelectRowforAllocated] = useAtom(selectedRowsforAllocated);
  const { mutate: addData } = useAddAllocationItems(true, CompanyId);
  const ItemId = selectRowforAllocated?.[0]?.ItemId;
  const { refetch: getItemdeAllocated } = useGetDeAllocationItems(true, ItemId);
  const [data, setData] = useState<any>(true);
  const [tableData, setTableData] = useState<ItemAllocationTypes[]>([]);

  const { t } = useTranslation();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const openAllocatePopup = () => {
    if (selectedRows?.length > 0) {
      const combinedData = selectedRows.map((item) => ({
        ...item,
        IsActive: true,
        GLPageNo: '',
      }));

      addData(combinedData);
    } else {
      message.error('Please select row to allocate item.');
    }
    handleDeleteRow(selectedRows);
  };

  // selectRowforAllocated?.[0]?.ItemId;

  const openUnAllocatePopup = () => {
    getItemdeAllocated();
    if (selectRowforAllocated?.length > 0) {
      const combinedData = selectRowforAllocated.map((item) => ({
        ...item,
        IsActive: true,
        GLPageNo: '',
      }));
      // AddData?.data?.Data?.Result?.(combinedData);
    } else {
      message.error('Please select row to Unallocate item.');
    }
    handleDeleteRowUn(selectRowforAllocated);
    getItemdeAllocated();
  };

  const handleSelectAllUn = () => {
    if (allocatedData?.data?.Data?.Result?.length === selectedRows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(map(allocatedData?.data?.Data?.Result, 'Id'));
    }
  };

  const handleSelectAll = () => {
    if (unallocatedData?.data?.Data?.Result?.length === selectedRows.length) {
      setSelectRowforAllocated([]);
    } else {
      setSelectRowforAllocated(map(unallocatedData?.data?.Data?.Result, 'Id'));
    }
  };

  const handleDeleteRowUn = (selectedRowsToDelete: ItemAllocationTypes[]) => {
    const updatedData = unallocatedData?.data?.Data?.Result?.filter((row: ItemAllocationTypes) => {
      return !selectedRowsToDelete.some((selectedRow) => selectedRow.Id === row.Id);
    });

    setData(false);
    setTableData(updatedData);
    console.log('Updated Data', updatedData);
  };

  const handleRowSelection = (row: ItemAllocationTypes) => {
    setSelectedRows((prevSelectedRows: ItemAllocationTypes[]) => [...prevSelectedRows, row]);

    // checked={selectedRows.includes(record.Id) ? true : false
  };
  const handleRowSelectionforAllocated = (row: ItemAllocationTypes) => {
    setSelectRowforAllocated((prevSelectedRows: ItemAllocationTypes[]) => [...prevSelectedRows, row]);
    // checked={selectedRows.includes(record.Id) ? true : false
  };

  const handleDeleteRow = (selectedRowsToDelete: ItemAllocationTypes[]) => {
    const updatedData = allocatedData?.data?.Data?.Result?.filter((row: ItemAllocationTypes) => {
      return !selectedRowsToDelete.some((selectedRow) => selectedRow.Id === row.Id);
    });
    setData(false);
    setTableData(updatedData);
    console.log('Updated Data', updatedData);
  };

  // console.log(tableData);

  useEffect(() => {
    console.log('Selected Rows multiple:', selectedRows);
    console.log('Selected Rows multiple for Allocated:', selectRowforAllocated);
  }, [selectedRows, selectRowforAllocated]);

  return (
    <div>
      <Row>
        <Col xs={22} sm={20} lg={15} xl={8} style={{ marginTop: '10px', marginLeft: '3%' }}>
          <h2
            className="tableHead"
            style={{
              backgroundColor: colorPrimary,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <p style={{ marginLeft: '33%' }}> {t('un_allocated_items')}</p>
            <p>
              <Tooltip title="To Allocate Items">
                <CheckCircleFilled style={{ fontSize: '25px' }} onClick={openAllocatePopup} />
              </Tooltip>
            </p>
          </h2>
          <AntTable
            refetch={refetch}
            columns={PendingItemsForAllocationColumns(
              t,
              setSelectedRows,
              handleRowSelection,
              handleSelectAllUn,
              allocatedData,
              selectedRows
            )}
            data={data ? allocatedData?.data?.Data?.Result : tableData || []}
            isLoading={tableLoading || isFetching}
            isError={isError}
            scroll={{ x: '', y: convertVhToPixels('55vh') }}
            numberOfSkeletons={12}
            rowKey="Id"
          />
        </Col>

        <Col xs={22} sm={20} lg={15} xl={8} style={{ marginTop: '10px', marginLeft: '15px' }}>
          <h2
            className="tableHead"
            style={{
              width: '100%',
              backgroundColor: colorPrimary,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <p style={{ marginLeft: '30%' }}> {t('allocated_items')}</p>
            <p>
              <Tooltip title="Un-Allocate Items">
                <CloseCircleFilled style={{ fontSize: '25px' }} onClick={openUnAllocatePopup} />
              </Tooltip>
            </p>
          </h2>
          <AntTable
            columns={ItemsAllocationColumns(
              t,
              setSelectRowforAllocated,
              handleRowSelectionforAllocated,
              handleSelectAll,
              handleDeleteRowUn,
              selectedRows
            )}
            data={unallocatedData?.data?.Data?.Result || []}
            isError={isErrorunallocated}
            isLoading={tableLoadingunallocated || isFetchingunallocated}
            refetch={unallocatedrefetch}
            numberOfSkeletons={12}
            scroll={{ x: '', y: convertVhToPixels('55vh') }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ItemAllocationTable;
