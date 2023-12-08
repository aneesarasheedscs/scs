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
const VoucherTable: React.FC<{
  documentTypeId: number;
  approvalUnApproval: boolean;
  dataSource: any;
  ForRevision?: boolean;
}> = ({ documentTypeId, approvalUnApproval, dataSource, ForRevision }) => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  const { t } = useTranslation();
  const { mutate: Approve, isError, isSuccess, error: ErrorMesg } = useApproveVouchers(documentTypeId);
  const [selected, setSelected] = useState<any>([]);

  const [popupVisibility, setpopupVisibility] = useState(false);
  const [popupType, setpopupType] = useState('');
  const [popupMesg, setpopupMesg] = useState('');
  const [popupTitle, setpopupTitle] = useState('');

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

  let ApproveData: any = [];
  const ApproveRecords = (ActionTypeId: boolean) => {
    // ApproveData.OrganizationId = userDetail?.OrganizationId;
    // ApproveData.CompanyId = userDetail?.CompanyId;
    ApproveData.AllApprovalLists = [];
    for (let i = 0; i < selected?.length; i++) {
      ApproveData?.AllApprovalLists.push({
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        Id: selected[i].VoucherHeadId,
        PostDate: new Date(),
        EntryUser: userDetail?.UserId,
        ActionTypeId: ActionTypeId, // false For Approve ,, true for revision
        ReqType: approvalUnApproval == false ? 'AP' : 'UP',
      });
    }
    Approve(ApproveData);
  };

  useEffect(() => {
    if (isSuccess) {
      setpopupTitle('Success');
      setpopupType('success');
      setpopupMesg("Record's Approved Successfully");
      setpopupVisibility(true);
      setSelected([]);
    }
    if (isError) {
      setpopupTitle('Error');
      setpopupType('error');
      setpopupMesg('Error ' + ErrorMesg);
      setpopupVisibility(true);
    }
  }, [isError, isSuccess]);

  return (
    <div>
      <div className="Approval_Button">
        <Tooltip placement="top" title="Approved Selected Vouchers">
          <AntButton
            icon={<FileProtectOutlined />}
            className="btn"
            onClick={() => ApproveRecords(false)}
            label={`${selected.length}`}
          />
        </Tooltip>
        {!ForRevision ? (
          <Tooltip placement="top" title="Make For Revision">
            <AntButton
              icon={<EditFilled />}
              style={{ marginLeft: '3px' }}
              className="btn"
              onClick={() => ApproveRecords(true)}
              label={`${selected.length}`}
            />
          </Tooltip>
        ) : null}
      </div>
      <AntTable
        // scroll={{ x: 'max-content', y: convertVhToPixels('50vh') }}
        rowKey={'VoucherHeadId'}
        rowSelection={rowSelection}
        columns={columns(t)}
        data={dataSource || []}
        scroll={{ x: 'max-content' }}
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
      />
      <CustomPopup
        type={popupType}
        title={popupTitle}
        message={popupMesg}
        visibility={popupVisibility}
        onOk={() => setpopupVisibility(false)}
        onNoClicked={() => setpopupVisibility(false)}
        onYesClicked={ApproveRecords}
      ></CustomPopup>
    </div>
  );
};

export default VoucherTable;
