import { useAtom } from 'jotai';
import { TFunction } from 'i18next';
import { addtableData } from './Atom';
import { AntButton } from '@tradePro/components';
import { Card, Col, FormInstance, Row, Space, Tooltip, theme } from 'antd';
import { TCashPaymentDetailEntry } from './types';
import { DeleteOutlined, EditFilled } from '@ant-design/icons';
import _, { map } from 'lodash';

function DetailEntryTable({ form, t, setIsEditMode, setrowIndex }: TDetailEntryProps) {
  const [tableData, setTableData] = useAtom(addtableData);
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const total_amount = _.sumBy(tableData, 'DebitAmount');
  const handleDeleteRow = (record: TCashPaymentDetailEntry, rowIndex: number) => {
    setTableData((prevData: any[]) => {
      const updatedData = prevData.filter((item: any, index) => index !== rowIndex);
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };

  const handleEditRow = (record: TCashPaymentDetailEntry, index: number) => {
    console.log('Row Index: ', index);
    setrowIndex(index);

    form.setFieldValue(['voucherDetailList', 0], record); // Update form values
    setIsEditMode(true);
  };
  return (
    <>
      <Row gutter={[16, 0]} style={{ maxHeight: '26vh', marginBottom: 10, border: ' ' }}>
        <Col span={24}>
          <Card
            // style={{ height: '26vh', boxShadow: '2px 2px 12px 2px lightgrey' }}
            style={{ height: '26vh', boxShadow: '', overflowY: 'auto', border: `1px solid ${colorPrimary}` }}
            cover={
              <>
                <div style={{ maxHeight: '26vh' }}>
                  <div
                    style={{
                      // backgroundColor: '#85C1E9',
                      borderBottom: '1px solid grey',
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      gridTemplateColumns: 'repeat(12, 1fr)', // Adjust based on the number of columns
                      position: 'sticky',
                      top: 0,
                      zIndex: 1,
                      paddingTop: 0,
                      paddingBottom: 5,
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
                        // backgroundColor: '#85C1E9',
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        paddingTop: 5,
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                    >
                      <Col xl={3} xxl={3} lg={4} md={4} sm={5} style={{ border: '' }}>
                        <h4 className="captions"> {t('payment_type')} </h4>
                      </Col>
                      <Col
                        xl={5}
                        sm={7}
                        xxl={5}
                        lg={6}
                        md={6}
                        style={{
                          borderLeft: '1px solid grey',
                          paddingLeft: 3,
                        }}
                      >
                        <h4 className="captions"> {t('debit_account')} </h4>
                      </Col>
                      <Col
                        xl={1}
                        xxl={1}
                        lg={1}
                        md={1}
                        sm={0}
                        // style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}
                      ></Col>
                      <Col xl={2} xxl={2} lg={2} md={2} sm={3} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4 className="captions"> {t('job_lot')} </h4>
                      </Col>
                      <Col xl={1} md={1} xxl={1} lg={1} sm={0}></Col>
                      <Col
                        xl={3}
                        md={4}
                        xxl={2}
                        lg={4}
                        sm={5}
                        style={{
                          borderLeft: '1px solid grey',
                          paddingRight: 0,
                        }}
                      >
                        <h4 className="captions" style={{ textAlign: 'right' }}>
                          {t('debit_amount')}
                        </h4>
                      </Col>
                      <Col
                        xl={8}
                        xxl={8}
                        lg={10}
                        md={10}
                        sm={10}
                        style={{ borderLeft: '1px solid grey', marginLeft: 0, paddingLeft: 3 }}
                      >
                        <h4 className="captions" style={{}}>
                          {t('remarks')}
                        </h4>
                      </Col>

                      <Col
                        xl={1}
                        xxl={1}
                        lg={4}
                        md={4}
                        sm={5}
                        xs={5}
                        style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}
                      >
                        <h4 className="captions" style={{ textAlign: 'center' }}>
                          {' '}
                          {t('action')}{' '}
                        </h4>
                      </Col>
                    </Row>
                  </div>
                  {map(tableData, (item, index) => (
                    <>
                      <Row
                        justify={'space-between'}
                        style={{
                          paddingLeft: 5,
                          paddingRight: 5,
                          paddingTop: 2,
                          borderBottom: '1px solid lightgrey',
                          backgroundColor: index % 2 !== 0 ? '#EBF5FB' : '',
                        }}
                      >
                        <Col lg={5} xl={3} xxl={3} sm={6} xs={6} md={5} style={{ border: ' ', paddingLeft: 5 }}>
                          <p className="dataIndexes"> {item.PaymentType} </p>
                        </Col>
                        <Col lg={6} xl={5} xxl={5} md={6} sm={6} xs={6} style={{ border: ' ', paddingLeft: 3 }}>
                          <p className="dataIndexes"> {item.AccountTitle} </p>
                        </Col>
                        <Col lg={2} xl={1} xxl={1} md={2} sm={1} xs={1} style={{ border: ' ', paddingLeft: 5 }}>
                          <p className="dataIndexes"> </p>
                        </Col>

                        <Col lg={4} xl={3} xxl={2} md={4} sm={4} xs={4} style={{ border: ' ', paddingLeft: 5 }}>
                          <p className="dataIndexes">{item.JobLotDescription} </p>
                        </Col>
                        <Col lg={1} xl={1} xxl={1} md={1} sm={1} xs={1} style={{ border: ' ' }}>
                          <p className="dataIndexes"></p>
                        </Col>
                        <Col lg={3} xl={2} xxl={2} md={3} sm={3} xs={3} style={{ border: ' ', paddingRight: 5 }}>
                          <p className="dataIndexes" style={{ textAlign: 'right' }}>
                            {item.DebitAmount}
                          </p>
                        </Col>

                        <Col lg={8} xl={8} xxl={8} md={8} sm={8} xs={8} style={{ border: ' ', paddingLeft: 5 }}>
                          <p className="dataIndexes">{item.Comments} </p>
                        </Col>
                        <Col xl={1} xxl={1} md={4} lg={4} sm={4} xs={4} style={{ border: ' ', paddingLeft: 0 }}>
                          <Row gutter={[0, 0]} justify={'center'}>
                            <Col xxl={10} xl={10} lg={5} md={5}>
                              <Tooltip title="Edit">
                                <Space style={{ border: '', paddingTop: 5, height: 20 }}>
                                  <AntButton
                                    type="text"
                                    icon={<EditFilled style={{ color: '#006640' }} />}
                                    onClick={() => handleEditRow(item, index)}
                                  />
                                </Space>
                              </Tooltip>
                            </Col>
                            <Col xxl={10} xl={10} lg={6} md={6}>
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
                </div>
              </>
            }
          ></Card>
          <Row
            justify={'space-between'}
            style={{
              position: 'sticky',
              bottom: 0,
              zIndex: 2,
              backgroundColor: '#ffff',
              borderTop: '1px solid lightgrey',
              marginTop: -24,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              marginLeft: 2,
              marginRight: 2,
            }}
          >
            <Col lg={5} xl={3} xxl={3} sm={6} xs={6} md={5} style={{ border: ' ', paddingLeft: 3 }}>
              <p className="dataIndexes"> </p>
            </Col>
            <Col lg={6} xl={5} xxl={5} md={6} sm={6} xs={6} style={{ border: ' ', paddingLeft: 5 }}>
              <p className="dataIndexes"> </p>
            </Col>
            <Col lg={2} xl={1} xxl={1} md={2} sm={1} xs={1} style={{ border: ' ', paddingLeft: 5 }}>
              <p className="dataIndexes"> </p>
            </Col>

            <Col lg={4} xl={3} xxl={2} md={4} sm={4} xs={4} style={{ border: ' ', paddingLeft: 5 }}>
              <p className="dataIndexes"> </p>
            </Col>
            <Col lg={1} xl={1} xxl={1} md={1} sm={1} xs={1} style={{ border: ' ', paddingRight: 3 }}>
              <p className="dataIndexes"></p>
            </Col>
            <Col lg={3} xl={2} xxl={2} md={3} sm={3} xs={3} style={{ border: ' ', paddingLeft: 5 }}>
              <p className="dataIndexes" style={{ textAlign: 'right', paddingRight: 3 }}>
                {total_amount}
              </p>
            </Col>

            <Col lg={8} xl={8} xxl={8} md={8} sm={8} xs={8} style={{ border: ' ', paddingLeft: 5 }}>
              <p className="dataIndexes"> </p>
            </Col>
            <Col xl={1} xxl={1} md={4} lg={4} sm={4} xs={4} style={{ border: ' ', paddingLeft: 5 }}>
              <p className="dataIndexes"> </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default DetailEntryTable;
interface TDetailEntryProps {
  form: FormInstance;
  t: TFunction;
  setIsEditMode: (id: boolean) => void;
  setrowIndex: (id: number | null) => void;
}
