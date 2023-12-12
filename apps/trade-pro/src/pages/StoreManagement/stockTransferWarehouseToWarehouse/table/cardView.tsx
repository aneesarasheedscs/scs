import { Card, Col, Row, Tooltip, Badge } from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import '../style.scss';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import Buttons from '@tradePro/pages/dashboards/approval_dashboard/voucher_ApprovalUnApproval/modalData/button';
import ToolTipToShowUserData from '@tradePro/pages/dashboards/approval_dashboard/voucher_ApprovalUnApproval/tooltop';
import { useGetStockTransferHistory } from '../quries';
import { TStockTransferHistory } from '../types';
import DetailTablefile from './DetailTablefile';

const CardView: React.FC<{ documentTypeId: number; approvalUnApproval: boolean }> = ({
  documentTypeId,
  approvalUnApproval,
}) => {
  const { data, isError, isLoading, refetch, isFetching } = useGetStockTransferHistory();
  const stockTransfer = data?.data?.Data?.Result;

  const [records, setRecords] = useState<TStockTransferHistory[]>([]);
  const [selectedCardData, setSelectedCardData] = useState<TStockTransferHistory>();
  const totalRecords = data?.data?.Data?.Result.length || 0;
  const [showContent, setShowContent] = useState(false);
  const [TooltipVisible, setTooltipVisible] = useState(false);
  useEffect(() => {
    setRecords(stockTransfer);
  }, [stockTransfer]);
  console.log('records', records);
  const toggleContent = () => {
    setShowContent(!showContent);
  };

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };
  const [sortOrderAmount, setSortOrderAmount] = useState<'asc' | 'desc' | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(undefined);
  const [sortOrderDocDate, setSortOrderDocDate] = useState<'asc' | 'desc' | undefined>(undefined);
  const [sortOrderEntryUser, setSortOrderEntryUser] = useState<'asc' | 'desc' | undefined>(undefined);
  const handleSortDocNo = () => {
    //Sort Doc No
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sortedRecords = [...(records || [])].sort((a, b) => {
      const comparison = sortOrder === 'asc' ? 1 : -1;
      return a.DocNo > b.DocNo ? comparison : -comparison;
    });

    setRecords(sortedRecords);
    console.log('sorting', sortedRecords);
  };
  const handleSortDocDate = () => {
    //Sort Doc Date
    const newSortOrder = sortOrderDocDate === 'asc' ? 'desc' : 'asc';
    setSortOrderDocDate(newSortOrder);

    const sortedRecords = [...(records || [])].sort((a, b) => {
      const comparison = sortOrderDocDate === 'asc' ? 1 : -1;
      return a.DocDate > b.DocDate ? comparison : -comparison;
    });

    setRecords(sortedRecords);
  };
  const handleSortEntryUser3 = () => {
    //Sort Entry User
    const newSortOrder = sortOrderEntryUser === 'asc' ? 'desc' : 'asc';
    setSortOrderEntryUser(newSortOrder);

    const sortedRecords = [...(records || [])].sort((a, b) => {
      const comparison = sortOrderEntryUser === 'asc' ? 1 : -1;
      return a.EntryUser.localeCompare(b.EntryUser) * comparison;
    });

    setRecords(sortedRecords);
  };
  const handleSortEntryUser = () => {
    // Sort Entry User
    const newSortOrder = sortOrderEntryUser === 'asc' ? 'desc' : 'asc';
    setSortOrderEntryUser(newSortOrder);

    const sortedRecords = [...(records || [])].sort((a, b) => {
      const entryUserA = a.EntryUser.toLowerCase();
      const entryUserB = b.EntryUser.toLowerCase();

      return newSortOrder === 'asc' ? entryUserA.localeCompare(entryUserB) : entryUserB.localeCompare(entryUserA);
    });
    console.log(sortedRecords);
    setRecords(sortedRecords);
  };

  const handleSortAmount = () => {
    // Sort Amount
    const newSortOrder = sortOrderAmount === 'asc' ? 'desc' : 'asc';
    setSortOrderAmount(newSortOrder);

    const sortedRecords = [...(records || [])].sort((a, b) => {
      const comparison = newSortOrder === 'asc' ? 1 : -1;
      return a.TotalAmount > b.TotalAmount ? comparison : -comparison;
    });

    setRecords(sortedRecords);
  };

  const handleSearch = (value: any) => {
    console.log(value);
    const trimmedValue = value.trim(); // Trim leading and trailing whitespaces
    const filteredRecords = stockTransfer?.filter((record: TStockTransferHistory) => {
      return record.EntryUser.toLowerCase().includes(trimmedValue.toLowerCase());
    });
    setRecords(filteredRecords || []);
    if (!filteredRecords || filteredRecords.length === 0) {
      setRecords([]);
      console.log('No matching records found');
    }
  };

  return (
    <div>
      <Row className="row1">
        <Col lg={{ span: 8 }} sm={{ span: 24 }} xl={6} className="columns">
          <Row className="col" align="middle">
            <Search onChange={(e) => handleSearch(e.target.value)} placeholder="Filter" />
          </Row>
          <Row gutter={10} className="row" style={{ fontSize: 14, fontWeight: '700', padding: 4 }}>
            <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
              Doc No# <SortAscendingOutlined onClick={() => handleSortDocNo()} />{' '}
              <SortDescendingOutlined onClick={() => handleSortDocNo()} />
            </Col>
            <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
              Doc Date <SortAscendingOutlined onClick={() => handleSortDocDate()} />{' '}
              <SortDescendingOutlined onClick={() => handleSortDocDate()} />
            </Col>
            <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
              Entry User
              <SortAscendingOutlined onClick={() => handleSortEntryUser()} />{' '}
              <SortDescendingOutlined onClick={() => handleSortEntryUser()} />
            </Col>
            <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
              Amount <SortAscendingOutlined onClick={() => handleSortAmount()} />{' '}
              <SortDescendingOutlined onClick={() => handleSortAmount()} />
            </Col>
          </Row>
          <div
            style={{ backgroundColor: ' #d6d6e7', maxHeight: 'calc(114vh - 200px)', height: '70%', overflowY: 'auto' }}
          >
            <Row
              gutter={[10, 16]}
              style={{
                borderRadius: '1%',
                width: '99%',
              }}
            >
              {records?.map((card: TStockTransferHistory) => (
                <Col lg={24} sm={24} xs={24} md={24} key={card.Id}>
                  <Card className="singleCard" onClick={() => setSelectedCardData(card)}>
                    <Row justify={'space-between'} style={{ marginTop: '-3%' }}>
                      <p className="list-item2">Doc# {card.DocNo}</p>
                      <h3>{formateDate(card.DocDate)}</h3>
                    </Row>
                    <Row justify={'space-between'}>
                      <p className="list-item1">{card.EntryUser}</p>
                      <h3>{formateDate(card.EntryDate)}</h3>
                    </Row>
                    <p style={{ textAlign: 'center', marginTop: '2%' }}>
                      <span
                        className="list-items2"
                        style={{
                          background: card.ApprovalStatus === 'Approved' ? 'green' : 'red',
                        }}
                      >
                        {card.ApprovalStatus === 'Approved' ? 'Approved' : 'Not Approved'}
                      </span>
                    </p>
                    <Row justify={'space-between'} style={{ marginBottom: '-2%' }}>
                      <p className="list-item1">{numberFormatter(card.TotalQty)}0</p>
                      <h3>{numberFormatter(card.TotalAmount)}0</h3>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          <h3 style={{ textAlign: 'center' }}>Total Records:{numberFormatter(totalRecords)} </h3>
        </Col>

        {selectedCardData && (
          <Col lg={{ span: 16 }} sm={{ span: 24 }} xl={18} className="columns">
            <Buttons />
            <Row align="middle">
              <Col xs={23} sm={16} className="columns">
                <div className="main-voucher-design" id="Rice_Invoice_Main_Box">
                  <div className="row">
                    <div className="">
                      <div className="voucher_Account_title">
                        <div className="Account_title">{selectedCardData?.EntryUser}</div>
                      </div>
                    </div>
                  </div>
                  <div className="Wrapper">
                    <div className="">
                      <div className="caption-value-wrape">
                        <div className="caption">Document No#</div>
                        <div className="value">{selectedCardData?.DocNo}</div>
                      </div>
                      <div className="caption-value-wrape">
                        <div className="caption">Document Date:</div>
                        <div className="value">
                          {selectedCardData ? dayjs(selectedCardData.DocDate).format('YYYY-MM-DD') : ''}
                        </div>
                      </div>

                      <div className="caption-value-wrape">
                        <div className="caption">Total Quantity:</div>
                        <div className="value">
                          {selectedCardData?.TotalQty > 0 ? numberFormatter(selectedCardData?.TotalQty) : 0}
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="caption-value-wrape">
                        <div className="caption">Entry User:</div>
                        <div className="value">{selectedCardData?.EntryUser}</div>
                      </div>
                      <div className="caption-value-wrape">
                        <div className="caption">Entry Date:</div>
                        {selectedCardData ? dayjs(selectedCardData.EntryDate).format('YYYY-MM-DD') : ''}
                      </div>
                      <div className="caption-value-wrape">
                        <div className="caption">Total Amount:</div>
                        <div className="value">
                          {selectedCardData?.TotalAmount > 0 ? numberFormatter(selectedCardData?.TotalAmount) : 0}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'center', margin: '0px 10px' }}>
                      <div className="Caption">Entery User</div>
                      <div>
                        <img className="Img" src={selectedCardData?.EntryUser} alt=""></img>
                      </div>
                      <div
                        id="EntryUser"
                        className="Value"
                        onMouseEnter={() => handleMouseEnter()}
                        onMouseLeave={() => handleMouseLeave()}
                      >
                        <Badge text={selectedCardData.EntryUser}></Badge>
                        {TooltipVisible && (
                          <ToolTipToShowUserData
                            UserInfoDataForTooltip={[
                              // selectedCardData.EntryUserProfileImageUrl,
                              selectedCardData.EntryUser,
                              selectedCardData.EntryDate,
                            ]}
                            UserInfoTooltipVisible={TooltipVisible}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <DetailTablefile selectedRecordId={selectedCardData?.Id} documentTypeId={documentTypeId} />
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
