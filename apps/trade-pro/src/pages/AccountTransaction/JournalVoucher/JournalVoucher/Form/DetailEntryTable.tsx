import { useAtom } from 'jotai';
import { addtableData } from './Atom';
import { TVoucherDetailList } from '../types';
import { useTranslation } from 'react-i18next';
import { Card, Col, FormInstance, Row, Space, Tooltip, theme } from 'antd';
import { AntButton } from '@tradePro/components';
import _, { map } from 'lodash';
import { DeleteOutlined, EditFilled } from '@ant-design/icons';

function DetailEntryTable({ form, setIsEditMode, setEdit }: TDetailEntryProps) {
  const { t } = useTranslation();
  const [tableData, setTableData] = useAtom(addtableData);
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const handleDeleteRow = (record: TVoucherDetailList, rowIndex: number) => {
    setTableData((prevData: any[]) => {
      const updatedData = prevData.filter(
        (item: any, index) =>
          (item.LineId !== record.LineId && item.LineId !== record.LineId - 1) ||
          (index !== rowIndex && index !== rowIndex - 1)
      );
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };
  const handleEditRow = (record: TVoucherDetailList, index: number) => {
    console.log(record);
    setEdit(record);
    setTableData((prevData: any[]) => {
      const editedRowIndex = prevData.findIndex((item: any) => item.LineId === record.LineId);

      if (editedRowIndex >= 0) {
        const currentRow = { ...prevData[editedRowIndex] };

        if (editedRowIndex > 0) {
          const aboveRow = { ...prevData[editedRowIndex - 1] };
          form.setFieldValue(['voucherDetailList', 0, 'AccountIdD'], aboveRow.AccountId);
          form.setFieldValue(['voucherDetailList', 0, 'AccountTitleD'], aboveRow.AccountTitle);
        } else {
          form.setFieldValue(['voucherDetailList', 0, 'AccountIdD'], '');
          form.setFieldValue(['voucherDetailList', 0, 'AccountTitleD'], '');
        }

        form.setFieldValue(['voucherDetailList', 0, 'AccountIdC'], currentRow.AccountId);
        form.setFieldValue(['voucherDetailList', 0, 'AccountTitleC'], currentRow.AccountTitle);
        form.setFieldValue(['voucherDetailList', 0, 'CheqNoDetail'], record.CheqNoDetail);
        form.setFieldValue(['voucherDetailList', 0, 'DebitAmount'], record.CreditAmount);
        form.setFieldValue(['voucherDetailList', 0, 'Comments'], record.Comments);
      }

      setIsEditMode(true);
      console.log('New tableData:', prevData);
      return prevData;
    });
  };
  const total_credit_amount = _.sumBy(tableData, 'CreditAmount');
  const total_debit_amount = _.sumBy(tableData, 'DebitAmount');

  return (
    <>
      {/* <Row gutter={[16, 16]} style={{ marginTop: 0 }}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
          <>
            <AntTable
              numberOfSkeletons={12}
              scroll={{ x: '', y: convertVhToPixels('20vh') }}
              data={tableData || []}
              columns={detailcolumns(t, handleDeleteRow, handleEditRow)}
            />
          </>
        </Col>
      </Row> */}
      <Row gutter={[16, 4]} style={{ maxHeight: '29vh', marginTop: -10, padding: 1 }}>
        <Col span={24}>
          <Card
            style={{ height: '26vh', boxShadow: '', overflowY: 'auto', border: `1px solid ${colorPrimary}` }}
            cover={
              <>
                <div style={{ maxHeight: '26vh' }}>
                  <div
                    style={{
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
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        paddingTop: 5,
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                    >
                      <Col xl={5} sm={9} xxl={5} lg={10} md={10}>
                        <h4 className="captions"> {t('account_title')} </h4>
                      </Col>
                      <Col xl={1} xxl={2} lg={0} md={0} sm={0}></Col>
                      <Col xl={2} xxl={2} lg={4} md={4} sm={4} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4 className="captions"> {t('cheque_no')} </h4>
                      </Col>
                      <Col
                        xl={3}
                        md={5}
                        xxl={3}
                        lg={5}
                        sm={5}
                        style={{
                          borderLeft: '1px solid grey',
                          paddingRight: 0,
                        }}
                      >
                        <h4 className="captions" style={{ textAlign: 'right', paddingRight: 5 }}>
                          {t('debit_amount')}
                        </h4>
                      </Col>
                      <Col
                        xl={3}
                        md={5}
                        xxl={3}
                        lg={4}
                        sm={5}
                        style={{
                          borderLeft: '1px solid grey',
                          paddingRight: 0,
                        }}
                      >
                        <h4 className="captions" style={{ textAlign: 'right', paddingRight: 5 }}>
                          {t('credit_amount')}
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
                        md={5}
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
                        <Col lg={10} xl={5} xxl={5} md={10} sm={10} xs={10} style={{ border: ' ', paddingLeft: 3 }}>
                          <p className="dataIndexes"> {item.AccountTitle} </p>
                        </Col>
                        <Col lg={0} xl={1} xxl={2} md={0} sm={0} xs={0} style={{ border: ' ', paddingLeft: 5 }}>
                          <p className="dataIndexes"> </p>
                        </Col>

                        <Col lg={4} xl={2} xxl={2} md={4} sm={4} xs={4} style={{ border: ' ', paddingLeft: 5 }}>
                          <p className="dataIndexes">{item.CheqNoDetail} </p>
                        </Col>

                        <Col lg={5} xl={3} xxl={3} md={5} sm={5} xs={5} style={{ border: ' ', paddingRight: 5 }}>
                          <p className="dataIndexes" style={{ textAlign: 'right', paddingRight: 5 }}>
                            {item.DebitAmount}
                          </p>
                        </Col>
                        <Col lg={4} xl={3} xxl={3} md={5} sm={5} xs={5} style={{ border: ' ', paddingRight: 5 }}>
                          <p className="dataIndexes" style={{ textAlign: 'right', paddingRight: 5 }}>
                            {item.CreditAmount}
                          </p>
                        </Col>

                        <Col lg={10} xl={8} xxl={8} md={10} sm={10} xs={10} style={{ border: ' ', paddingLeft: 5 }}>
                          <p className="dataIndexes">{item.Comments} </p>
                        </Col>
                        <Col xl={1} xxl={1} md={5} lg={5} sm={5} xs={5} style={{ border: ' ', paddingLeft: 0 }}>
                          {index % 2 !== 0 ? (
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
                          ) : (
                            ''
                          )}
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
            <Col lg={10} xl={5} xxl={5} md={10} sm={10} xs={10} style={{ border: ' ', paddingLeft: 3 }}>
              <p className="dataIndexes"> </p>
            </Col>
            <Col lg={0} xl={1} xxl={2} md={0} sm={0} xs={0} style={{ border: ' ', paddingLeft: 5 }}>
              <p className="dataIndexes"> </p>
            </Col>

            <Col lg={4} xl={2} xxl={2} md={4} sm={4} xs={4} style={{ border: ' ', paddingLeft: 5 }}>
              <p className="dataIndexes"> </p>
            </Col>

            <Col lg={5} xl={3} xxl={3} md={5} sm={5} xs={5} style={{ border: ' ', paddingRight: 3 }}>
              <p className="dataIndexes" style={{ textAlign: 'right', paddingRight: 5 }}>
                {total_debit_amount}
              </p>
            </Col>
            <Col lg={4} xl={3} xxl={3} md={5} sm={5} xs={5} style={{ border: ' ', paddingRight: 3 }}>
              <p className="dataIndexes" style={{ textAlign: 'right', paddingRight: 5 }}>
                {total_credit_amount}
              </p>
            </Col>

            <Col lg={10} xl={8} xxl={8} md={10} sm={10} xs={10} style={{ border: ' ', paddingLeft: 5 }}>
              <p className="dataIndexes"> </p>
            </Col>
            <Col xl={1} xxl={1} md={5} lg={5} sm={5} xs={5} style={{ border: ' ', paddingLeft: 0 }}></Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

interface TDetailEntryProps {
  form: FormInstance;
  setIsEditMode: (id: boolean) => void;
  setEdit: (record: TVoucherDetailList) => void;
}

export default DetailEntryTable;
