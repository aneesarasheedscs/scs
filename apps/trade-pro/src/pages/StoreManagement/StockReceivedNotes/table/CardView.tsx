import { Card, Col, Row, Badge } from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined, HeartFilled } from '@ant-design/icons';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import Search from 'antd/es/input/Search';
import Buttons from './Buttons';
import { useTranslation } from 'react-i18next';
import Tablefile from './TableFile';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { useStockReceivedNotesHistory } from '../quries';
import { TStockReceivedNoteHistory } from '../types';

const CardView: React.FC<{ setActiveTab: (tab: string) => void; setSelectedRecordId: (id: number | null) => void }> = ({
  setActiveTab,
  setSelectedRecordId,
}) => {
  const { t } = useTranslation();
  const { data, isError, isLoading, refetch, isFetching } = useStockReceivedNotesHistory();
  const historyData = data?.data?.Data?.Result;
  const logoImageBytes = data?.data?.Data?.Result?.[0]?.CompLogoImage;

  // Convert Uint8Array to a regular array of numbers
  const byteArray = Array.from(new Uint8Array(logoImageBytes));

  // Convert the array to a base64-encoded string
  const base64String = btoa(String.fromCharCode.apply(null, byteArray));

  // Assuming the image format is PNG, you can change it based on the actual format
  const dataUrl = `data:image/png;base64,${base64String}`;

  const [records, setRecords] = useState<TStockReceivedNoteHistory>();
  const [selectedCardData, setSelectedCardData] = useState<TStockReceivedNoteHistory>();
  console.log(selectedCardData);
  const totalRecords = data?.data?.Data?.Result.length || 0;
  const userDetail = storedUserDetail();
  const selectedRecordId = selectedCardData?.Id;
  console.log(selectedRecordId);

  const handleSearch = (value: any) => {
    setRecords(value);
  };

  return (
    <>
      <Row className="row1" style={{ border: '', width: '', height: '100%' }}>
        <Col lg={{ span: 8 }} xl={6} xxl={6} sm={{ span: 24 }} className="columns">
          <Row className="col" align="middle">
            <Search onChange={(e) => handleSearch(e.target.value)} placeholder="Filter" />
          </Row>

          <Row className="row" style={{ fontSize: 14, fontWeight: '700' }}>
            <Col lg={{ span: 5 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
              {t('doc_no')} <SortAscendingOutlined /> <SortDescendingOutlined />
            </Col>
            <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
              {t('doc_date')} <SortAscendingOutlined /> <SortDescendingOutlined />
            </Col>
            <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
              {t('rec_qty')}
              <SortAscendingOutlined /> <SortDescendingOutlined />
            </Col>
            <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
              {t('amount')} <SortAscendingOutlined /> <SortDescendingOutlined />
            </Col>
          </Row>
          <div style={{ backgroundColor: ' #d6d6e7', height: '52vh', overflowY: 'auto' }}>
            <Row
              gutter={[14, 14]}
              style={{
                borderRadius: '1%',
                width: '99%',
              }}
            >
              {historyData?.map((card: TStockReceivedNoteHistory | any) => (
                <Col span={24} key={card.Id}>
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
                          color: card.ApprovalStatus === 'Approved' ? 'green' : 'red',
                        }}
                      >
                        {card.ApprovalStatus === 'Approved' ? 'Approved' : 'Not Approved'}
                      </span>
                    </p>
                    <Row justify={'space-between'} style={{ marginBottom: '-2%' }}>
                      <p className="list-item1">
                        {card.TotalReceivedQty > 0 ? numberFormatter(card.TotalReceivedQty) : 0}{' '}
                      </p>
                      <h3>{card.TotalReceivedAmount > 0 ? numberFormatter(card.TotalReceivedAmount) : 0}</h3>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          <h3 style={{ textAlign: 'center' }}>
            {t('total_records')} {numberFormatter(totalRecords)}{' '}
          </h3>
        </Col>

        {selectedCardData && (
          <Col lg={{ span: 24 }} xl={18} xxl={18} sm={{ span: 24 }} className="columns">
            <Buttons
              setActiveTab={setActiveTab}
              selectedCardData={selectedCardData}
              setSelectedRecordId={setSelectedRecordId}
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
                            {/* <img className="Img" src={dataUrl} style={{ width: '6rem', height: '6rem' }}></img> */}
                            {/* <img
                              className="Img"
                              src={`data:image/png;base64,${logoimage}`}
                              style={{ width: '6rem', height: '6rem' }}
                              // alt="Company Logo"
                            /> */}
                            <img
                              className="Img"
                              src={dataUrl}
                              style={{ width: '6rem', height: '6rem' }}
                              // alt="Company Logo"
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

                  <div className="Wrapper">
                    <Col span={9} style={{ marginTop: '0.5%' }}>
                      <div className="">
                        <div className="caption-value-wrape">
                          <div className="caption">{t('doc_no')} #</div>
                          <div className="value">{selectedCardData?.DocNo}</div>
                        </div>
                        <div className="caption-value-wrape">
                          <div className="caption">{t('location_from')}:</div>
                          <div className="value">{selectedCardData?.DispatchedFrom}</div>
                        </div>

                        <div className="caption-value-wrape">
                          <div className="caption">{t('total_qty')}:</div>
                          <div className="value">
                            {selectedCardData?.TotalReceivedQty > 0
                              ? numberFormatter(selectedCardData?.TotalReceivedQty)
                              : 0}
                          </div>
                        </div>

                        <div className="caption-value-wrape">
                          <div className="caption">{t('remarks')}:</div>
                          <div className="value">
                            <div
                              style={{
                                marginLeft: '1.4rem',
                                textAlign: 'center',
                                width: '100%',
                              }}
                              className="value"
                            >
                              {selectedCardData?.RemarksHeader}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col span={5}></Col>
                    <Col span={8} style={{ marginTop: '0.5%' }}>
                      <div className="">
                        <div
                          style={{ display: 'flex', justifyContent: 'space-between' }}
                          className="caption-value-wrape"
                        >
                          <div className="caption">{t('doc_date')}:</div>
                          <div className="value">
                            {selectedCardData ? dayjs(selectedCardData.DocDate).format('YYYY-MM-DD') : ''}
                          </div>
                        </div>
                        <div
                          style={{ display: 'flex', justifyContent: 'space-between' }}
                          className="caption-value-wrape"
                        >
                          <div className="caption">{t('location_to')}:</div>
                          <div className="value">{selectedCardData?.DispactchedTo}</div>
                        </div>
                        <div
                          style={{ display: 'flex', justifyContent: 'space-between' }}
                          className="caption-value-wrape"
                        >
                          <div className="caption">{t('total_amount')}:</div>
                          <div className="value">
                            {selectedCardData?.TotalReceivedAmount > 0
                              ? numberFormatter(selectedCardData?.TotalReceivedAmount)
                              : 0}
                          </div>
                        </div>
                      </div>
                      <div className="caption-value-wrape">
                        <div className="caption">{t('request_status')}:</div>
                        <div className="value">{selectedCardData?.RequestStatus}</div>
                      </div>
                    </Col>
                  </div>

                  <Tablefile selectedRecordId={selectedRecordId} historyData={historyData} />
                </div>
              </Col>
            </Row>
          </Col>
        )}
        <Col xl={{ span: 18, offset: 6 }} md={24} sm={24} lg={24} xxl={{ span: 18, offset: 6 }}>
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
    </>
  );
};

export default CardView;
