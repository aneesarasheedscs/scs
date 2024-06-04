import { Col, FormInstance, Modal, Row, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRightOutlined } from '@ant-design/icons';
import { AntButton } from '@scs/ui';
import _, { map } from 'lodash';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import PuchaseAnalyticsB from './puchaseAnalyticsDetail';
import ItemGroup from '../itemGroup/itemGroup';
import ItemGroupCriteria from '../itemGroup';

const { useToken } = theme;
interface PurchaseAnalyticsDetailProps {
  form: FormInstance;
  data: any;
  purchaseInvoice: any;
}
function PurchaseAnalyticA({ form, data, purchaseInvoice }: PurchaseAnalyticsDetailProps) {
  const { t } = useTranslation();

  const [IpcId, setIpcId] = useState<number | null>(null);
  const [
    SortNo, setSortNo] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [secondClose, setSecondClose] = useState(false);
  


  const handleClose = () => setOpen(false);
  const handleSecond = () => setSecondOpen(false);
  const handleOpen = () => setOpen(true);

const handleOpenItemGroup = (IpcId:number,SortNo: number) =>{
  setIpcId(IpcId);
  setSortNo(SortNo)
  setSecondOpen(true)
}

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const handleEvent = (IpcId: number) => {
    setIpcId(IpcId);
    setOpen(true);
  };

  const groupData = _.groupBy(data?.data?.Data?.Result, 'ParentCategory');

  console.log(groupData, 'gr');

  const [groupedData, setGroupedData] = useState<any>({});
  console.log(groupedData);

  useEffect(() => {
    const groupDatabyCategory = _.groupBy(data?.data?.Data?.Result, (item) => item.ParentCategory);
    setGroupedData(groupDatabyCategory);
  }, [data]);

  return (
    <div style={{ marginTop: 20 }}>
      <Row style={{ marginLeft: 5 }}>
        <Col xxl={24} lg={24}>
          <Row style={{ marginLeft: 1, marginBottom: 10 }} justify="space-between" gutter={[10, 10]}>
            {Object.keys(groupedData).map((category, index) => (
              <Col xxl={8} lg={8}>
                <Row justify={'space-between'}>
                  <Col xxl={24} lg={24}>
                    <Col>
                      <h3
                        style={{
                          background: colorPrimary,
                          borderTopRightRadius: 10,
                          borderTopLeftRadius: 10,
                          padding: 7,
                          color: 'white',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        {category}

                        <AntButton
                          onClick={() => handleEvent(groupedData[category][0].IpcId)}
                          icon={<ArrowRightOutlined />}
                        />
                      </h3>
                    </Col>
                    <Col>
                      <div style={{}}>
                        <Row
                          justify={'space-between'}
                          style={{
                            color: 'blue',
                            fontSize: '17px',
                            fontWeight: 'bold',
                            background: 'lightblue',
                          }}
                        >
                          <Col xxl={4} style={{ textAlign: 'center' }}>
                            {t('description')}
                          </Col>
                          <Col xxl={4}>
                            <p style={{ borderBottom: '1px solid grey', width: '200%' }}>{t('qty')}</p>
                          </Col>
                          <Col xxl={4}>
                            <p style={{ borderBottom: '1px solid grey', width: '267%' }}>{t('rate')}</p>
                          </Col>
                          <Col xxl={4}>{t('avg_rate')}</Col>
                        </Row>
                      </div>
                      <div>
                        <Row
                          justify={'space-between'}
                          style={{
                            color: 'blue',
                            fontSize: '17px',
                            fontWeight: 'bold',
                            borderBottom: '1px solid grey',
                            background: 'lightblue',
                          }}
                        >
                          <Col xxl={4}></Col>
                          <Col xxl={4}>{t('weight')} </Col>
                          <Col xxl={4}>{t('exp40kg')}</Col>
                          <Col xxl={4}>{t('')}</Col>
                        </Row>
                      </div>
                    </Col>
                    {groupedData[category].map((item: any, itemIndex: any) => (
                      <>
                        <Col>
                          <div>
                            <Row
                              justify={'space-between'}
                              // style={{ fontSize: '17px', fontWeight: 'bold', background: '	#E6E6FA' }}
                              style={{ fontSize: '17px', fontWeight: 'bold', background: '' }}
                            >
                              <Col xxl={5} style={{ textAlign: 'center' }}>
                              <a onClick={() => handleOpenItemGroup(item.IpcId, item.SortNo)} style={{ color: 'blue',}}><u>{item.Descriptions}</u></a>
                         
                              </Col>
                              <Col xxl={5}>
                                <p style={{ borderBottom: '1px solid grey', width: '189%' }}>
                                  {numberFormatter(item.Qty)}
                                </p>
                              </Col>
                              <Col xxl={5}>
                                <p style={{ borderBottom: '1px solid grey', width: '214%' }}>
                                  {numberFormatter(item.Rate)}
                                </p>
                              </Col>
                              <Col xxl={4}>{numberFormatter(item.AvgRate)}</Col>
                            </Row>
                          </div>
                          <div>
                            <Row
                              justify={'space-between'}
                              style={{ fontSize: '17px', fontWeight: 'bold', background:'' }}
                            >
                              <Col xxl={4}></Col>
                              <Col xxl={4}>{numberFormatter(item.NetWeight)}</Col>
                              <Col xxl={4}>{numberFormatter(item.Exp40Kg)}</Col>
                              <Col xxl={4}></Col>
                            </Row>
                          </div>
                        </Col>
                      </>
                    ))}
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* <Row style={{ marginLeft: 5 }} >
        <Col xxl={24}>
          <Row style={{ marginLeft: 1, marginBottom: 10 }} justify="space-between" gutter={[10, 10]}>
            {map(purchaseInvoice?.data?.Data?.Result, (item, index) => (
              <Col xxl={8}>
                <Row justify={'space-between'}>
                  <Col xxl={24}>
                    <Col>
                      <h3
                        style={{
                          background: colorPrimary,
                          borderTopRightRadius: 10,
                          borderTopLeftRadius: 10,
                          padding: 7,
                          color: 'white',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        {item.ItemName}

                      </h3>
                    </Col>

                    <div>
                      <Row
                        justify={'space-between'}
                        style={{ color: colorPrimary, fontSize: '17px', fontWeight: 'bold', background: 'lightblue' }}
                      >
                        <Col xxl={4} style={{ textAlign: 'center' }}>
                          Description
                        </Col>
                        <Col xxl={4}>
                          <p style={{ borderBottom: '1px solid grey', width: '200%' }}>Qty</p>
                        </Col>
                        <Col xxl={4}>
                          <p style={{ borderBottom: '1px solid grey', width: '350%' }}>Rate</p>
                        </Col>
                        <Col xxl={4}>Avg Rate</Col>
                        <Col xxl={4}>MinRate</Col>
                      </Row>
                    </div>
                    <div>
                      <Row
                        justify={'space-between'}
                        style={{
                          color: colorPrimary,
                          fontSize: '17px',
                          fontWeight: 'bold',
                          borderBottom: '1px solid grey',
                          background: 'lightblue',
                        }}
                      >
                        <Col xxl={4}></Col>
                        <Col xxl={4}>Weight</Col>
                        <Col xxl={4}>Exp/40kg</Col>
                        <Col xxl={4}>Exp+Amount</Col>
                        <Col xxl={4}>MaxRate</Col>
                      </Row>
                    </div>
                    <div>
                      <Row
                        justify={'space-between'}
                        style={{ fontSize: '17px', fontWeight: 'bold', background: '	#E6E6FA' }}
                      >
                        <Col xxl={4} style={{ color: colorPrimary, textAlign: 'center' }}>
                          {item.Descriptions}
                        </Col>
                        <Col xxl={4}>
                          <p style={{ borderBottom: '1px solid grey', width: '200%' }}>{numberFormatter(item.Qty)}</p>
                        </Col>
                        <Col xxl={4}>
                          <p style={{ borderBottom: '1px solid grey', width: '350%' }}>{numberFormatter(item.Rate)}</p>
                        </Col>
                        <Col xxl={4}>{numberFormatter(item.AvgRate)}</Col>
                        <Col xxl={4}>{numberFormatter(item.MinRate)}</Col>
                      </Row>
                    </div>
                    <div>
                      <Row
                        justify={'space-between'}
                        style={{ fontSize: '17px', fontWeight: 'bold', background: '	#E6E6FA' }}
                      >
                        <Col xxl={4}></Col>
                        <Col xxl={4}>{numberFormatter(item.NetWeight)}</Col>
                        <Col xxl={4}>{numberFormatter(item.Exp40Kg)}</Col>
                       
                        <Col xxl={4}></Col>
                        <Col xxl={4}>{numberFormatter(item.MaxRate)}</Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        </Col>
      </Row> */}

      <>
        <Modal
          open={open}
          onCancel={handleClose}
          footer={null}
          width={1700}
          bodyStyle={{
            maxHeight: '80vh',
            overflowY: 'auto',
            paddingRight: '15px',
            height: '80vh',
            marginRight: '20px',
          }}
        >
          <div style={{ maxHeight: '100%' }}>
            <PuchaseAnalyticsB purchaseInvoice={purchaseInvoice} data={data} IpcId={IpcId} />
          </div>
        </Modal>

        <Modal
          open={secondOpen}
          onCancel={handleSecond}
          footer={null}
          width={1700}
          bodyStyle={{
            maxHeight: '80vh',
            overflowY: 'auto',
            paddingRight: '15px',
            height: '80vh',
            marginRight: '20px',
          }}
        >
          <div style={{ maxHeight: '100%' }}>
            {/* <PuchaseAnalyticsB purchaseInvoice={purchaseInvoice} data={data} IpcId={IpcId} /> */}
            <ItemGroupCriteria IpcIds={IpcId} SortNo={SortNo}/>
           {/* <ItemGroup ItemGroupData={data} form={form} /> */}
       

           
          </div>
        </Modal>
      </>
    </div>
  );
}

export default PurchaseAnalyticA;
