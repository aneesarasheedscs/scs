import { Card, Col, Row } from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined, HeartFilled } from '@ant-design/icons';
import '../style.scss';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { formateDate } from '@tradePro/utils/formateDate';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { useTranslation } from 'react-i18next';
import { storedUserDetail } from '@tradePro/utils/storageService';
import Buttons from './Buttons';
import { useGetPurchaseOrder } from '../queries';
import { TPurchaseOrderHistory } from '../type';
import Tablefile from './ModernHistoryTable';

const CardView: React.FC<{ setActiveTab: (tab: string) => void; setSelectedRecordId: (id: number) => void }> = ({
  setActiveTab,
  setSelectedRecordId,
}) => {
  const userDetail = storedUserDetail();
  const { data, isError, isLoading, refetch, isFetching } = useGetPurchaseOrder();
  const purchaseOrderHistory = data?.data?.Data?.Result;
  const logoImageBytes = data?.data?.Data?.Result?.[0]?.CompLogoImage;
  // Convert Uint8Array to a regular array of numbers
  const byteArray = Array.from(new Uint8Array(logoImageBytes));
  // Convert the array to a base64-encoded string
  const base64String = btoa(String.fromCharCode.apply(null, byteArray));
  // Assuming the image format is PNG, you can change it based on the actual format
  const dataUrl = `data:image/png;base64,${base64String}`;
  const [records, setRecords] = useState<TPurchaseOrderHistory[]>([]);
  const [selectedCardData, setSelectedCardData] = useState<TPurchaseOrderHistory | any>();
  // const totalRecords = data?.data?.Data?.Result.length || 0;
  const { t } = useTranslation();
  useEffect(() => {
    setRecords(purchaseOrderHistory);
  }, [purchaseOrderHistory]);
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
      return a.OrderNo > b.OrderNo ? comparison : -comparison;
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
      return a.OrderDate > b.OrderDate ? comparison : -comparison;
    });

    setRecords(sortedRecords);
  };

  const selectedRecordId = selectedCardData?.Id;
  console.log(selectedRecordId);
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
      return a.OrderAmount > b.OrderAmount ? comparison : -comparison;
    });

    setRecords(sortedRecords);
  };

  const handleSearch = (value: any) => {
    console.log(value);
    const trimmedValue = value.trim();
    const filteredRecords = purchaseOrderHistory?.filter((record: TPurchaseOrderHistory) => {
      return record.EntryUser.toLowerCase().includes(trimmedValue.toLowerCase());
    });
    setRecords(filteredRecords || []);
    if (!filteredRecords || filteredRecords.length === 0) {
      setRecords([]);
      console.log('No matching records found');
    }
  };

  return (
    <>
      <div>
        <Row className="card_view_row" style={{ height: '100%', marginTop: '4%' }}>
          <Col lg={{ span: 8 }} xl={6} xxl={6} sm={{ span: 24 }} className="columns">
            <Row className="col" align="middle">
              <Search onChange={(e) => handleSearch(e.target.value)} placeholder="Filter" />
            </Row>
            <Row gutter={10} className="row" style={{ fontSize: 14, fontWeight: '700', padding: 4 }}>
              <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
                {t('doc_no')}# <SortAscendingOutlined onClick={() => handleSortDocNo()} />{' '}
                <SortDescendingOutlined onClick={() => handleSortDocNo()} />
              </Col>
              <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
                {t('doc_date')} <SortAscendingOutlined onClick={() => handleSortDocDate()} />{' '}
                <SortDescendingOutlined onClick={() => handleSortDocDate()} />
              </Col>
              <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
                {t('entry_user')}
                <SortAscendingOutlined onClick={() => handleSortEntryUser()} />{' '}
                <SortDescendingOutlined onClick={() => handleSortEntryUser()} />
              </Col>
              <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} className="column">
                {t('amount')} <SortAscendingOutlined onClick={() => handleSortAmount()} />{' '}
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
                {records?.map((card: TPurchaseOrderHistory | any) => (
                  <Col span={24} key={card.Id}>
                    <Card className="singleCard" onClick={() => setSelectedCardData(card)}>
                      <Row justify={'space-between'} style={{ marginTop: '-3%' }}>
                        <p className="list-item2">Doc# {card.OrderNo}</p>
                        <h3>{formateDate(card.OrderDate)}</h3>
                      </Row>
                      <Row justify={'space-between'}>
                        <p className="list-item1">{card.EntryUser}</p>
                        <h3>{formateDate(card.EntryDate)}</h3>
                      </Row>
                      <p style={{ textAlign: 'center', marginTop: '1.5%' }}>
                        <span
                          className="list-items2"
                          style={{
                            color: card.ApprovalStatus === 'Approved' ? 'green' : 'red',
                          }}
                        >
                          {card.ApprovalStatus === 'Approved' ? 'Approved' : 'Not Approved'}
                        </span>
                      </p>
                      <p style={{ textAlign: 'left', marginTop: '1%' }}>
                        <span
                          className="list-items2"
                          style={{
                            color: 'purple',
                          }}
                        >
                          {card.ItemName}
                        </span>
                      </p>
                      <Row justify={'space-between'} style={{ marginBottom: '-2%' }}>
                        <h3>{card.OrderQty > 0 ? numberFormatter(card.OrderQty) : 0} </h3>
                        <h3>{card.OrderAmount > 0 ? numberFormatter(card.OrderAmount) : 0}</h3>
                      </Row>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
            <h3 style={{ textAlign: 'center' }}>{/* {t('total_records')} {numberFormatter(totalRecords)} */}</h3>
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
                                // src={dataUrl}
                                src={'data:image/png;base64,' + selectedCardData?.CompLogoImage}
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
                      <Col xxl={9} xl={9} lg={9} md={9} sm={9} style={{ marginTop: '0.5%' }}>
                        <div className="">
                          <div className="caption-value-wrape">
                            <div className="caption">{t('doc_no')} #</div>
                            <div className="value">{selectedCardData?.OrderNo}</div>
                          </div>
                          <div className="caption-value-wrape">
                            <div className="caption">{t('due_days')}:</div>
                            <div className="value">{formateDate(selectedCardData?.DueDays)}</div>
                          </div>

                          <div className="caption-value-wrape">
                            <div className="caption">{t('delivery_days')}:</div>
                            <div className="value">{selectedCardData?.DeliveryDays}</div>
                          </div>

                          <div className="caption-value-wrape">
                            <div className="caption">{t('supplier_ref_no')}:</div>
                            <div className="value">
                              <div
                                style={{
                                  marginLeft: '1.4rem',
                                  textAlign: 'center',
                                  width: '100%',
                                }}
                                className="value"
                              >
                                {/* {selectedCardData?.RemarksHeader} */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col xxl={8} xl={8} lg={8} md={8} sm={8}>
                        <div className="">
                          <div className="caption-value-wrape">
                            <div className="caption">{t('doc_date')}:</div>
                            <div className="value">{formateDate(selectedCardData?.OrderDate)}</div>
                          </div>
                          <div className="caption-value-wrape">
                            <div className="caption">{t('due_date')}:</div>
                            <div className="value">{formateDate(selectedCardData?.DueDate)}</div>
                          </div>

                          <div className="caption-value-wrape">
                            <div className="caption">{t('payment_terms')}:</div>
                            <div className="value">{selectedCardData?.PaymentTerm}</div>
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
                                {selectedCardData?.Remarks}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col xxl={10} xl={9} lg={9} md={9} sm={10} style={{ marginTop: '0.5%' }}>
                        <div className="">
                          <div
                            style={{ display: 'flex', justifyContent: 'space-between' }}
                            className="caption-value-wrape"
                          >
                            <div className="caption">{t('supplier_name')}:</div>
                            <div className="value">{selectedCardData?.SupplierName}</div>
                          </div>
                          <div
                            style={{ display: 'flex', justifyContent: 'space-between' }}
                            className="caption-value-wrape"
                          >
                            <div className="caption">{t('delivery_start_date')}:</div>
                            <div className="value">{formateDate(selectedCardData?.DeliveryStartDate)}</div>
                          </div>
                          <div
                            style={{ display: 'flex', justifyContent: 'space-between' }}
                            className="caption-value-wrape"
                          >
                            <div className="caption">{t('delivery_term')}:</div>
                            <div className="value">{selectedCardData?.DeliveryTerm}</div>
                          </div>
                        </div>
                      </Col>
                    </div>

                    <Tablefile selectedRecordId={selectedRecordId} purchaseOrderHistory={purchaseOrderHistory} />
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
    </>
  );
};

export default CardView;
