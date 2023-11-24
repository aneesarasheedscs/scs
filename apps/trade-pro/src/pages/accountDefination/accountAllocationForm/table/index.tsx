import { AntTable } from '@scs/ui';
import { Col, Modal, Row, Tooltip, theme } from 'antd';
import { AccountAllocationColumns } from './Columns';
import { useTranslation } from 'react-i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { useState } from 'react';
import { useAddAllocationAccounts } from '../quries';
import { useAtom } from 'jotai';
import { selectedRowsAtom } from './Atom';
import { AccountAllocationTypes, TAddCOAAllocation } from '../types';
import { AntColumnType } from '@tradePro/globalTypes';
import { Checkbox } from 'antd';
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
  selectedRecordId,
}: any) => {
  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);

  const { mutate: addData } = useAddAllocationAccounts();

  const [isAllocatePopupVisible, setAllocatePopupVisible] = useState(false);
  const [isUnAllocatePopupVisible, setUnAllocatePopupVisible] = useState(false);
  const openAllocatePopup = (values: any) => {
    if (selectedRows?.length > 0 == false) {
      setAllocatePopupVisible(true);
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
        console.log(data);
      }
    }
  };

  const openUnAllocatePopup = (values: any) => {
    setUnAllocatePopupVisible(true);
    // setAllocatePopupVisible(true);
    // addData(values);
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

  const handleEditButtonClick = (row: AccountAllocationTypes) => {
    // Check if the row is already selected
    const isSelected = selectedRows.some((selectedRow) => selectedRow?.Id === row.Id);

    if (isSelected) {
      // If the row is already selected, remove it from the selectedRows state
      setSelectedRows(selectedRows.filter((selectedRow) => selectedRow.Id !== row.Id));
    } else {
      // If the row is not selected, add it to the selectedRows state
      setSelectedRows([...selectedRows, row]);
    }
  };
  const isRowSelected = (row: AccountAllocationTypes) => {
    return selectedRows.some((selectedRow) => selectedRow.Id === row.Id);
  };
  const PendingAccountForAllocationColumns = (t: any): AntColumnType<AccountAllocationTypes>[] => [
    {
      width: 100,
      title: <>{t('select')}</>,
      dataIndex: 'selection',
      render: (_text, _record, _index) => {
        const isChecked = isRowSelected(_record);
        return (
          <Checkbox
            name="checked"
            checked={isChecked}
            onChange={() => {
              handleEditButtonClick(_record);
            }}
          />
        );
      },
    },
    {
      width: 160,
      title: <>{t('account_code')}</>,
      searchableDate: true,
      dataIndex: 'AccountCode',
    },
    {
      width: 300,
      title: <>{t('account_title')}</>,
      searchableDate: true,
      dataIndex: 'AccountTitle',
    },
  ];

  return (
    <div>
      <Row>
        <Col xs={24} sm={20} lg={9} style={{ marginTop: '10px', marginLeft: '3%' }}>
          <h2
            className="tableHead"
            style={{
              backgroundColor: colorPrimary,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <p style={{ marginLeft: '25%' }}> {t('pending_accounts_for_allocation')}</p>
            <p>
              <Tooltip title="To Allocate Accounts">
                <CheckCircleFilled style={{ fontSize: '25px' }} onClick={openAllocatePopup} />
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
            columns={PendingAccountForAllocationColumns(t)}
            data={allocatedData?.data?.Data?.Result || []}
            isLoading={tableLoading || isFetching}
            isError={isError}
            scroll={{ x: '', y: convertVhToPixels('56vh') }}
            numberOfSkeletons={12}
          />
        </Col>

        <Col xs={24} sm={20} lg={9} style={{ marginTop: '10px', marginLeft: '10px' }}>
          <h2
            className="tableHead"
            style={{
              width: '100%',
              backgroundColor: colorPrimary,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <p style={{ marginLeft: '30%' }}> {t('allocated_accounts')}</p>
            <p>
              <Tooltip title="Un-Allocate Accounts">
                <CloseCircleFilled style={{ fontSize: '25px' }} onClick={openUnAllocatePopup} />
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
            columns={AccountAllocationColumns(t)}
            data={unallocatedData?.data?.Data?.Result || []}
            isError={isErrorunallocated}
            isLoading={tableLoadingunallocated || isFetchingunallocated}
            refetch={unallocatedrefetch}
            numberOfSkeletons={12}
            scroll={{ x: '', y: convertVhToPixels('56vh') }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AccountAllocationTable;
