import React, { useEffect, useState } from 'react';
import { columns } from '../columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';
import { AntButton, AntTable } from '@scs/ui';
import { useApproveVouchers } from '../queries/approvel';
import { Tooltip } from 'antd';
import { FileProtectOutlined, EditFilled } from '@ant-design/icons';
import '../approvel.scss';
import CustomPopup from 'libs/ui/src/notificationPopUp/notificationPopup';
import { useAtom } from 'jotai';
import { selectedRowsAtom } from './Atom';
import { map } from 'lodash';
import { VoucherApprovalHistory } from '../type';
const VoucherTable: React.FC<{
  documentTypeId: number;
  approvalUnApproval: boolean;
  dataSource: any;
  ForRevision?: boolean;
  VouchersRefetch?: any;
  VouchersLoading?: any;
  isFetching?: any;
}> = ({
  documentTypeId,
  approvalUnApproval,
  dataSource,
  ForRevision,
  VouchersRefetch,
  VouchersLoading,
  isFetching,
}) => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  const { t } = useTranslation();
  const { mutate: Approve, isError, isSuccess, error: ErrorMesg } = useApproveVouchers(documentTypeId);
  const [selected, setSelected] = useState<any>([]);
  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);
  const [selectedAllRows, setSelectedAllRows] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [popupVisibility, setpopupVisibility] = useState(false);
  const [ConfirmPopupVisibility, setConfirmPopupVisibility] = useState(false);
  const [ConfirmationMesg, setConfirmationMesg] = useState('');
  const [popupType, setpopupType] = useState('');
  const [popupMesg, setpopupMesg] = useState('');
  const [popupTitle, setpopupTitle] = useState('');
  const [actionTypeId, setActionTypeId] = useState<boolean>(false);

  const onSelectChange = (selectedRowKeys: any[], selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    // Use the state updater function form of setSelected
    setSelected((prevSelected: any) => selectedRows);
  };
  const rowSelection = {
    selected,
    onChange: onSelectChange,
    hideDefaultSelections: true,
  };

  const handleRecordsForApprove = () => {
    setConfirmationMesg("Are You Sure To approve Record's");
    setConfirmPopupVisibility(true);
    setActionTypeId(false);
  };

  const handleRecordsForRevision = () => {
    setConfirmationMesg('Do You want to Mark Selected Documents For Revision');
    setConfirmPopupVisibility(true);
    setActionTypeId(true);
  };

  let ApproveData: any = [];
  const ApproveRecords = () => {
    ApproveData.AllApprovalLists = [];
    for (let i = 0; i < selectedRows?.length; i++) {
      ApproveData?.AllApprovalLists.push({
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        Id: selectedRows[i].VoucherHeadId,
        PostDate: new Date(),
        EntryUser: userDetail?.UserId,
        ActionTypeId: actionTypeId, // false For Approve ,, true for revision
        ReqType: approvalUnApproval == false ? 'AP' : 'UP',
      });
    }
    setConfirmPopupVisibility(false);
    Approve(ApproveData);
    console.log(ApproveData);
  };

  // let DataForRevision: any = [];
  // const ReviseRecords = () => {
  //   DataForRevision.AllApprovalLists = [];
  //   for (let i = 0; i < selectedRows?.length; i++) {
  //     ApproveData?.AllApprovalLists.push({
  //       OrganizationId: userDetail?.OrganizationId,
  //       CompanyId: userDetail?.CompanyId,
  //       Id: selectedRows[i].VoucherHeadId,
  //       PostDate: new Date(),
  //       EntryUser: userDetail?.UserId,
  //       ActionTypeId: true, // false For Approve ,, true for revision
  //       ReqType: approvalUnApproval == false ? 'AP' : 'UP',
  //     });
  //   }
  //   console.log(DataForRevision);
  //   Approve(DataForRevision);
  // };

  useEffect(() => {
    // if (isSuccess) {
    //   setpopupTitle('Success');
    //   setpopupType('success');
    //   setpopupMesg("Record's Approved Successfully");
    //   setpopupVisibility(true);
    //   setSelected([]);
    // }
    if (isError) {
      setpopupTitle('Error');
      setpopupType('error');
      setpopupMesg('Error ' + ErrorMesg);
      setpopupVisibility(true);
    }
  }, [isError, isSuccess]);
  useEffect(() => {
    if (selectedAllRows) {
      const allRowKeys = dataSource.map((record: any) => record.VoucherHeadId);
      setSelectedRowKeys((prevSelectedKeys) => [...new Set([...prevSelectedKeys, ...allRowKeys])]);
      setSelectedRows(dataSource);
    } else {
      setSelectedRows([]);
      setSelectedRowKeys([]);
    }
  }, [selectedAllRows]);
  const handleSelectAllRecords = (checked?: boolean) => {
    if (checked) {
      // VouchersRefetch();
      setSelectedAllRows(true);
      const allRowKeys = dataSource.map((record: any) => record.VoucherHeadId);
      setSelectedRowKeys((prevSelectedKeys) => [...new Set([...prevSelectedKeys, ...allRowKeys])]);
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, ...dataSource]);
    } else {
      setSelectedAllRows(false);
      setSelectedRowKeys([]);
      setSelectedRows([]);
    }
  };
  const handleCheckboxChange = (record: any, checked: boolean) => {
    console.log(checked);
    if (checked) {
      VouchersRefetch();
      console.log(`selectedRowKeys: ${record.VoucherHeadId}`, 'selectedRows: ', record);
      setSelectedRows((prevSelectedKeys) => [...prevSelectedKeys, record]);
      setSelectedRowKeys((prevSelectedKeys) => [...prevSelectedKeys, record.VoucherHeadId]);
    } else {
      VouchersRefetch();
      setSelectedRowKeys((prevSelectedKeys) => prevSelectedKeys.filter((key) => key !== record.VoucherHeadId));
      setSelectedRows((prevSelectedKeys) => prevSelectedKeys.filter((row) => row !== record));
    }
  };
  console.log('Selected Rows', selectedRows);
  console.log('Selected RowKeys', selectedRowKeys);

  return (
    <div>
      <div className="Approval_Button">
        <Tooltip placement="top" title="Approve Selected Vouchers">
          <AntButton
            icon={<FileProtectOutlined />}
            className="btn"
            onClick={() => handleRecordsForApprove()}
            label={`${selectedRows.length}`}
          />
        </Tooltip>
        {!ForRevision ? (
          <Tooltip placement="top" title="Make For Revision">
            <AntButton
              icon={<EditFilled />}
              style={{ marginLeft: '3px' }}
              className="btn"
              onClick={() => handleRecordsForRevision()}
              label={`${selectedRows.length}`}
            />
          </Tooltip>
        ) : null}
      </div>
      <AntTable
        scroll={{ x: '', y: convertVhToPixels('45vh') }}
        rowKey={'VoucherHeadId'}
        columns={columns(t, handleCheckboxChange, selectedRowKeys, handleSelectAllRecords)}
        data={dataSource || []}
        isLoading={VouchersLoading || isFetching}
        refetch={VouchersRefetch}
        numberOfSkeletons={8}
      />
      {/* <AntTable
        style={{ border: '', height: '500px', overflowY: 'scroll' }}
        // scroll={{ x: 'max-content', y: convertVhToPixels('45vh') }}
        rowKey={'VoucherHeadId'}
        rowSelection={rowSelection}
        columns={columns(t)}
        data={dataSource || []}
        isLoading={VouchersLoading || isFetching}
        refetch={VouchersRefetch}
        scroll={{ x: 'max-content' }}
        numberOfSkeletons={8}
        // searchCriteriaForm={
        //   <div style={{ float: 'right' }}>
        //     <Tooltip placement="top" title="Approved Selected Vouchers">
        //       <AntButton
        //         icon={<FileProtectOutlined />}
        //         className="btn"
        //         onClick={() => ApproveRecords()}
        //         label={`${selected.length}`}
        //       />
        //     </Tooltip>
        //   </div>
        // }
        // <ApproveRecordButtonOnTable SelectedCount={SelectedRowsLength} ApproveRecords={ApproveRecords}
      /> */}
      {/* <CustomPopup
        type={popupType}
        title={popupTitle}
        message={popupMesg}
        visibility={popupVisibility}
        onOk={() => setpopupVisibility(false)}
      ></CustomPopup> */}

      <CustomPopup
        type={'confirmation'}
        title={'Confirmation'}
        message={ConfirmationMesg}
        visibility={ConfirmPopupVisibility}
        onNoClicked={() => setConfirmPopupVisibility(false)}
        onYesClicked={ApproveRecords}
      ></CustomPopup>
    </div>
  );
};

export default VoucherTable;
