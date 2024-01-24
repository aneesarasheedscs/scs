import { Card, Col, Row, Badge, Image } from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined, CaretDownOutlined } from '@ant-design/icons';
import '../approvel.scss';
import './Approval.scss';
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
import { useTranslation } from 'react-i18next';

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
  const [records, setRecords] = useState<VouchersModernHistory[]>([]);

  const { t } = useTranslation();
  const {
    data: NotesData,
    isSuccess: NotesSuccess,
    isLoading: NotesLoading,
    refetch: NotesHistoryRefetch,
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
      setRecords(updatedMainDataSource);
    }
  }, [dataSource]);

  const totalRecords = dataSource.length || 0;
  const [showContent, setShowContent] = useState(false);
  const [SelectedDocumentsCount, setSelectedDocumentsCount] = useState(0);
  const [TooltipVisible, setTooltipVisible] = useState(false);
  const [SelectedVouchersData, setSelectedVouchersData] = useState<any>([]);

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
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(undefined);
  const [sortOrderDocDate, setSortOrderDocDate] = useState<'asc' | 'desc' | undefined>(undefined);
  const [sortAccount, setSortAccount] = useState<'asc' | 'desc' | undefined>(undefined);
  const [sortOrderAmount, setSortOrderAmount] = useState<'asc' | 'desc' | undefined>(undefined);

  const handleSearch = (value: any) => {
    console.log(value);
    const trimmedValue = value.trim();
    const filteredRecords = mainDataSource?.filter((record: VouchersModernHistory) => {
      return record.VoucherHistoryHeader.HeaderAccountTitle.toLowerCase().includes(trimmedValue.toLowerCase());
    });
    console.log(filteredRecords);
    setRecords(filteredRecords || []);
    if (!filteredRecords || filteredRecords.length === 0) {
      setRecords([]);
      console.log('No matching records found');
    }
  };
  //Sort Voucher No
  const handleSortVoucherNo = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sortedRecords = [...(records || [])].sort((a, b) => {
      const comparison = sortOrder === 'asc' ? 1 : -1;
      return a.VoucherHistoryHeader.RecordNo > b.VoucherHistoryHeader.RecordNo ? comparison : -comparison;
    });

    setRecords(sortedRecords);
    console.log('sorting', sortedRecords);
  };
  //Sort Voucher Date
  const handleSortVoucherDate = () => {
    const newSortOrder = sortOrderDocDate === 'asc' ? 'desc' : 'asc';
    setSortOrderDocDate(newSortOrder);

    const sortedRecords = [...(records || [])].sort((a, b) => {
      const comparison = sortOrderDocDate === 'asc' ? 1 : -1;
      return a.VoucherHistoryHeader.VoucherDate > b.VoucherHistoryHeader.VoucherDate ? comparison : -comparison;
    });

    setRecords(sortedRecords);
  };
  // Sort Account
  const handleSortAccountTitle = () => {
    const newSortOrder = sortAccount === 'asc' ? 'desc' : 'asc';
    setSortAccount(newSortOrder);

    const sortedRecords = [...(records || [])].sort((a, b) => {
      const entryUserA = a.VoucherHistoryHeader.HeaderAccountTitle.toLowerCase();
      const entryUserB = b.VoucherHistoryHeader.HeaderAccountTitle.toLowerCase();

      return newSortOrder === 'asc' ? entryUserA.localeCompare(entryUserB) : entryUserB.localeCompare(entryUserA);
    });
    console.log(sortedRecords);
    setRecords(sortedRecords);
  };
  // Sort Amount
  const handleSortAmount = () => {
    const newSortOrder = sortOrderAmount === 'asc' ? 'desc' : 'asc';
    setSortOrderAmount(newSortOrder);

    const sortedRecords = [...(records || [])].sort((a, b) => {
      const comparison = newSortOrder === 'asc' ? 1 : -1;
      return a.VoucherHistoryHeader.VoucherAmount > b.VoucherHistoryHeader.VoucherAmount ? comparison : -comparison;
    });

    setRecords(sortedRecords);
  };

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

  return (
    <div>
      <Row className="row1">
        <Col lg={{ span: 7 }} sm={{ span: 24 }} className="columns">
          <Row className="col" align="middle">
            <Search onChange={(e) => handleSearch(e.target.value)} placeholder="Filter" />
          </Row>
          {/* <div style={{ textAlign: 'center' }}>
            {' '}
            <CaretDownOutlined onClick={toggleContent} />
            Filters
          </div> */}
          {/* {showContent && (
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
          )} */}
          <Row className="row" style={{ fontSize: 14, fontWeight: '700' }}>
            <Col lg={{ span: 7 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
              {t('voucher_no')}# <SortAscendingOutlined onClick={() => handleSortVoucherNo()} />{' '}
              <SortDescendingOutlined onClick={() => handleSortVoucherNo()} />
            </Col>
            <Col lg={{ span: 7 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
              {t('voucher_date')}
              <SortAscendingOutlined onClick={() => handleSortVoucherDate()} />{' '}
              <SortDescendingOutlined onClick={() => handleSortVoucherDate()} />
            </Col>
            <Col lg={{ span: 5 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
              {t('account')}
              <SortAscendingOutlined onClick={() => handleSortAccountTitle()} />{' '}
              <SortDescendingOutlined onClick={() => handleSortAccountTitle()} />
            </Col>
            <Col lg={{ span: 5 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
              {t('amount')} <SortAscendingOutlined onClick={() => handleSortAmount()} />{' '}
              <SortDescendingOutlined onClick={() => handleSortAmount()} />
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
              {records?.map((card: VouchersModernHistory) => (
                <Col lg={24} sm={24} xs={24} md={24} key={card?.VoucherHistoryHeader?.VoucherHeadId}>
                  <Card
                    className="singleCard"
                    key={card?.VoucherHistoryHeader?.VoucherHeadId}
                    style={{ backgroundColor: card?.IsSelected ? '#e1eaed' : 'white' }}
                    onClick={(event) => {
                      setSelectedCardData(card?.VoucherHistoryHeader);
                      HighLightCard(card, event);
                    }}
                  >
                    <Row justify={'space-between'} style={{ marginTop: '-3%' }}>
                      <p className="list-item1">
                        {card?.VoucherHistoryHeader?.VoucherCode}&nbsp; &nbsp; &nbsp;
                        {card?.VoucherHistoryHeader?.DocumentType}
                      </p>
                      <h3>{formateDate(card?.VoucherHistoryHeader?.VoucherDate)}</h3>
                    </Row>
                    <h3>{card?.VoucherHistoryHeader?.HeaderAccountTitle}</h3>
                    <p
                      className="list-items2"
                      style={{
                        color: card?.VoucherHistoryHeader?.IsApproved ? '#f37daa' : 'red',
                      }}
                    >
                      {card?.VoucherHistoryHeader?.IsApproved ? 'Approved' : 'Not Approved'}
                    </p>
                    <Row justify={'space-between'}>
                      <h3>{card?.VoucherHistoryHeader?.Remarks}</h3>
                      <h3>{numberFormatter(card?.VoucherHistoryHeader?.VoucherAmount)}</h3>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          <h3 style={{ textAlign: 'center' }}>
            {' '}
            {t('total_records')}:{numberFormatter(totalRecords)}{' '}
          </h3>
        </Col>
        {selectedCardData && (
          <Col lg={{ span: 17 }} sm={{ span: 24 }} className="columns">
            <Buttons
              SelectedDocumentsCount={SelectedDocumentsCount}
              ApproveSelectedVouchers={handleApproveSelectedVouchers}
              ForRevision={ForRevision}
              VoucherNotesByApprovalPersonVisible={true}
              handlVoucherNotesButtonClick={handlVoucherNotesButtonClick}
            />
            <Row align="middle">
              <Col xs={16} sm={16} className="columns">
                <div className="main-voucher-design" id="Rice_Invoice_Main_Box">
                  <div className="row">
                    <Row>
                      <Col
                        xs={{ span: 6 }}
                        sm={{ span: 5 }}
                        md={{ span: 4 }}
                        lg={{ span: 6 }}
                        xl={{ span: 4 }}
                        xxl={{ span: 3 }}
                      >
                        <div
                          style={{
                            fontSize: '1.5rem',
                            color: 'green',
                            fontWeight: 'bold',
                            textAlign: 'left',
                          }}
                        >
                          <div>
                            <Image
                              className="Img"
                              src={'data:image/jpeg;base64,' + selectedCardData?.CompLogoImage}
                              style={{ width: '6rem', height: '6rem' }}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col
                        xs={{ span: 18 }}
                        sm={{ span: 19 }}
                        md={{ span: 20 }}
                        lg={{ span: 18 }}
                        xl={{ span: 20 }}
                        xxl={{ span: 20 }}
                      >
                        <div>
                          <div className="">
                            <div style={{ fontSize: '1.5rem', color: 'green', textAlign: 'left', fontWeight: 'bold' }}>
                              {userDetail?.CompanyName}
                            </div>
                            <div style={{ fontSize: '1rem', color: 'green', textAlign: 'left' }}>
                              {userDetail?.CompanyAddress}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'green', textAlign: 'left' }}>
                              {userDetail?.CellNo}
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="Wrapper" style={{ marginTop: '0.5%' }}>
                    <Col span={8}>
                      <div className="">
                        <div className="caption-value-wrape">
                          <div className="caption">{t('voucher_no')}:</div>
                          <div className="value">{selectedCardData?.RecordNo}</div>
                        </div>
                        <div className="caption-value-wrape">
                          <div className="caption">{t('voucher_type')}:</div>
                          <div className="value">{selectedCardData?.DocumentType}</div>
                        </div>

                        <div className="caption-value-wrape">
                          <div className="caption">{t('cheque no')}:</div>
                          <div className="value">{selectedCardData?.VoucherCode}</div>
                        </div>

                        <div className="caption-value-wrape">
                          <div className="caption">{t('pay_title')}:</div>
                          <div className="value">{selectedCardData?.PayTitle}</div>
                        </div>

                        <div className="caption-value-wrape">
                          <div className="caption">{t('remarks')}:</div>
                          <div className="value">
                            <div>{selectedCardData?.Remarks}</div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col span={9}>
                      <Row align={'middle'} style={{ height: '60%' }}>
                        <h2 className="headerAccountTitle">{selectedCardData?.HeaderAccountTitle}</h2>
                      </Row>
                    </Col>
                    <Col span={8}>
                      <div className="">
                        <div
                          style={{ display: 'flex', justifyContent: 'space-between' }}
                          className="caption-value-wrape"
                        >
                          <div className="caption">{t('voucher_date')}:</div>
                          <div className="value">
                            {selectedCardData ? dayjs(selectedCardData.VoucherDate).format('YYYY-MM-DD') : ''}
                          </div>
                        </div>
                        <div
                          style={{ display: 'flex', justifyContent: 'space-between' }}
                          className="caption-value-wrape"
                        >
                          <div className="caption">{t('voucher_code')}:</div>
                          <div className="value">{selectedCardData?.VoucherCode}</div>
                        </div>
                        <div
                          style={{ display: 'flex', justifyContent: 'space-between' }}
                          className="caption-value-wrape"
                        >
                          <div className="caption">{t('cheque_date')}:</div>
                          <div className="value">
                            {selectedCardData ? dayjs(selectedCardData.ChequeDate).format('YYYY-MM-DD') : ''}
                          </div>
                        </div>
                        <div
                          style={{ display: 'flex', justifyContent: 'space-between' }}
                          className="caption-value-wrape"
                        >
                          <div className="caption">{t('total_amount')}:</div>
                          <div className="value">
                            {selectedCardData?.VoucherAmount > 0 ? numberFormatter(selectedCardData?.VoucherAmount) : 0}
                          </div>
                        </div>
                      </div>
                    </Col>
                  </div>
                  <Tablefile voucherHeadId={selectedCardData?.VoucherHeadId} documentTypeId={documentTypeId} />
                </div>
              </Col>
            </Row>
          </Col>
        )}
        {/* <Col lg={{ span: 16 }} sm={{ span: 24 }} className="columns">
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
        </Col> */}
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
