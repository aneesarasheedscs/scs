import { AntButton, AntTablecopy } from '@tradePro/components';
import React from 'react';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { TAccountsPrematureReceiptsList } from '../types';
import { Card, Col, FormInstance, Row, Space, Tooltip } from 'antd';
import dayjs from 'dayjs';
import _, { map } from 'lodash';
import { formateDate } from '@tradePro/utils/formateDate';
import { EditFilled, DeleteOutlined } from '@ant-design/icons';

function EntryTable({ form, tableData, setTableData }: Props) {
  const { t } = useTranslation();

  const handleDeleteRow = (record: TAccountsPrematureReceiptsList, recordIndex: number) => {
    console.log(record);
    setTableData((prevData: TAccountsPrematureReceiptsList[]) => {
      // const updatedData = prevData.filter((item: any) => item.ChequeNo !== record.ChequeNo);
      const updatedData = prevData.filter((item: any, index: number) => index !== recordIndex);
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };
  // const totalAmounts = tableData?.map((item) => item.Amount);

  const totalAmount = _.sumBy(tableData, 'Amount');
  console.log(totalAmount);
  const handleEditRow = (record: TAccountsPrematureReceiptsList) => {
    // setEdit(record);
    setTableData((prevData: any[]) => {
      const updatedData = [...prevData];
      const rowIndex = updatedData.findIndex((item: any) => item.ChequeNo === record.ChequeNo);

      if (rowIndex !== -1) {
        updatedData[rowIndex] = {
          ...updatedData[rowIndex],

          ChequeDate: dayjs(record.ChequeDate),
        };
        form.setFieldsValue(updatedData[rowIndex]);
        // setIsEditMode(true);
      }
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };
  return (
    <>
      <Row style={{ maxHeight: '29vh', marginBottom: 10 }}>
        <Col span={24}>
          <Card
            style={{ height: '26vh', boxShadow: '2px 2px 12px 2px lightgrey' }}
            cover={
              <>
                <div style={{ maxHeight: '26vh', overflowY: 'auto' }}>
                  <div
                    style={{
                      backgroundColor: '#85C1E9',
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      gridTemplateColumns: 'repeat(12, 1fr)', // Adjust based on the number of columns
                      position: 'sticky',
                      top: 0,
                      zIndex: 1,
                      paddingTop: 0,
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    <Row
                      justify={'space-between'}
                      style={{
                        position: 'sticky',
                        top: 0,
                        left: 0,
                        zIndex: 1,
                        backgroundColor: '#85C1E9',
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        paddingTop: 5,
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                    >
                      <Col xl={1} xxl={1} style={{ border: '' }}>
                        <h4 className="captions"> {t('doc_no')} </h4>
                      </Col>
                      <Col xl={2} sm={3} xxl={2} lg={3} md={3} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4 className="captions"> {t('doc_date')} </h4>
                      </Col>
                      <Col
                        xl={1}
                        xxl={1}
                        lg={3}
                        md={3}
                        sm={3}
                        style={{ borderLeft: '1px solid grey', paddingLeft: 3, marginLeft: -30 }}
                      >
                        <h4 className="captions"> {t('tracking_slip')} </h4>
                      </Col>
                      <Col xl={1} md={4} xxl={1} lg={4} sm={4} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4 className="captions"> {t('voucher_type')} </h4>
                      </Col>
                      <Col
                        xl={2}
                        xxl={2}
                        lg={4}
                        md={4}
                        sm={4}
                        style={{ borderLeft: '1px solid grey', marginLeft: -10, paddingRight: 3 }}
                      >
                        <h4 className="captions" style={{ textAlign: 'right', width: '85%' }}>
                          {t('slip_amount')}
                        </h4>
                      </Col>

                      <Col
                        xl={2}
                        xxl={2}
                        lg={3}
                        md={4}
                        sm={4}
                        style={{ borderLeft: '1px solid grey', marginLeft: -25, paddingLeft: 3 }}
                      >
                        <h4 className="captions"> {t('bank_name')} </h4>
                      </Col>

                      <Col xl={2} xxl={2} lg={5} md={4} sm={4} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4 className="captions"> {t('representative_account')} </h4>
                      </Col>
                      <Col xl={2} xxl={2} lg={4} md={4} sm={4} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4 className="captions"> {t('sender_account')} </h4>
                      </Col>
                      <Col xl={2} xxl={2} lg={4} md={4} sm={4} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4 className="captions"> {t('receiver_account')} </h4>
                      </Col>
                      <Col lg={3} xl={2} xxl={2} md={3} sm={3} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4 className="captions"> {t('cheque_no')} </h4>
                      </Col>
                      <Col
                        xl={1}
                        xxl={1}
                        lg={2}
                        md={2}
                        sm={2}
                        style={{ borderLeft: '1px solid grey', paddingLeft: 3, paddingRight: 3, marginLeft: -30 }}
                      >
                        <h4 className="captions" style={{ textAlign: 'right' }}>
                          {t('amount')}
                        </h4>
                      </Col>
                      <Col lg={2} xl={2} xxl={2} md={2} sm={2} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4 className="captions"> {t('status')} </h4>
                      </Col>
                      <Col lg={4} xl={2} xxl={3} md={4} sm={4} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4 className="captions">{t('remarks')} </h4>
                      </Col>
                      <Col xl={1} xxl={1} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4 className="captions"> {t('action')} </h4>
                      </Col>
                    </Row>
                  </div>
                  {map(tableData, (item, index) => (
                    <>
                      <Row
                        justify={'space-between'}
                        style={{
                          // padding: 5,
                          paddingLeft: 5,
                          paddingRight: 5,
                          paddingTop: 2,
                          borderBottom: '1px solid lightgrey',
                          backgroundColor: index % 2 !== 0 ? '#EBF5FB' : '',
                        }}
                      >
                        <Col lg={1} xl={1} xxl={1} sm={2} md={2} style={{ border: ' ', paddingLeft: 3 }}>
                          <p className="dataIndexes"> {item.DocNo} </p>
                        </Col>
                        <Col lg={4} xl={2} xxl={2} md={3} sm={3} style={{ border: ' ', paddingLeft: 5 }}>
                          <p className="dataIndexes"> {formateDate(item.DocDate)} </p>
                        </Col>
                        <Col
                          lg={3}
                          xl={1}
                          xxl={1}
                          md={3}
                          sm={3}
                          style={{ border: ' ', paddingLeft: 5, marginLeft: -20 }}
                        >
                          <p className="dataIndexes"> {item.TrackingSlipRef} </p>
                        </Col>

                        <Col lg={4} xl={1} xxl={1} md={4} sm={4} style={{ border: ' ', paddingLeft: 5 }}>
                          <p className="dataIndexes"> {item.VoucherType} </p>
                        </Col>
                        <Col
                          lg={4}
                          xl={2}
                          xxl={2}
                          md={4}
                          sm={4}
                          style={{ border: ' ', marginLeft: -10, paddingRight: 3 }}
                        >
                          <p className="dataIndexes" style={{ textAlign: 'right', width: '85%' }}>
                            {' '}
                            {item.SlipAmount}
                          </p>
                        </Col>
                        <Col
                          lg={4}
                          xl={2}
                          xxl={2}
                          md={4}
                          sm={4}
                          style={{ border: ' ', marginLeft: -25, paddingLeft: 5 }}
                        >
                          <p className="dataIndexes">{item.SenderBank} </p>
                        </Col>

                        <Col lg={5} xl={2} xxl={2} md={5} style={{ border: ' ', paddingLeft: 5 }}>
                          <p className="dataIndexes"> {item.RepresentativeAccount} </p>
                        </Col>
                        <Col lg={5} xl={2} xxl={2} md={5} style={{ border: ' ', paddingLeft: 5 }}>
                          <p className="dataIndexes"> {item.SenderAccount} </p>
                        </Col>
                        <Col lg={4} xl={2} xxl={2} md={4} sm={4} style={{ border: ' ', paddingLeft: 5 }}>
                          <p className="dataIndexes"> {item.ReceiverAccount} </p>
                        </Col>
                        <Col lg={3} xl={2} xxl={2} md={3} sm={3} style={{ border: ' ', paddingLeft: 5 }}>
                          <p className="dataIndexes">{item.ChequeNo} </p>
                        </Col>
                        <Col
                          lg={2}
                          xl={1}
                          xxl={1}
                          md={2}
                          sm={2}
                          style={{ paddingLeft: 3, paddingRight: 3, marginLeft: -30 }}
                        >
                          <p className="dataIndexes" style={{ textAlign: 'right' }}>
                            {item.Amount}{' '}
                          </p>
                        </Col>
                        <Col lg={2} xl={2} xxl={2} sm={2} md={2} style={{ border: ' ', paddingLeft: 3 }}>
                          <p className="dataIndexes">{item.EntryStatus} </p>
                        </Col>
                        <Col lg={4} xl={2} xxl={3} sm={4} md={4} style={{ border: ' ', paddingLeft: 3 }}>
                          <p className="dataIndexes">{item.RemarksHeader} </p>
                        </Col>
                        <Col xl={1} xxl={1} style={{ border: ' ', paddingLeft: 3 }}>
                          <Row>
                            <Col span={10}>
                              <Tooltip title="Edit">
                                <Space style={{ border: '', paddingTop: 5, height: 20 }}>
                                  <AntButton
                                    type="text"
                                    icon={<EditFilled style={{ color: '#006640' }} />}
                                    onClick={() => handleEditRow(item)}
                                  />
                                </Space>
                              </Tooltip>
                            </Col>
                            <Col span={12}>
                              <Tooltip title="Delete">
                                <Space style={{ border: '', paddingTop: 5, height: 22 }}>
                                  <AntButton
                                    type="text"
                                    icon={<DeleteOutlined style={{ color: 'red' }} />}
                                    onClick={() => handleDeleteRow(item, index)}
                                  />
                                </Space>
                              </Tooltip>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </>
                  ))}
                  <Row
                    justify={'space-between'}
                    style={{
                      position: 'sticky',
                      bottom: 0,
                      zIndex: 1,
                      backgroundColor: '#eeee',
                    }}
                  >
                    <Col lg={1} xl={1} xxl={1} sm={2} md={2} style={{ border: ' ', paddingLeft: 3 }}>
                      <p className="dataIndexes"> </p>
                    </Col>
                    <Col lg={4} xl={2} xxl={2} md={3} sm={3} style={{ border: ' ', paddingLeft: 5 }}>
                      <p className="dataIndexes"> </p>
                    </Col>
                    <Col lg={3} xl={1} xxl={1} md={3} sm={3} style={{ border: ' ', paddingLeft: 5, marginLeft: -20 }}>
                      <p className="dataIndexes"> </p>
                    </Col>

                    <Col lg={4} xl={1} xxl={1} md={4} sm={4} style={{ border: ' ', paddingLeft: 5 }}>
                      <p className="dataIndexes"> </p>
                    </Col>
                    <Col lg={4} xl={2} xxl={2} md={4} sm={4} style={{ border: ' ', marginLeft: -10, paddingRight: 3 }}>
                      <p className="dataIndexes" style={{ textAlign: 'right', width: '85%' }}></p>
                    </Col>
                    <Col lg={4} xl={2} xxl={2} md={4} sm={4} style={{ border: ' ', marginLeft: -25, paddingLeft: 5 }}>
                      <p className="dataIndexes"> </p>
                    </Col>

                    <Col lg={5} xl={2} xxl={2} md={5} style={{ border: ' ', paddingLeft: 5 }}>
                      <p className="dataIndexes"> </p>
                    </Col>
                    <Col lg={5} xl={2} xxl={2} md={5} style={{ border: ' ', paddingLeft: 5 }}>
                      <p className="dataIndexes"> </p>
                    </Col>
                    <Col lg={4} xl={2} xxl={2} md={4} sm={4} style={{ border: ' ', paddingLeft: 5 }}>
                      <p className="dataIndexes"> </p>
                    </Col>
                    <Col lg={3} xl={2} xxl={2} md={3} sm={3} style={{ border: ' ', paddingLeft: 5 }}>
                      <p className="dataIndexes"> </p>
                    </Col>
                    <Col
                      lg={2}
                      xl={1}
                      xxl={1}
                      md={2}
                      sm={2}
                      style={{ paddingLeft: 3, paddingRight: 3, marginLeft: -30 }}
                    >
                      <p className="dataIndexes" style={{ textAlign: 'right' }}>
                        {/* {totalAmount} */}
                        {totalAmount}
                      </p>
                    </Col>
                    <Col lg={2} xl={2} xxl={2} sm={2} md={2} style={{ border: ' ', paddingLeft: 3 }}>
                      <p className="dataIndexes"> </p>
                    </Col>
                    <Col lg={4} xl={2} xxl={3} sm={4} md={4} style={{ border: ' ', paddingLeft: 3 }}>
                      <p className="dataIndexes"> </p>
                    </Col>
                    <Col xl={1} xxl={1} style={{ border: ' ', paddingLeft: 3 }}></Col>
                  </Row>
                </div>
              </>
            }
          ></Card>
        </Col>
      </Row>
    </>
  );
}

export default EntryTable;
interface Props {
  form: FormInstance;
  tableData: TAccountsPrematureReceiptsList[] | any[];
  setTableData: (ary: TAccountsPrematureReceiptsList[] | any) => void;
}
