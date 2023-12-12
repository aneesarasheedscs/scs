import { Card, Col, Row, Badge } from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined, HeartFilled } from '@ant-design/icons';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import Search from 'antd/es/input/Search';
import Buttons from './Buttons';
import { useTranslation } from 'react-i18next';
import { useGetBankPaymentVoucherTable } from '../queries/queries';
import { TBankPaymentVoucherTable } from './types';
import Tablefile from './DetailTableFile';
import { storedUserDetail } from '@tradePro/utils/storageService';
const CardView: React.FC<{}> = () => {
  const { t } = useTranslation();
  const { data, isError, isLoading } = useGetBankPaymentVoucherTable();

  const voucherBankData = data?.data?.Data?.Result;
  console.log(data?.data?.Data?.Result);

  const [records, setRecords] = useState<TBankPaymentVoucherTable[]>([]);

  const [selectedCardData, setSelectedCardData] = useState<TBankPaymentVoucherTable>();
  console.log(selectedCardData);

  const totalRecords = data?.data?.Data?.Result.length || 0;
  const userDetail = storedUserDetail();

  const [TooltipVisible, setTooltipVisible] = useState(false);
  const selectedRecordId = selectedCardData?.Id;
  console.log(selectedRecordId);

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const handleSearch = (value: any) => {
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
              {voucherBankData?.map((card: TBankPaymentVoucherTable | any) => (
                <Col span={24} key={card.Id}>
                  <Card className="singleCard" onClick={() => setSelectedCardData(card)}>
                    <Row justify={'space-between'} style={{ marginTop: '-3%' }}>
                      <p className="list-item1">
                        {card.VoucherCode} &nbsp; &nbsp; &nbsp;
                        {card.DocumentTypeCode}
                      </p>

                      <h3>{formateDate(card.VoucherDate)}</h3>
                    </Row>

                    <Row justify={'space-between'} style={{ marginTop: '5%' }}>
                      <h3>{card.AccountTitle}</h3>

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

                      <h3 style={{ textAlign: 'right' }}>{numberFormatter(card.VoucherAmount)}</h3>
                    </Row>

                    <Row justify={'space-between'} style={{ marginTop: '2%' }}>
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
              <Col xs={16} sm={16} className="columns">
                <div className="main-voucher-design" id="Rice_Invoice_Main_Box">
                  <div className="row">
                    <div className="">
                      <div style={{ fontSize: '1.5rem', color: 'green', fontWeight: 'bold', textAlign: 'left' }}>
                        {userDetail?.CompanyName}
                      </div>
                      <div style={{ fontSize: '1.3rem', color: 'green', textAlign: 'left' }}>
                        {userDetail?.CompanyAddress}
                      </div>
                      <div style={{ fontSize: '1rem', color: 'green', textAlign: 'left' }}>{userDetail?.CellNo}</div>
                    </div>
                  </div>
                  <div className="Wrapper">
                    <div className="">
                      <div className="caption-value-wrape">
                        <div className="caption">{t('voucher_type')}</div>
                        <div className="value">{selectedCardData?.DocumentTypeCode}</div>
                      </div>
                      <div className="caption-value-wrape">
                        <div className="caption">{t('voucher_date')}</div>
                        <div className="value">
                          {selectedCardData ? dayjs(selectedCardData.VoucherDate).format('YYYY-MM-DD') : ''}
                        </div>
                      </div>

                      <div className="caption-value-wrape">
                        <div className="caption">{t('voucher_code')}</div>
                        <div className="value">{selectedCardData?.VoucherCode}</div>
                      </div>

                      <div className="caption-value-wrape">
                        <div className="caption">{t('total_amount')}</div>
                        <div className="value">
                          {selectedCardData?.VoucherAmount > 0 ? numberFormatter(selectedCardData?.VoucherAmount) : 0}
                        </div>
                      </div>

                      <div className="caption-value-wrape">
                        <div className="caption">{t('remarks')}</div>
                        <div className="value">
                          <div className="value">{selectedCardData?.Remarks}</div>
                        </div>
                      </div>
                    </div>
                    {/* </Col> */}

                    <div className="">
                      <div className="caption-value-wrape">
                        <div className="voucher_Account_title">
                          <div className="Account_title">{selectedCardData?.AccountTitle}</div>
                        </div>
                      </div>
                      <div style={{ color: 'red', textAlign: 'center' }}>Customer Address</div>
                      <div style={{ color: 'red', textAlign: 'center' }}>Naration</div>
                    </div>

                    <div className="">
                      <div className="caption-value-wrape">
                        <div className="caption">{t('payee_title')}</div>
                        <div className="value">{selectedCardData?.PayeeTitle}</div>
                      </div>
                      <div className="caption-value-wrape">
                        <div className="caption">{t('cheque_no')}</div>
                        <div className="value">{selectedCardData?.CheqNo}</div>
                      </div>
                      <div className="caption-value-wrape">
                        <div className="caption">{t('cheque_date')}</div>
                        <div className="value">
                          {selectedCardData ? dayjs(selectedCardData.ChequeDate).format('YYYY-MM-DD') : ''}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Tablefile selectedRecordId={selectedRecordId} />
                </div>
              </Col>
            </Row>
          </Col>
        )}
        <Col xl={{ span: 17, offset: 7 }} span={24}>
          <div className="Footer">
            <div className="Thanks">
              {t('thank_you')}{' '}
              <span className="heart-icon">
                {' '}
                <HeartFilled />{' '}
              </span>
            </div>
            <div className="powered-by">
              {t('powered_by')}{' '}
              <span>
                <a href="https://eccountbookapps.com/" className="Scss-Link" target="_blank">
                  {t('synergic_corporation_and_solution')}
                </a>
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CardView;
