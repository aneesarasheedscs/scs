import React, { useEffect, useState } from 'react';
import { AntTable } from '@scs/ui';
import { Col, Row, Tooltip, notification, theme } from 'antd';
import { ItemsAllocationColumns, PendingItemsForAllocationColumns } from './Columns';
import { useTranslation } from 'react-i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { useAddAllocationItems, useGetDeAllocationAccounts } from '../quries';
import { useAtom } from 'jotai';
import { selectedRowsAtom, selectedRowsforAllocated } from './Atom';
import { ItemAllocationTypes } from '../types';

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
  const ItemId = selectRowforAllocated?.[0]?.Id;
  const { refetch: getItemdeAllocated } = useGetDeAllocationAccounts(false, ItemId);
  const [data, setData] = useState<any>(true);
  const [tableData, setTableData] = useState<ItemAllocationTypes[]>([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [selectedRowKeysForUnAllocate, setSelectedRowKeysForUnAllocate] = useState<number[]>([]);
  const [selectedAllRows, setSelectedAllRows] = useState(false);
  console.log(selectRowforAllocated);
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
      const msg = 'Please Select Account to Allocate!';
      notification.error({ description: '', message: msg });
    }
  };

  const openUnAllocatePopup = () => {
    // getItemdeAllocated();
    if (selectRowforAllocated?.length > 0) {
      const combinedData = selectRowforAllocated.map((item) => ({
        ...item,
        IsActive: true,
        GLPageNo: '',
      }));
      getItemdeAllocated();
    } else {
      const msg = 'Please select Account to Unallocate item!';
      notification.error({ description: '', message: msg });
    }
  };

  const handleCheckboxChange = (record: any, checked: boolean) => {
    console.log(checked);
    if (checked) {
      refetch();

      console.log(`selectedRowKeys: ${record.Id}`, 'selectedRows: ', record);
      setSelectedRows((prevSelectedKeys) => [...prevSelectedKeys, record]);
      setSelectedRowKeys((prevSelectedKeys) => [...prevSelectedKeys, record.Id]);
    } else {
      refetch();
      setSelectedRowKeys((prevSelectedKeys) => prevSelectedKeys.filter((key) => key !== record.Id));
      setSelectedRows((prevSelectedKeys) => prevSelectedKeys.filter((row) => row !== record));
    }
  };

  const handleSelectAllRecords = (checked?: boolean) => {
    if (checked) {
      // refetch();
      setSelectedAllRows(true);
      const allRowKeys = allocatedData?.data?.Data?.Result.map((record: any) => record.Id);
      setSelectedRowKeys((prevSelectedKeys) => [...new Set([...prevSelectedKeys, ...allRowKeys])]);
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, ...allocatedData]);
    } else {
      setSelectedAllRows(false);
      setSelectedRowKeys([]);
      setSelectedRows([]);
    }
  };
  console.log(selectedRows);
  const handleSelectAllRecordsForAllocation = (checked?: boolean) => {
    if (checked) {
      // unallocatedrefetch();
      setSelectedAllRows(true);
      const allRowKeys = unallocatedData?.data?.Data?.Result.map((record: any) => record.Id);
      setSelectedRowKeysForUnAllocate((prevSelectedKeys) => [...new Set([...prevSelectedKeys, ...allRowKeys])]);
      setSelectRowforAllocated((prevSelectedRows) => [...prevSelectedRows, ...unallocatedData]);
    } else {
      setSelectedAllRows(false);
      setSelectedRowKeysForUnAllocate([]);
      setSelectRowforAllocated([]);
    }
  };

  const handleCheckboxChangeForAllocation = (record: any, checked: boolean) => {
    console.log(checked);
    if (checked) {
      unallocatedrefetch();

      console.log(`selectedRowKeyforallocate: ${record.Id}`, 'selectedRowsforAllocate: ', record);
      setSelectRowforAllocated((prevSelectedKeys) => [...prevSelectedKeys, record]);
      setSelectedRowKeysForUnAllocate((prevSelectedKeys) => [...prevSelectedKeys, record.Id]);
    } else {
      unallocatedrefetch();
      setSelectedRowKeysForUnAllocate((prevSelectedKeys) => prevSelectedKeys.filter((key) => key !== record.Id));
      setSelectRowforAllocated((prevSelectedKeys) => prevSelectedKeys.filter((row) => row !== record));
    }
  };

  useEffect(() => {
    if (selectedAllRows) {
      const allRowKeys = allocatedData?.data?.Data?.Result.map((record: any) => record.Id);
      setSelectedRowKeys((prevSelectedKeys) => [...new Set([...prevSelectedKeys, ...allRowKeys])]);
      setSelectedRows(allocatedData?.data?.Data?.Result);
    } else {
      setSelectedRows([]);
      setSelectedRowKeys([]);
    }

    if (selectedAllRows) {
      const allRowKeys = unallocatedData?.data?.Data?.Result.map((record: any) => record.Id);
      setSelectedRowKeysForUnAllocate((prevSelectedKeys) => [...new Set([...prevSelectedKeys, ...allRowKeys])]);
      setSelectRowforAllocated(unallocatedData?.data?.Data?.Result);
    } else {
      setSelectRowforAllocated([]);
      setSelectedRowKeysForUnAllocate([]);
    }
  }, [selectedAllRows]);

  return (
    <div style={{ marginLeft: 30 }}>
      <Row>
        <Col xs={22} sm={20} lg={15} xl={11} xxl={8} style={{ marginTop: '10px' }}>
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
            rowKey={'Id'}
            columns={PendingItemsForAllocationColumns(t, handleCheckboxChange, selectedRowKeys, handleSelectAllRecords)}
            data={data ? allocatedData?.data?.Data?.Result : tableData || []}
            isLoading={tableLoading || isFetching}
            isError={isError}
            scroll={{ x: '', y: convertVhToPixels('47vh') }}
            numberOfSkeletons={12}
          />
        </Col>

        <Col xs={22} sm={20} lg={15} xl={11} xxl={8} style={{ marginTop: '10px', marginLeft: '15px' }}>
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
              selectedRowKeysForUnAllocate,
              handleSelectAllRecordsForAllocation,
              handleCheckboxChangeForAllocation
            )}
            data={unallocatedData?.data?.Data?.Result || []}
            isError={isErrorunallocated}
            isLoading={tableLoadingunallocated || isFetchingunallocated}
            refetch={unallocatedrefetch}
            numberOfSkeletons={12}
            scroll={{ x: '', y: convertVhToPixels('47vh') }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ItemAllocationTable;
