import { AntButton, AntTablecopy } from '@tradePro/components';
import React from 'react';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { TAccountsPrematureReceiptsList } from '../types';
import { Card, Col, FormInstance, Row, Space, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { map } from 'lodash';
import { formateDate } from '@tradePro/utils/formateDate';
import { EditFilled, DeleteOutlined } from '@ant-design/icons';

function EntryTable({ form, tableData, setTableData }: Props) {
  const { t } = useTranslation();

  const handleDeleteRow = (record: TAccountsPrematureReceiptsList) => {
    console.log(record);
    setTableData((prevData: TAccountsPrematureReceiptsList[]) => {
      const updatedData = prevData.filter((item: any) => item.ChequeNo !== record.ChequeNo);
      console.log('New tableData:', updatedData);
      return updatedData;
    });
  };
  const handleEditRow = (record: TAccountsPrematureReceiptsList) => {
    // setEdit(record);
    setTableData((prevData: any[]) => {
      const updatedData = [...prevData];
      const rowIndex = updatedData.findIndex((item: any) => item.ChequeNo === record.ChequeNo);

      if (rowIndex !== -1) {
        updatedData[rowIndex] = {
          ...updatedData[rowIndex],
          // AccountIdDebit: record.AccountTitle,
          // JobLotId: record.JobLotDescription,
          // DebitAmount: record.DebitAmount,
          ChequeDate: dayjs(record.ChequeDate),
          // CheqNoDetail: record.CheqNoDetail,
          // PayeeTitle: record.PayeeTitle,
          // Comments: record.Comments,
        };
        // form.setFieldValue(['voucherDetailList', 0], updatedData[rowIndex]);
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
            style={{ height: '29vh', boxShadow: '2px 2px 12px 2px lightgrey' }}
            cover={
              <>
                <div style={{ maxHeight: '29vh', overflowY: 'auto' }}>
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
                      <Col xxl={1} style={{ border: '' }}>
                        <h4>Doc No</h4>
                      </Col>
                      <Col xxl={2} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4>Doc Date</h4>
                      </Col>
                      <Col xxl={2} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4> Tracking Slip </h4>
                      </Col>
                      <Col xxl={2} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4> Slip Amount </h4>
                      </Col>
                      <Col xxl={2} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4> Voucher Type </h4>
                      </Col>
                      <Col xxl={2} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4>Bank Name </h4>
                      </Col>

                      <Col xxl={3} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4> Representative A/c </h4>
                      </Col>
                      <Col xxl={3} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4> Sender Account </h4>
                      </Col>
                      <Col xxl={3} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4> Receiver Account </h4>
                      </Col>
                      <Col xxl={2} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4>Cheque No </h4>
                      </Col>
                      <Col xxl={2} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4>Action </h4>
                      </Col>
                      {/* <Col xxl={1} style={{ borderLeft: '1px solid grey' }}>
                      <h4>Status </h4>
                    </Col>
                    <Col xxl={3} style={{ border: '1px solid' }}>
                      <h4>Remarks </h4>
                    </Col>
                    <Col xxl={1} style={{ border: '1px solid' }}>
                      <h4>Action </h4>
                    </Col> */}
                    </Row>
                    <Row
                      justify={'space-between'}
                      style={{
                        backgroundColor: '#85C1E9',
                        paddingLeft: 5,
                        paddingRight: 5,
                        position: 'sticky',
                        top: 0,
                        left: 0,
                        zIndex: 1,
                      }}
                    >
                      <Col xxl={1} style={{ border: '' }}>
                        {/* <h4>Doc No</h4> */}
                      </Col>
                      <Col xxl={2} style={{ borderLeft: ' ' }}>
                        {/* <h4>Doc Date</h4> */}
                      </Col>
                      <Col xxl={2} style={{ borderLeft: '' }}>
                        {/* <h4> Tracking Slip </h4> */}
                      </Col>
                      <Col xxl={2} style={{ borderLeft: ' ' }}>
                        {/* <h4> Slip Amount </h4> */}
                      </Col>
                      <Col xxl={2} style={{ borderLeft: ' ' }}>
                        {/* <h4> Voucher Type </h4> */}
                      </Col>
                      <Col xxl={2} style={{ borderLeft: ' ' }}>
                        {/* <h4>Bank Name </h4> */}
                      </Col>

                      <Col xxl={3} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4> Amount </h4>
                      </Col>

                      <Col xxl={3} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4>Status </h4>
                      </Col>
                      <Col xxl={5} style={{ borderLeft: '1px solid grey', paddingLeft: 3 }}>
                        <h4>Remarks </h4>
                      </Col>
                      <Col xxl={2} style={{ borderLeft: ' ' }}>
                        {/* <h4> </h4> */}
                      </Col>
                    </Row>
                  </div>
                  {map(tableData, (item) => (
                    <>
                      <Row justify={'space-between'} style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5 }}>
                        <Col xxl={1} style={{ border: ' ', paddingLeft: 3 }}>
                          <p> {item.DocNo} </p>
                        </Col>
                        <Col xxl={2} style={{ border: ' ', paddingLeft: 3 }}>
                          <p> {formateDate(item.DocDate)} </p>
                        </Col>
                        <Col xxl={2} style={{ border: ' ', paddingLeft: 3 }}>
                          <p> {item.TrackingSlipRef} </p>
                        </Col>
                        <Col xxl={2} style={{ border: ' ', paddingLeft: 3 }}>
                          <p> {item.SlipAmount}</p>
                        </Col>
                        <Col xxl={2} style={{ border: ' ', paddingLeft: 5 }}>
                          <p> {item.VoucherType} </p>
                        </Col>
                        <Col xxl={2} style={{ border: ' ', paddingLeft: 3 }}>
                          <p>{item.SenderBank} </p>
                        </Col>

                        <Col xxl={3} style={{ border: ' ', paddingLeft: 3 }}>
                          <p> {item.RepresentativeAccount} </p>
                        </Col>
                        <Col xxl={3} style={{ border: ' ', paddingLeft: 3 }}>
                          <p> {item.SenderAccount} </p>
                        </Col>
                        <Col xxl={3} style={{ border: ' ', paddingLeft: 3 }}>
                          <p> {item.ReceiverAccount} </p>
                        </Col>
                        <Col xxl={2} style={{ border: ' ', paddingLeft: 3 }}>
                          <p>{item.ChequeNo} </p>
                        </Col>
                        <Col xxl={2} style={{ border: ' ', paddingLeft: 3 }}>
                          {/* <p>{item.Amount} </p> */}
                          <Tooltip title="Edit">
                            <Space style={{ border: '', paddingTop: 5, height: 20 }}>
                              <AntButton
                                type="text"
                                icon={<EditFilled style={{ color: '#006640' }} />}
                                onClick={() => handleEditRow(item)}
                              />
                            </Space>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <Space style={{ border: '', paddingTop: 5, height: 22 }}>
                              <AntButton
                                type="text"
                                icon={<DeleteOutlined style={{ color: 'red' }} />}
                                onClick={() => handleDeleteRow(item)}
                              />
                            </Space>
                          </Tooltip>
                        </Col>
                      </Row>
                      <Row
                        justify={'space-between'}
                        style={{ borderBottom: '1px solid lightgrey', paddingLeft: 5, paddingRight: 5 }}
                      >
                        <Col xxl={1} style={{ border: ' ' }}>
                          {/* <h4>Doc No</h4> */}
                        </Col>
                        <Col xxl={2} style={{ border: ' ' }}>
                          {/* <h4>Doc Date</h4> */}
                        </Col>
                        <Col xxl={2} style={{ border: ' ' }}>
                          {/* <h4> Tracking Slip </h4> */}
                        </Col>
                        <Col xxl={2} style={{ border: ' ' }}>
                          {/* <h4> Slip Amount </h4> */}
                        </Col>
                        <Col xxl={2} style={{ border: ' ' }}>
                          {/* <h4> Voucher Type </h4> */}
                        </Col>
                        <Col xxl={2} style={{ border: ' ' }}>
                          {/* <h4>Bank Name </h4> */}
                        </Col>

                        <Col xxl={3} style={{ border: ' ', paddingLeft: 3 }}>
                          <p> {item.Amount} </p>
                        </Col>

                        <Col xxl={3} style={{ border: ' ', paddingLeft: 3 }}>
                          <p>{item.EntryStatus} </p>
                        </Col>
                        <Col xxl={5} style={{ border: ' ', paddingLeft: 3 }}>
                          <p>{item.RemarksHeader} </p>
                        </Col>
                        <Col xxl={2} style={{ border: ' ' }}></Col>
                      </Row>
                    </>
                  ))}
                </div>
              </>
            }
          ></Card>
        </Col>
      </Row>

      {/* <AntTablecopy
        showDefaultTableGrid={true}
        data={tableData || []}
        columns={columns(t, handleDeleteRow, handleEditRow)}
        scroll={{ x: '', y: convertVhToPixels('20vh') }}
      /> */}
    </>
  );
}

export default EntryTable;
interface Props {
  form: FormInstance;
  tableData: TAccountsPrematureReceiptsList[];
  setTableData: (ary: TAccountsPrematureReceiptsList[] | any) => void;
}
