import { Card, Col, Row } from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined, HeartFilled } from '@ant-design/icons';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import Search from 'antd/es/input/Search';
import { useTranslation } from 'react-i18next';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { useGetContraVoucherTable } from '../queries/queries';
import { TContraVoucherHistory } from './types';
import Buttons from './Buttons';
import Tablefile from './DetailTableFile';

const CardView: React.FC<{}> = () => {
  const { t } = useTranslation();
  const { data } = useGetContraVoucherTable();
  const voucherData = data?.data?.Data?.Result;
  console.log(data?.data?.Data?.Result);
  const [records, setRecords] = useState<TContraVoucherHistory>();
  const [selectedCardData, setSelectedCardData] = useState<TContraVoucherHistory>();
  console.log(selectedCardData);
  const totalRecords = data?.data?.Data?.Result.length || 0;
  const userDetail = storedUserDetail();
  const selectedRecordId = selectedCardData?.Id;
  console.log(selectedRecordId);
  console.log(voucherData?.data?.Data?.Result?.[0]?.CompLogoImage);
  console.log('data', selectedCardData?.CompLogoImage);
  const handleSearch = (value: any) => {
    setRecords(value);
  };

  return (
    <div>
      <Row className="row1">
        <Col lg={{ span: 6 }} sm={{ span: 24 }} className="columns">
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
              {voucherData?.map((card: TContraVoucherHistory | any) => (
                <Col span={24} key={card.Id}>
                  <Card className="singleCard" onClick={() => setSelectedCardData(card)}>
                    <Row justify={'space-between'} style={{ marginTop: '-3%' }}>
                      <p className="list-item1">
                        {card.VoucherCode} &nbsp; &nbsp;
                        {card.DocumentTypeCode}
                      </p>

                      <h3>{formateDate(card.VoucherDate)}</h3>
                    </Row>

                    <Row justify={'space-between'} style={{ marginTop: '3%' }}>
                      <h3 style={{ width: '5.5rem' }}>{card.AccountTitle}</h3>
                      <p style={{ textAlign: 'center', marginTop: '6%' }}>
                        <span
                          className="list-items2"
                          style={{
                            color: card.ApprovalStatus === 'Approved' ? 'green' : 'red',
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
          <Col lg={{ span: 18 }} sm={{ span: 24 }} className="columns">
            <Buttons />
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
                            <img
                              className="Img"
                              // src={voucherData?.data?.Data?.Result?.[0]?.CompLogoImage}
                              src={selectedCardData?.CompLogoImage}
                              style={{ width: '6rem', height: '6rem' }}
                            ></img>
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
                            <div style={{ fontSize: '1.5rem', color: 'green', textAlign: 'left' }}>
                              {userDetail?.CompanyName}
                            </div>
                            <div style={{ fontSize: '1.1rem', color: 'green', textAlign: 'left' }}>
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

                  <div className="Wrapper" style={{ marginTop: '1.5%' }}>
                    <Col span={7}>
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
                            <div
                              style={{
                                marginLeft: '1.4rem',
                                textAlign: 'center',
                                width: '100%',
                              }}
                              className="value remarks-heading"
                            >
                              {selectedCardData?.Remarks}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col span={10} style={{ marginTop: '-1%' }}>
                      <div className="">
                        <div className="caption-value-wrape">
                          <div className="voucher_Account_title">
                            <div className="Account_title">{selectedCardData?.AccountTitle}</div>
                          </div>
                        </div>
                        <div style={{ color: 'green', textAlign: 'center' }}>{selectedCardData?.CustomerAddress}</div>
                      </div>
                    </Col>
                    <Col span={7}>
                      <div className="">
                        <div
                          style={{ display: 'flex', justifyContent: 'space-between' }}
                          className="caption-value-wrape"
                        >
                          <div className="caption">{t('payee_title')}</div>
                          <div className="value">{selectedCardData?.PayTitle}</div>
                        </div>
                        <div
                          style={{ display: 'flex', justifyContent: 'space-between' }}
                          className="caption-value-wrape"
                        >
                          <div className="caption">{t('cheque_no')}</div>
                          <div className="value">{selectedCardData?.CheqNo}</div>
                        </div>
                        <div
                          style={{ display: 'flex', justifyContent: 'space-between' }}
                          className="caption-value-wrape"
                        >
                          <div className="caption">{t('cheque_date')}</div>
                          <div className="value">
                            {selectedCardData ? dayjs(selectedCardData.ChequeDate).format('YYYY-MM-DD') : ''}
                          </div>
                        </div>
                      </div>
                    </Col>
                  </div>
                  <Tablefile selectedRecordId={selectedRecordId} />
                </div>
              </Col>
            </Row>
          </Col>
        )}
        <Col xl={{ span: 18, offset: 6 }} span={24}>
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
