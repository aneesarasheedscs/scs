import { Card, Col, Row, Badge } from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { useGetCashPaymentVoucherTable } from '../queries/queries';
import { TCashPaymentVoucherTable } from './types';
import Search from 'antd/es/input/Search';
import Buttons from './Buttons';
import { useTranslation } from 'react-i18next';
import Tablefile from './TableFile';

const CardView: React.FC<{}> = () => {
  const { t } = useTranslation();
  const { data, isError, isLoading } = useGetCashPaymentVoucherTable();
  const voucherData = data?.data?.Data?.Result;
  console.log(data?.data?.Data?.Result);
  const [records, setRecords] = useState<string>();
  const [selectedCardData, setSelectedCardData] = useState<TCashPaymentVoucherTable>();
  console.log(selectedCardData);
  const totalRecords = data?.data?.Data?.Result.length || 0;
  const [showContent, setShowContent] = useState(false);
  const [TooltipVisible, setTooltipVisible] = useState(false);
  const selectedRecordId = selectedCardData?.Id;
  console.log(selectedRecordId);
  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const handleSearch = (value: string) => {
    // You can perform any additional logic here
    setRecords(value);
  };

  return (
    <div>
      <Row className="row1">
        <Col lg={{ span: 7 }} sm={{ span: 24 }} className="columns">
          <Row className="col" align="middle">
            <Search onChange={(e) => handleSearch(e.target.value)} placeholder="Filter" />
          </Row>

          <Row className="row" style={{ fontSize: 14, fontWeight: '700' }}>
            <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
              {t('voucher_no')} <SortAscendingOutlined /> <SortDescendingOutlined />
            </Col>
            <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
              {t('v.date')} <SortAscendingOutlined /> <SortDescendingOutlined />
            </Col>
            <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
              {t('account')}
              <SortAscendingOutlined /> <SortDescendingOutlined />
            </Col>
            <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
              {t('amount')} <SortAscendingOutlined /> <SortDescendingOutlined />
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
              {voucherData?.map((card: TCashPaymentVoucherTable | any) => (
                <Col lg={24} sm={24} xs={24} md={24} key={card.Id}>
                  <Card className="singleCard" onClick={() => setSelectedCardData(card)}>
                    <Row justify={'space-between'} style={{ marginTop: '-3%' }}>
                      <p className="list-item1">
                        {card.VoucherCode} &nbsp; &nbsp; &nbsp;
                        {card.DocumentTypeCode}
                      </p>

                      <h3>{formateDate(card.VoucherDate)}</h3>
                    </Row>

                    <Row justify={'space-between'} style={{ marginTop: '5%' }}>
                      {/* <p className="list-item1">{card.AccountTitle}</p> */}
                      <h3>{card.AccountTitle}</h3>
                      {/* <h3>{formateDate(card.EntryDate)}</h3> */}
                      {/* </Row> */}
                      <p style={{ textAlign: 'center' }}>
                        <span
                          className="list-items2"
                          style={{
                            background: card.ApprovalStatus === 'Approved' ? 'green' : 'red',
                          }}
                        >
                          {card.ApprovalStatus === 'Approved' ? 'Approved' : 'Not Approved'}
                        </span>
                      </p>
                      {/* <h3>{card.AccountTitle}</h3>
                    <span
                      className="list-items2"
                      style={{
                        background: card.IsApproved ? '#f37daa' : 'red',
                      }}
                    >
                      {card.IsApproved ? 'Approved' : 'Not Approved'}
                    </span> */}
                      {/* <Row justify={'space-between'}> */}
                      {/* <p className="list-item1">{card.DocumentTypeCode}</p> */}

                      <h3 style={{ textAlign: 'right' }}>{numberFormatter(card.VoucherAmount)}</h3>
                    </Row>

                    <Row justify={'space-between'} style={{ marginTop: '2%' }}>
                      {/* <p className="list-item1">{card.DocumentTypeCode}</p> */}
                      <p style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#5551d5' }}>{card.Remarks}</p>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          <h3 style={{ textAlign: 'center' }}>
            {' '}
            {t('total_records')} {numberFormatter(totalRecords)}{' '}
          </h3>
        </Col>

        {selectedCardData && (
          <Col lg={{ span: 16 }} sm={{ span: 24 }} className="columns">
            <Buttons />
            <Row align="middle">
              <Col xs={23} sm={16} className="columns">
                <div className="main-voucher-design" id="Rice_Invoice_Main_Box">
                  <div className="row">
                    <div className="">
                      <div className="voucher_Account_title">
                        <div className="Account_title">{selectedCardData?.AccountTitle}</div>
                      </div>
                    </div>
                  </div>
                  <div className="Wrapper">
                    <div className="">
                      <div className="caption-value-wrape">
                        <div className="caption">Voucher Type:</div>
                        <div className="value">{selectedCardData?.DocumentTypeCode}</div>
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
                        {/* <div className="value">{selectedCardData?.PayTitle}</div> */}
                      </div>
                      <div className="caption-value-wrape">
                        <div className="caption">Cheque Number:</div>
                        {/* <div className="value">{selectedCardData?.ChequeNo}</div> */}
                      </div>
                      <div className="caption-value-wrape">
                        <div className="caption">Cheque Date:</div>
                        <div className="value">
                          {/* {selectedCardData ? dayjs(selectedCardData.ChequeDate).format('YYYY-MM-DD') : ''} */}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'center', margin: '0px 10px' }}>
                      <div className="Caption">Entery User</div>
                      <div>
                        {/* <img className="Img" src={selectedCardData?.EntryUserProfileImageUrl} alt=""></img> */}
                      </div>
                      <div className="caption-value-wrape">
                        <div className="caption">Total Amount:</div>
                        <div className="value">
                          {selectedCardData?.VoucherAmount > 0 ? numberFormatter(selectedCardData?.VoucherAmount) : 0}
                        </div>
                      </div>
                      <div
                        id="EntryUser"
                        className="Value"
                        onMouseEnter={() => handleMouseEnter()}
                        onMouseLeave={() => handleMouseLeave()}
                      >
                        <Badge text={selectedCardData.UserName}></Badge>
                      </div>
                    </div>
                  </div>
                  <Tablefile selectedRecordId={selectedRecordId} />
                </div>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default CardView;
