import { Card, Col, Image, Row } from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined, HeartFilled } from '@ant-design/icons';
import '../style.scss';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { useTranslation } from 'react-i18next';
import { storedUserDetail } from '@tradePro/utils/storageService';
import Tablefile from './DetailTablefile';
import Buttons from './Buttons';
import { TRequisitionOrderHistory } from '../types';
import { useRequisitionOrderHistory } from '../quries';

const CardView: React.FC<{ setActiveTab: (tab: string) => void; setSelectedRecordId: (id: number | null) => void }> = ({
  setActiveTab,
  setSelectedRecordId,
}) => {
  const userDetail = storedUserDetail();
  const { data, isError, isLoading, refetch, isFetching } = useRequisitionOrderHistory();
  const stockTransfer = data?.data?.Data?.Result;
  const logoImageBytes = data?.data?.Data?.Result?.[0]?.CompLogoImage;
  // Convert Uint8Array to a regular array of numbers
  const byteArray = Array.from(new Uint8Array(logoImageBytes));
  // Convert the array to a base64-encoded string
  const base64String = btoa(String.fromCharCode.apply(null, byteArray));
  // Assuming the image format is PNG, you can change it based on the actual format
  const dataUrl = `data:image/png;base64,${base64String}`;
  const [records, setRecords] = useState<TRequisitionOrderHistory[]>([]);
  const [selectedCardData, setSelectedCardData] = useState<TRequisitionOrderHistory>();
  const totalRecords = data?.data?.Data?.Result.length || 0;

  const { t } = useTranslation();
  useEffect(() => {
    setRecords(stockTransfer);
  }, [stockTransfer]);
  console.log('records', records);

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

  const selectedRecordId = selectedCardData?.Id;
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
      return a.IssuedAmount > b.IssuedAmount ? comparison : -comparison;
    });

    setRecords(sortedRecords);
  };

  const handleSearch = (value: any) => {
    console.log(value);
    const trimmedValue = value.trim();
    const filteredRecords = stockTransfer?.filter((record: TRequisitionOrderHistory) => {
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
      <Row className="row1" style={{ border: '', width: '', height: '100%' }}>
        <Col lg={{ span: 12 }} md={12} xl={6} xxl={6} sm={{ span: 24 }} className="columns">
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

          <div style={{ backgroundColor: ' #d6d6e7', height: '52vh', overflowY: 'auto' }}>
            <Row
              gutter={[14, 14]}
              style={{
                borderRadius: '1%',
                width: '99%',
              }}
            >
              {records?.map((card: TRequisitionOrderHistory | any) => (
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
                          color: card.IsApproved === 'Approved' ? 'green' : 'red',
                        }}
                      >
                        {card.IsApproved === 'Approved' ? 'Approved' : 'Not Approved'}
                      </span>
                    </p>
                    <Row justify={'space-between'} style={{ marginBottom: '-2%' }}>
                      <p className="list-item1">{card.IssuedQty > 0 ? numberFormatter(card.IssuedQty) : 0} </p>
                      <h3>{card.IssuedAmount > 0 ? numberFormatter(card.IssuedAmount) : 0}</h3>
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
                    <Row gutter={10}>
                      <Col
                        xs={{ span: 6 }}
                        sm={{ span: 5 }}
                        md={{ span: 4 }}
                        lg={{ span: 6 }}
                        xl={{ span: 4 }}
                        xxl={{ span: 2 }}
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
                        <div style={{ marginLeft: 10 }}>
                          <div className="">
                            <div style={{ fontSize: '1.5rem', color: 'green', fontWeight: 'bold', textAlign: 'left' }}>
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

                  <div className="Wrapper">
                    <Col xxl={9} xl={11} lg={9} md={9} sm={10} style={{ marginTop: '0.5%' }}>
                      <div className="">
                        <div className="caption-value-wrape">
                          <div className="caption">{t('doc_no')} #</div>
                          <div className="value">{selectedCardData?.DocNo}</div>
                        </div>
                        <div className="caption-value-wrape">
                          <div className="caption">{t('location_from')}:</div>
                          <div className="value">{selectedCardData?.LocationFrom}</div>
                        </div>

                        <div className="caption-value-wrape">
                          <div className="caption">{t('qty')}:</div>
                          <div className="value">
                            {selectedCardData?.IssuedQty > 0 ? numberFormatter(selectedCardData?.IssuedQty) : 0}
                          </div>
                        </div>

                        <div className="caption-value-wrape">
                          <div className="caption">{t('remarks')}:</div>
                          <div className="value">
                            <div className="value">{selectedCardData?.RemarksHeader}</div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xxl={7} xl={5} lg={8} md={7}>
                      <div className="">
                        <div className="caption-value-wrape">
                          <div className="voucher_Account_title">
                            <div className="Account_title">{selectedCardData?.EntryUser}</div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xxl={9} xl={10} lg={9} md={9} sm={10} style={{ marginTop: '0.5%' }}>
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
                          <div className="value">{selectedCardData?.LocationTo}</div>
                        </div>
                        <div
                          style={{ display: 'flex', justifyContent: 'space-between' }}
                          className="caption-value-wrape"
                        >
                          <div className="caption">{t('amount')}:</div>
                          <div className="value">
                            {selectedCardData?.IssuedAmount > 0 ? numberFormatter(selectedCardData?.IssuedAmount) : 0}
                          </div>
                        </div>
                      </div>
                      <div className="caption-value-wrape">
                        <div className="caption">{t('req_status')}:</div>
                        <div className="value">{selectedCardData?.RequestStatus}</div>
                      </div>
                    </Col>
                  </div>

                  <Tablefile selectedRecordId={selectedRecordId} stockTransfer={stockTransfer} />
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
    </div>
  );
};

export default CardView;
