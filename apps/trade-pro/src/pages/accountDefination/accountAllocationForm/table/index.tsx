import { AntTable } from '@scs/ui';
import { Col, Modal, Row, Tooltip, notification, theme } from 'antd';
import { AccountAllocationColumns } from './Columns';
import { useTranslation } from 'react-i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useAddAllocationAccounts } from '../quries';
import { useAtom } from 'jotai';
import { selectedRowsAtom } from './Atom';
import { AccountAllocationTypes, TAddCOAAllocation } from '../types';
import { AntColumnType } from '@tradePro/globalTypes';
import { Checkbox } from 'antd';
import { error } from 'console';
const { useToken } = theme;

const AccountAllocationTable = ({
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
  const [selected, setSelected] = useState<any>([]);
  const [selectedAllRows, setSelectedAllRows] = useState(false);
  const [AllocatedData, setAllocatedDate] = useState<any[]>([]);

  const { mutate: addData } = useAddAllocationAccounts();

  const [isAllocatePopupVisible, setAllocatePopupVisible] = useState(false);
  const [isUnAllocatePopupVisible, setUnAllocatePopupVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  const openAllocatePopup = (values: any) => {
    if (selectedRows?.length > 0 == false) {
      const msg = 'select the Account first To Allocate';
      notification.error({
        message: '',
        description: msg,
      });
      // setAllocatePopupVisible(true);
    } else {
      let data: TAddCOAAllocation = {
        COAAllocationlist: [],
        IsActive: false,
        ChartofAccountId: 0,
        CompanyId: 0,
        Id: 0,
        BranchId: 0,
        GLPageNo: '',
        AccountTitle: '',
        OrganizationId: 0,
        DocumentTypeId: 0,
        AccountTypeId: 0,
        EntryUserId: 0,
        FinancialYearId: 0,
      };
      data.COAAllocationlist = [];

      for (let i = 0; i < selectedRows.length; i++) {
        data.COAAllocationlist.push({
          OrganizationId: 2,
          CompanyId: 0,
          BranchId: 0,
          DocumentTypeId: 0,
          FinancialYearId: 0,
          EntryUserId: 0,
          ChartofAccountId: selectedRows[i].ChartofAccountId,
          AccountTitle: selectedRows[i].AccountTitle,
          IsActive: true,
          GLPageNo: '',
          Id: 0,
          AccountTypeId: 0,
          COAAllocationlist: [],
        });
        const msg = 'Acount Allocated Successfully';
        notification.success({
          description: msg,
          message: '',
        });
        console.log(data);
      }
    }
    setAllocatedDate((prevSelectedRows) => [...prevSelectedRows, ...selectedRows]);
  };
  console.log(AllocatedData);
  useEffect(() => {
    setAllocatedDate(unallocatedData?.data?.Data?.Result);
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
      setSelectedRowKeys((prevSelectedKeys) => [...new Set([...prevSelectedKeys, ...allRowKeys])]);
      setSelectedRows(allocatedData?.data?.Data?.Result);
    } else {
      setSelectedRows([]);
      setSelectedRowKeys([]);
    }
  }, [selectedAllRows, unallocatedData]);

  console.log('allocatedData', allocatedData);

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

  const handleSelectAllRecordsForAllocation = (checked?: boolean) => {
    if (checked) {
      unallocatedrefetch();
      setSelectedAllRows(true);
      const allRowKeys = unallocatedData?.data?.Data?.Result.map((record: any) => record.Id);
      setSelectedRowKeys((prevSelectedKeys) => [...new Set([...prevSelectedKeys, ...allRowKeys])]);
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, ...unallocatedData]);
    } else {
      setSelectedAllRows(false);
      setSelectedRowKeys([]);
      setSelectedRows([]);
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

  const handleCheckboxChangeForAllocation = (record: any, checked: boolean) => {
    console.log(checked);
    if (checked) {
      unallocatedrefetch();
      console.log(`selectedRowKeys: ${record.Id}`, 'selectedRows: ', record);
      setSelectedRows((prevSelectedKeys) => [...prevSelectedKeys, record]);
      setSelectedRowKeys((prevSelectedKeys) => [...prevSelectedKeys, record.Id]);
    } else {
      unallocatedrefetch();
      setSelectedRowKeys((prevSelectedKeys) => prevSelectedKeys.filter((key) => key !== record.Id));
      setSelectedRows((prevSelectedKeys) => prevSelectedKeys.filter((row) => row !== record));
    }
  };

  console.log('Selected Rows', selectedRows);
  console.log('Selected RowKeys', selectedRowKeys);

  const openUnAllocatePopup = (values: any) => {
    setUnAllocatePopupVisible(true);
  };

  const closeAllocatePopup = () => {
    setAllocatePopupVisible(false);
  };

  const closeUnAllocatePopup = () => {
    setUnAllocatePopupVisible(false);
  };

  const { t } = useTranslation();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const PendingAccountForAllocationColumns = (
    t: any,
    handleCheckboxChange?: any,
    selectedRowKeys?: any,
    handleSelectAllRecords?: any
  ): AntColumnType<AccountAllocationTypes>[] => [
    {
      title: (
        <Checkbox
          onChange={(e) => {
            if (e.target.checked) {
              console.log('select all');
              handleSelectAllRecords(e.target.checked);
            } else {
              console.log('un select all');
              handleSelectAllRecords(e.target.checked);
            }
          }}
          name="IsActive"
          style={{ marginLeft: '10px' }}
        />
      ),
      dataIndex: 'Id',
      width: 100,
      render: (_, record) => (
        <Checkbox
          name="IsActive"
          onChange={(e) => handleCheckboxChange(record, e.target.checked)}
          checked={selectedRowKeys?.includes(record.Id)}
        />
      ),
      showCount: true,
    },
    {
      width: 160,
      title: t('account_code'),
      searchableInput: true,
      dataIndex: 'AccountCode',
    },
    {
      width: 300,
      title: 'account_title',
      searchableInput: true,
      dataIndex: 'AccountTitle',
    },
  ];

  return (
    <div>
      <Row>
        <Col xs={23} sm={20} lg={9} md={20} style={{ marginTop: '10px', marginLeft: '2%' }}>
          <h2
            className="tableHead"
            style={{
              backgroundColor: colorPrimary,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px',
            }}
          >
            <p style={{ marginLeft: '23%', color: '#fff' }}> {t('pending_accounts_for_allocation')}</p>
            <p>
              <Tooltip title="To Allocate Accounts">
                <CheckCircleFilled
                  style={{ fontSize: '25px', color: '#fff', marginLeft: '-25%' }}
                  onClick={openAllocatePopup}
                />
              </Tooltip>

              <Modal
                title="Allocate Accounts"
                visible={isAllocatePopupVisible}
                onOk={closeAllocatePopup}
                onCancel={closeAllocatePopup}
              >
                {/* Content for the Allocate Accounts popup */}
                checked the row's first
              </Modal>
            </p>
          </h2>
          <AntTable
            refetch={refetch}
            rowKey={'Id'}
            // rowSelection={rowSelection}
            columns={PendingAccountForAllocationColumns(
              t,
              handleCheckboxChange,
              selectedRowKeys,
              handleSelectAllRecords
            )}
            data={allocatedData?.data?.Data?.Result || []}
            isLoading={tableLoading || isFetching}
            isError={isError}
            scroll={{ x: '', y: convertVhToPixels('47vh') }}
            numberOfSkeletons={12}
          />
        </Col>

        <Col xs={23} sm={20} lg={9} md={20} style={{ marginTop: '10px', marginLeft: '10px' }}>
          <h2
            className="tableHead"
            style={{
              width: '100%',
              backgroundColor: colorPrimary,
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px',
            }}
          >
            <p style={{ marginLeft: '30%', color: '#fff' }}> {t('allocated_accounts')}</p>
            <p>
              <Tooltip title="Un-Allocate Accounts">
                <CloseCircleFilled
                  style={{ fontSize: '25px', color: '#fff', marginLeft: '-25%' }}
                  onClick={openUnAllocatePopup}
                />
              </Tooltip>
              <Modal
                title="Un Allocate Accounts"
                visible={isUnAllocatePopupVisible}
                onOk={closeUnAllocatePopup}
                onCancel={closeUnAllocatePopup}
              >
                Checked The Rows First
              </Modal>
            </p>
          </h2>
          <AntTable
            columns={AccountAllocationColumns(
              t,
              selectedRowKeys,
              handleCheckboxChangeForAllocation,
              handleSelectAllRecordsForAllocation
            )}
            data={AllocatedData || []}
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

export default AccountAllocationTable;
