import { Card, Col, Row, Badge } from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined, CaretDownOutlined } from '@ant-design/icons';
import '../approvel.scss';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';
import Tablefile from './Tablefile';
import dayjs from 'dayjs';
import {
  useApproveVouchers,
  useGetVouchersModernHistoryHeaderData,
  useNotesByApprovalPerson_ReadAsSingleString,
  useVouchersNotesByApprovalUserId_Save,
  useVouchersRemarksByApprovalUser_History,
} from '../queries/approvel';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import FormFilter from './modalData/form';
import Buttons from './modalData/button';
import { VouchersHistory_Header, VouchersModernHistory } from '../type';
import ToolTipToShowUserData from './tooltop';
import VouchersNotesPopup from './Notes';
import { colorPrimaryAtom } from '@tradePro/globalAtoms';

const CardView: React.FC<{
  documentTypeId: number;
  approvalUnApproval: boolean;
  dataSource: any;
  ForRevision?: boolean;
  // TotalDataLength?: any;
  // filteredDataLength?: any;
}> = ({ documentTypeId, approvalUnApproval, dataSource, ForRevision }) => {
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  const [mainDataSource, setMainDataSource] = useState<VouchersModernHistory[]>([]);
  const [selectedCardData, setSelectedCardData] = useState<VouchersHistory_Header>();
  const [NotesPopupVisible, setNotesPopupVisible] = useState(false);

  const {
    data: NotesData,
    isSuccess: NotesSuccess,
    isLoading: NotesLoading,
    refetch: NotesHistoryRefetch
  } = useVouchersRemarksByApprovalUser_History(documentTypeId, selectedCardData?.VoucherHeadId);

  const { data: NotesbyApprovalPerson, refetch: SingleNotesRefetch } = useNotesByApprovalPerson_ReadAsSingleString(
    documentTypeId,
    selectedCardData?.VoucherHeadId
  );

  const { mutate: Approve } = useApproveVouchers(documentTypeId);
  const { mutate: SaveNotes } = useVouchersNotesByApprovalUserId_Save();

  useEffect(() => {
    if (selectedCardData) {
      SingleNotesRefetch();
      NotesHistoryRefetch();
    }
  }, [selectedCardData]);

  // const {
  //   data: Data,
  //   isError: VouchersError,
  //   refetch: VouchersRefetch,
  //   isSuccess: VouchersSucess,
  //   isLoading: VouchersLoading,
  // } = useGetVouchersModernHistoryHeaderData(documentTypeId.toString(), 0, true, 'Not All', approvalUnApproval);
  // const voucherData = Data?.data?.Data?.Result;
  // useEffect(() => {
  //   if (!VouchersLoading && VouchersSucess) {
  //     const updatedMainDataSource = [];
  //     let FilteredData = voucherData.filter((item: any) => (item.ActionTypeId == ForRevision ? 1 : 0));
  //     TotalDataLength(voucherData.length);
  //     filteredDataLength(FilteredData.length);
  //     for (let i = 0; i < FilteredData?.length; i++) {
  //       updatedMainDataSource.push({
  //         VoucherHistoryHeader: FilteredData[i],
  //         VoucherHistoryDetail: [],
  //         IsChecked: false,
  //         IsSelected: false,
  //       });
  //     }
  //     setMainDataSource(updatedMainDataSource);
  //   }
  // }, [voucherData]);

  useEffect(() => {
    if (dataSource.length > 0) {
      const updatedMainDataSource = [];
      for (let i = 0; i < dataSource?.length; i++) {
        updatedMainDataSource.push({
          VoucherHistoryHeader: dataSource[i],
          VoucherHistoryDetail: [],
          IsChecked: false,
          IsSelected: false,
        });
      }
      setMainDataSource(updatedMainDataSource);
    }
  }, [dataSource]);

  const [records, setRecords] = useState(String);
  // const totalRecords = Data?.data?.Data?.Result.length || 0;
  const totalRecords = dataSource.length || 0;
  const [showContent, setShowContent] = useState(false);
  const [SelectedDocumentsCount, setSelectedDocumentsCount] = useState(0);
  const [TooltipVisible, setTooltipVisible] = useState(false);
  const [SelectedVouchersData, setSelectedVouchersData] = useState<any>([]);
  const toggleContent = () => {
    setShowContent(!showContent);
  };

  // interface UserInfoForVouchersHistory {
  //   TargetId: string;
  //   UserId: number;
  //   UserName: string;
  //   date: Date;
  //   UserProfileImageUrl: string;
  // }

  // let UserInfoDataForTooltip: UserInfoForVouchersHistory = {
  //   TargetId: '', // Default value for TargetId
  //   UserId: 0, // Default value for UserId (or whatever is appropriate)
  //   UserName: '', // Default value for UserName
  //   date: new Date(), // Default value for date (or whatever is appropriate)
  //   UserProfileImageUrl: '', // Default value for UserProfileImageUrl
  // };

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  // const setUserInfo = (data: VouchersHistory_Header, user: string) => {
  //   console.log('Data Send to Tooltip: ', data);
  //   UserInfoDataForTooltip.TargetId = user;
  //   if (user == 'EntryUser') {
  //     UserInfoDataForTooltip.UserId = data.EntryUser;
  //     UserInfoDataForTooltip.UserName = data.EntryUserName;
  //     UserInfoDataForTooltip.date = data.EntryDate;
  //     UserInfoDataForTooltip.UserProfileImageUrl = data.EntryUserProfileImageUrl;
  //   } else if (user == 'ModifyUser') {
  //     UserInfoDataForTooltip.UserId = data.ModifyUser;
  //     UserInfoDataForTooltip.date = data.ModifyDate;
  //     UserInfoDataForTooltip.UserName = data.ModifyUserName;
  //     UserInfoDataForTooltip.UserProfileImageUrl = data.ModifyUserProfileImageUrl;
  //   } else if (user == 'ApprovalUser') {
  //     UserInfoDataForTooltip.UserId = data.PostUser;
  //     UserInfoDataForTooltip.date = data.PostDate;
  //     UserInfoDataForTooltip.UserName = data.ApprovalUserName;
  //     UserInfoDataForTooltip.UserProfileImageUrl = data.ApprovalUserProfileImageUrl;
  //   }
  //   console.log('Data modify Send to Tooltip: ', UserInfoDataForTooltip);
  // };

  const handleSearch = (value: string) => {
    // You can perform any additional logic here
    setRecords(value);
  };

  // useEffect(() => {
  //   console.log('Count: ', SelectedDocumentsCount);
  //   console.log('Data: ', SelectedVouchersData);
  // }, [SelectedDocumentsCount, SelectedVouchersData]);

  const HighLightCard = (data: VouchersModernHistory, event: React.MouseEvent<HTMLDivElement>) => {
    let newData: any = [];
    if (event.ctrlKey) {
      newData = mainDataSource.map((item) => {
        if (item.VoucherHistoryHeader.VoucherHeadId === data.VoucherHistoryHeader.VoucherHeadId) {
          // Modify the isSelected property of the specific item
          return { ...item, IsSelected: true };
        }
        return item; // Keep other items unchanged
      });
      setMainDataSource(newData);
      const selectedCount = newData.filter((item: any) => item.IsSelected).length;
      setSelectedDocumentsCount(selectedCount);
    } else {
      setSelectedDocumentsCount(1);
      newData = mainDataSource.map((item) => {
        if (item.VoucherHistoryHeader.VoucherHeadId === data.VoucherHistoryHeader.VoucherHeadId) {
          // Modify the isSelected property of the specific item
          return { ...item, IsSelected: true };
        }
        return { ...item, IsSelected: false }; // other with false
      });
      setMainDataSource(newData);
    }
    // selected vouchers
    setSelectedVouchersData(() => newData?.filter((item: any) => item.IsSelected == true));
  };

  let ApproveData: any = [];
  const ApproveRecords = (ActionTypeId: boolean) => {
    if (SelectedVouchersData.length > 0) {
      ApproveData.AllApprovalLists = [];
      for (let i = 0; i < SelectedVouchersData?.length; i++) {
        ApproveData?.AllApprovalLists.push({
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          Id: SelectedVouchersData[i].VoucherHistoryHeader.VoucherHeadId,
          PostDate: new Date(),
          EntryUser: userDetail?.UserId,
          ActionTypeId: ActionTypeId, // false For Approve ,,, true for Revision
          ReqType: approvalUnApproval == false ? 'AP' : 'UP',
        });
      }
      console.log('Approval Data: ', ApproveData);
      Approve(ApproveData);
      setSelectedCardData(undefined);
    }
  };

  const handleApproveSelectedVouchers = (TypeId: boolean) => {
    ApproveRecords(TypeId);
  };

  const handlVoucherNotesButtonClick = () => {
    setNotesPopupVisible(true);
  };

  const handleSavingVoucherNotes = (obj: any) => {
    console.log(obj);
    SaveNotes({
      RefDocTypeId: documentTypeId,
      RefDocMasterRecordId: selectedCardData?.VoucherHeadId,
      Comments: obj.Comments,
      CommentsUserId: userDetail?.UserId,
      CommentsEntryDate: new Date(),
      SortNo: 1,
    });
  };

  const HandleFilterCriteriaData = () => {};
  return (
    <div>
      <Row className="row1">
        <Col lg={{ span: 8 }} sm={{ span: 24 }} className="columns">
          <Row className="col" align="middle">
            <Search onChange={(e) => handleSearch(e.target.value)} placeholder="Filter" />
          </Row>
          <div style={{ textAlign: 'center' }}>
            {' '}
            <CaretDownOutlined onClick={toggleContent} />
            Filters
          </div>
          {showContent && (
            <div
              style={{
                marginTop: '2%',
                maxHeight: '20%',
                overflowX: 'hidden',
                overflowY: 'auto',
              }}
            >
              <FormFilter data={mainDataSource} handleFilterCriteria={HandleFilterCriteriaData} />
            </div>
          )}
          <Row className="row" style={{ fontSize: 14, fontWeight: '700' }}>
            <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
              Voucher# <SortAscendingOutlined /> <SortDescendingOutlined />
            </Col>
            <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
              V.Date <SortAscendingOutlined /> <SortDescendingOutlined />
            </Col>
            <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
              Account
              <SortAscendingOutlined /> <SortDescendingOutlined />
            </Col>
            <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
              Amount <SortAscendingOutlined /> <SortDescendingOutlined />
            </Col>
          </Row>
          <div style={{ backgroundColor: ' #d6d6e7', maxHeight: 'calc(114vh - 200px)', overflowY: 'auto' }}>
            <Row
              gutter={[16, 16]}
              style={{
                borderRadius: '1%',
                width: '99%',
              }}
            >
              {mainDataSource?.map((card: VouchersModernHistory) => (
                <Col lg={24} sm={24} xs={24} md={24} key={card.VoucherHistoryHeader.VoucherHeadId}>
                  <Card
                    className="singleCard"
                    key={card?.VoucherHistoryHeader?.VoucherHeadId}
                    style={{ backgroundColor: card?.IsSelected ? '#e1eaed' : 'white' }}
                    onClick={(event) => {
                      setSelectedCardData(card?.VoucherHistoryHeader);
                      HighLightCard(card, event);
                    }}
                  >
                    <Row justify={'space-between'}>
                      <p className="list-item1">{card.VoucherHistoryHeader.VoucherCode}</p>
                      <h3>{formateDate(card.VoucherHistoryHeader.VoucherDate)}</h3>
                    </Row>
                    <h3>{card.VoucherHistoryHeader.HeaderAccountTitle}</h3>
                    <span
                      className="list-items2"
                      style={{
                        background: card.VoucherHistoryHeader.IsApproved ? '#f37daa' : 'red',
                      }}
                    >
                      {card.VoucherHistoryHeader.IsApproved ? 'Approved' : 'Not Approved'}
                    </span>
                    <Row justify={'space-between'}>
                      <p className="list-item1">{card.VoucherHistoryHeader.DocumentType}</p>
                      <h3>{numberFormatter(card.VoucherHistoryHeader.VoucherAmount)}</h3>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          <h3 style={{ textAlign: 'center' }}>Total Records:{numberFormatter(totalRecords)} </h3>
        </Col>
        <Col lg={{ span: 16 }} sm={{ span: 24 }} className="columns">
          <Buttons
            SelectedDocumentsCount={SelectedDocumentsCount}
            ApproveSelectedVouchers={handleApproveSelectedVouchers}
            ForRevision={ForRevision}
            VoucherNotesByApprovalPersonVisible={true}
            handlVoucherNotesButtonClick={handlVoucherNotesButtonClick}
          />
          {selectedCardData && (
            <Row align="middle">
              <Col xs={23} sm={16} className="columns">
                <div className="main-voucher-design" id="Rice_Invoice_Main_Box">
                  <div className="row">
                    <div className="">
                      <div className="voucher_Account_title">
                        <div className="Account_title">{selectedCardData?.HeaderAccountTitle}</div>
                      </div>
                    </div>
                  </div>
                  <div className="Wrapper">
                    <div className="">
                      <div className="caption-value-wrape">
                        <div className="caption">Voucher Type:</div>
                        <div className="value">{selectedCardData?.DocumentType}</div>
                      </div>
                      <div className="caption-value-wrape">
                        <div className="caption">Voucher Date:</div>
                        <div className="value">
                          {selectedCardData ? dayjs(selectedCardData.VoucherDate).format('YYYY-MM-DD') : ''}
                        </div>
                      </div>

                      <div className="caption-value-wrape">
                        <div className="caption">Voucher Code:</div>
                        <div className="value">{selectedCardData?.VoucherCode}</div>
                      </div>
                    </div>
                    <div className="">
                      <div className="caption-value-wrape">
                        <div className="caption">Payee Title:</div>
                        <div className="value">{selectedCardData?.PayTitle}</div>
                      </div>
                      <div className="caption-value-wrape">
                        <div className="caption">Cheque Number:</div>
                        <div className="value">{selectedCardData?.ChequeNo}</div>
                      </div>
                      <div className="caption-value-wrape">
                        <div className="caption">Cheque Date:</div>
                        <div className="value">
                          {selectedCardData ? dayjs(selectedCardData.ChequeDate).format('YYYY-MM-DD') : ''}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'center', margin: '0px 10px' }}>
                      <div className="Caption">Entery User</div>
                      <div>
                        <img className="Img" src={selectedCardData?.EntryUserProfileImageUrl} alt=""></img>
                      </div>
                      <div
                        id="EntryUser"
                        className="Value"
                        onMouseEnter={() => handleMouseEnter()}
                        onMouseLeave={() => handleMouseLeave()}
                      >
                        <Badge.Ribbon text={selectedCardData.EntryUserName}></Badge.Ribbon>
                        {TooltipVisible && (
                          <ToolTipToShowUserData
                            UserType={'EntryUser'}
                            UserInfoDataForTooltip={selectedCardData}
                            UserInfoTooltipVisible={TooltipVisible}
                          />
                        )}
                      </div>
                    </div>
                    {selectedCardData?.ModifyUser && (
                      <div style={{ textAlign: 'center', margin: '0px 10px' }}>
                        <div className="Caption">Modify User</div>
                        <div>
                          <img className="Img" src={selectedCardData?.ModifyUserProfileImageUrl} alt="" />
                        </div>
                        <div
                          id="ModifyUser"
                          className="Value"
                          onMouseEnter={() => handleMouseEnter()}
                          onMouseLeave={() => handleMouseLeave()}
                        >
                          <Badge.Ribbon text={selectedCardData.ModifyUserName}></Badge.Ribbon>
                        </div>
                      </div>
                    )}
                    {selectedCardData?.PostUser && (
                      <div style={{ textAlign: 'center', margin: '0px 10px' }}>
                        <div className="Caption">Approval User</div>
                        <div>
                          <img className="Img" src={selectedCardData?.ApprovalUserProfileImageUrl} alt="" />
                        </div>
                        <div
                          id="ApprovalUser"
                          className="Value"
                          onMouseEnter={() => handleMouseEnter()}
                          onMouseLeave={() => handleMouseLeave()}
                        >
                          <Badge.Ribbon text={selectedCardData.ApprovalUserName}></Badge.Ribbon>
                        </div>
                      </div>
                    )}
                  </div>
                  <Row>
                    <div className="caption-value-wrape">
                      <div className="caption">Remarks:</div>
                      <div className="value">{selectedCardData?.Remarks}</div>
                    </div>
                  </Row>
                  {NotesbyApprovalPerson?.data?.Data?.Result && (
                    <Row>
                      <div className="caption-value-wrape">
                        <div className="caption">Notes:</div>
                        <div className="value">{NotesbyApprovalPerson?.data?.Data?.Result}</div>
                      </div>
                    </Row>
                  )}

                  <Tablefile voucherHeadId={selectedCardData?.VoucherHeadId} documentTypeId={documentTypeId} />
                </div>
              </Col>
            </Row>
          )}
        </Col>
      </Row>

      <VouchersNotesPopup
        visible={NotesPopupVisible}
        historyData={NotesData?.data?.Data?.Result}
        onClose={() => setNotesPopupVisible(false)}
        onSave={handleSavingVoucherNotes}
      ></VouchersNotesPopup>
    </div>
  );
};

export default CardView;
