import { AntButton, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { Card, Col, FormInstance, Row, Form, theme } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { map, size } from 'lodash';
import { useTranslation } from 'react-i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { detailGridColumn } from '../../table/columns';
// import { fetchAccountBalance, useGetContraCreditAccountSelect, useGetContraJobLotSelect } from '../queries/queries'

const { useWatch } = Form;

const Transportation = ({ form }: TDynamicForm) => {
  // const [debitAccountId, setDebitAccountId] = useState(null);
  // const [debitAccountBalance, setDebitAccountBalance] = useState(0);
  const { t } = useTranslation();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const formValues = useWatch<any[]>('transportationDetailList', form);
  const initialValues = {
    AccountTypeId: null,
    JobLotId: null,
    DebitAmount: null,
    Remarks: null,
  };
  // const { data: filter } = useGetContraCreditAccountSelect();

  // const handleItemChange = (obj: TContraDetailEntry, index: number) => {
  //   setFields([
  //     { name: ['contraVoucherDetailList', index, ' AccountTypeId'], value: obj?. AccountTypeId },
  //     { name: ['contraVoucherDetailList', index, 'JobLotId'], value: obj?. JobLotId },
  //     // { name: ['contraVoucherDetailList', index, ' DebitAmount'], value: obj?. DebitAmount },
  //     // { name: ['contraVoucherDetailList', index, 'Remarks'], value: obj?.Remarks },
  //   ]);

  //   const itemQty = getFieldValue(['purchaseOrderDetailList', index, 'AccountTypeId']);
  // }

  // For Debit Account
  // const handleDebitAccountChange = async (value: any) => {
  //   setDebitAccountId(value);

  //   // Fetch and update the debit account balance based on the selected account
  //   try {
  //     await fetchAccountBalance(value, 'debit', setDebitAccountBalance);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={{ span: 24 }} xl={{ span: 24 }}>
          <Card style={{ height: 'auto', marginTop: '1%', boxShadow: '2px 4px 12px 1px gray' }}>
            <h3>{t('transportation')}</h3>
            <br />

            <Form.List name="transportationDetailList" initialValue={[initialValues]}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <div key={field.key} className="form-list-container">
                      <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 23, offset: 0 }}
                        md={{ span: 11, offset: 0 }}
                        lg={{ span: 11, offset: 0 }}
                        xl={{ span: 9, offset: 0 }}
                        // style={{ marginBottom: '2%', marginTop: '1%' }}
                        className="formfield"
                      >
                        <AntInputNumber
                          bordered={false}
                          label={t('transporter')}
                          // formItemProps={{ ...field, name: [field.name, 'Remarks'] }}
                          // style={{ width: '102.5%' }}
                        />
                      </Col>

                      <Col
                        xs={{ span: 24, offset: 0 }}
                        sm={{ span: 23, offset: 0 }}
                        md={{ span: 11, offset: 1 }}
                        lg={{ span: 11, offset: 1 }}
                        xl={{ span: 9, offset: 1 }}
                        // style={{ marginBottom: '2%', marginTop: '1%' }}
                        className="formfield"
                      >
                        <AntInputNumber
                          bordered={false}
                          label={t('credit')}
                          // formItemProps={{ ...field, name: [field.name, 'Remarks'] }}
                          // style={{ width: '102.5%' }}
                        />
                      </Col>
                      <Col
                        xs={{ span: 10, offset: 6 }}
                        sm={{ span: 5, offset: 9 }}
                        md={{ span: 5, offset: 10 }}
                        lg={{ span: 5, offset: 10 }}
                        xl={{ span: 3, offset: 1 }}
                      >
                        <Row gutter={[16, 16]} style={{ marginTop: '15%' }}>
                          <Col>
                            <AntButton
                              type="text"
                              onClick={() => add()}
                              icon={<PlusOutlined className="dynamic-add-button" />}
                            />
                          </Col>
                          <Col>
                            <AntButton
                              type="text"
                              icon={<MinusCircleOutlined className="dynamic-delete-button" />}
                              onClick={() => {
                                if (size(fields) > 1) remove(field.name);
                              }}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
            <br />
          </Card>
        </Col>
      </Row>
      <br />

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h2 className="form-heading">{t('detail_grid')}</h2>
        </Col>
      </Row>

      <Row style={{ marginTop: '2%' }} gutter={[16, 16]}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left', marginTop: '-1.5%' }}>
            <AntTable
              //   isError={isError}
              numberOfSkeletons={8}
              //   isLoading={isLoading}
              scroll={{ x: '', y: convertVhToPixels('12vh') }}
              // style={{ width: 'auto', padding: '2%' }}
              //   data={data?.data?.Data?.Result}
              columns={detailGridColumn(
                t
                // setSelectedRecordId, setActiveTab
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

type TDynamicForm = { form: FormInstance };

export default Transportation;
