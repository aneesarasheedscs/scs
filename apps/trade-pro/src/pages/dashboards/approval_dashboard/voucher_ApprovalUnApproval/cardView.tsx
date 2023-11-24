import { Card, Col, Row, Tooltip, Badge } from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined, CaretDownOutlined } from '@ant-design/icons';
import '../approvel.scss';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';
import Tablefile from './Tablefile';
import { colorPrimaryAtom } from '@tradePro/globalAtoms';
import dayjs from 'dayjs';
import { useApproveVouchers, useGetVouchersModernHistoryHeaderData } from '../queries/approvel';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import FormFilter from './modalData/form';
import Buttons from './modalData/button';
import { VouchersHistory_Header, VouchersModernHistory } from '../type';
import ToolTipToShowUserData from './tooltop';
import { useAtom } from 'jotai';
import { SelectedVouchers } from './Atom';
const CardView: React.FC<{ documentTypeId: number; approvalUnApproval: boolean }> = ({
  documentTypeId,
  approvalUnApproval,
}) => {
  const {
    data: Data,
    isError: VouchersError,
    refetch: VouchersRefetch,
    isSuccess: VouchersSucess,
    isLoading: VouchersLoading,
  } = useGetVouchersModernHistoryHeaderData(documentTypeId.toString(), 0, true, 'Not All', approvalUnApproval);
  const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
  const voucherData = Data?.data?.Data?.Result; // Replace with your actual data array
  const [mainDataSource, setMainDataSource] = useState<VouchersModernHistory[]>([]);
  const { mutate: Approve } = useApproveVouchers(documentTypeId);

  useEffect(() => {
    const updatedMainDataSource = [];
    for (let i = 0; i < voucherData?.length; i++) {
      updatedMainDataSource.push({
        VoucherHistoryHeader: voucherData[i],
        VoucherHistoryDetail: [],
        IsChecked: false,
        IsSelected: false,
      });
    }
    setMainDataSource(updatedMainDataSource);
  }, [voucherData]);

  const [records, setRecords] = useState(String);
  const [selectedCardData, setSelectedCardData] = useState<VouchersHistory_Header>();
  const totalRecords = Data?.data?.Data?.Result.length || 0;
  const [showContent, setShowContent] = useState(false);
  const [SelectedDocumentsCount, setSelectedDocumentsCount] = useState(1);
  const [TooltipVisible, setTooltipVisible] = useState(false);
  const [SelectedVouchersData, setSelectedVouchersData] = useAtom(SelectedVouchers);
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

  useEffect(() => {
    console.log('Count: ', SelectedDocumentsCount);
    console.log('Data: ', SelectedVouchersData);
  }, [SelectedDocumentsCount, SelectedVouchersData]);

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
  const ApproveRecords = () => {
    // ApproveData.OrganizationId = userDetail?.OrganizationId;
    // ApproveData.CompanyId = userDetail?.CompanyId;
    ApproveData.AllApprovalLists = [];
    for (let i = 0; i < SelectedVouchersData?.length; i++) {
      ApproveData?.AllApprovalLists.push({
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        Id: SelectedVouchersData[i].VoucherHistoryHeader.VoucherHeadId,
        PostDate: new Date(),
        EntryUser: userDetail?.UserId,
        ActionTypeId: 0, // For Approve
        ReqType: approvalUnApproval == false ? 'AP' : 'UP',
      });
    }
    console.log('Approval Data: ', ApproveData);
    Approve(ApproveData);
    setSelectedCardData(undefined);
  };

  const handleApproveSelectedVouchers = () => {
    ApproveRecords();
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

        {selectedCardData && (
          <Col lg={{ span: 16 }} sm={{ span: 24 }} className="columns">
            <Buttons
              SelectedDocumentsCount={SelectedDocumentsCount}
              ApproveSelectedVouchers={handleApproveSelectedVouchers}
            />
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
                        <Badge text={selectedCardData.EntryUserName}></Badge>
                        {TooltipVisible && (
                          <ToolTipToShowUserData
                            UserInfoDataForTooltip={[
                              selectedCardData.EntryUserProfileImageUrl,
                              selectedCardData.EntryUserName,
                              selectedCardData.EntryDate,
                            ]}
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
                  <Tablefile voucherHeadId={selectedCardData?.VoucherHeadId} documentTypeId={documentTypeId} />
                </div>
              </Col>
            </Row>
          </Col>
        )}
      </Row>

      {/* <Tooltip
        open={TooltipVisible}
        key={UserInfoDataForTooltip?.TargetId}
        trigger={['hover']}
        title={
          <div className="row">
            <div className="col-2">
              <div className="detail d-flex">
                <div>
                  <img
                    className="border rounded"
                    style={{ height: '40px', width: '40px' }}
                    src={UserInfoDataForTooltip?.UserProfileImageUrl}
                    alt=""
                  />
                </div>
                <div>
                  <p className="px-1 m-0 font-regular text-truncate">{UserInfoDataForTooltip?.UserName}</p>
                  <p className="px-1 m-0 font-regular text-truncate">{formateDate(UserInfoDataForTooltip?.date)}</p>
                </div>
              </div>
            </div>
          </div>
        }
      ></Tooltip> */}
    </div>
  );
};

export default CardView;
