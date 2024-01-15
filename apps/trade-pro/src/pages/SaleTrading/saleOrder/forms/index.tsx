import { useEffect } from 'react';
import DocNumber from './DocNumber';
import MainEntry from './MainEntry';
import { AntButton, AntDatePicker, AntTable } from '@tradePro/components';
import { Badge, Card, Checkbox, Col, Form, Input, Row } from 'antd';
import { useGetDocNumberSaleOrder } from '../queryOptions';
import { SyncOutlined, SaveOutlined, PaperClipOutlined, ReloadOutlined } from '@ant-design/icons';
import DynamicForm from './DetailEntry';
import { saleOrderFormcolumns } from '../table/columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { isNumber } from 'lodash';
import dayjs from 'dayjs';
import { useAddSaleOrder, useGetSaleOrder, useGetSaleOrderById, useUpdateSaleOrder } from '../queries';
import { TSaleOrder, TSaleOrderDetail } from '../type';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { tableDataList } from './Atom';
import SalesPersonalInfo from './SalesInfo';
import '../style.scss';

const { useForm } = Form;

function SaleOrderForm({ selectedRecordId }: TAddUpdatedRecod) {
  const { t } = useTranslation();
  const [form] = useForm<TSaleOrder>();
  const { data, isError, refetch, isLoading, isSuccess } = useGetDocNumberSaleOrder();
  const { data: add, refetch: addRefetch, isError: addisError, isLoading: addisLoading } = useGetSaleOrder();

  const {
    data: saleOrderData,
    refetch: refetchPurchase,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetSaleOrderById(selectedRecordId);

  const { mutate: addSaleOrderDetail } = useAddSaleOrder();
  const { mutate: updateSaleOrder } = useUpdateSaleOrder(selectedRecordId);
  const [tableData, setTableData] = useAtom(tableDataList);

  useEffect(() => {
    if (isSuccess) form.setFieldValue('DocNo', data?.data?.Data?.Result);
  }, [data, isSuccess]);
  const onFinish = (values: TSaleOrder) => {
    console.log(values);
    if (isNumber(selectedRecordId)) {
      values.SaleOrderDetailList = values.SaleOrderDetailList.map((detail) => ({
        ...detail,
        ActionTypeId: 2,
      }));
      updateSaleOrder(values);
    } else {
      values.SaleOrderDetailList = values.SaleOrderDetailList.map((detail) => ({
        ...detail,
        ActionTypeId: 1,
      }));
      addSaleOrderDetail(values);
    }
  };
  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetchPurchase();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldsValue(saleOrderData?.data?.Data?.Result);
      form.setFieldValue('DocDate', dayjs(saleOrderData?.data?.Data?.Result?.DocDate));
      form.setFieldValue('OrderDueDate', dayjs(saleOrderData?.data?.Data?.Result?.OrderDueDate));
    }
    form.setFieldValue('DocDate', dayjs());
  }, [isDataSuccess]);
  console.log(tableData);
  return (
    <>
      <Row>
        <Col>
          <Card>
            <Form form={form} layout="inline" onFinish={onFinish}>
              <Row gutter={10} align="middle" style={{ width: '100%' }}>
                <Col xl={12} style={{}}>
                  <Row gutter={[10, 10]} align="middle">
                    <Col style={{ fontSize: 18, fontWeight: 'bold' }}>Document No.</Col>
                    <Col>
                      <DocNumber
                        isError={isError}
                        refetch={refetch}
                        isLoading={isLoading}
                        data={data?.data?.Data?.Result}
                      />
                      <Form.Item name="DocNo" style={{ display: 'none' }}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <p className="docDate_Width">
                      <Col xs={20} xl={9} className="formfields" style={{ marginLeft: '2%' }}>
                        <AntDatePicker required name="DocDate" label="Document Date" placeholder="" bordered={false} />
                      </Col>
                    </p>
                  </Row>
                </Col>

                <Col xl={12}>
                  <Form.Item>
                    {/* <Row align="middle" gutter={[16, 16]} style={{display: "flex" , justifyContent: "end"}}> */}
                    {/* <Col xs={24} sm={24} md={24} lg={24} xl={3}>
                    <AntButton danger ghost htmlType="reset" label="Reset" icon={<SyncOutlined />} />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={5}>
                    <AntButton label="Save and add more" htmlType="submit" />
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={3}>
                    <AntButton ghost label="Save" htmlType="submit" icon={<SaveOutlined />} />
                  </Col> */}

                    <Form.Item>
                      {/* <Row style={{ marginLeft: '-25%', marginTop: '1%' }} gutter={10} className="btns"> */}
                      <Row align="middle" gutter={[16, 16]} style={{ display: 'flex', justifyContent: 'end' }}>
                        <Col xs={12} sm={15} md={24} lg={24} xl={4}>
                          <Form.Item name="IsTaxable" valuePropName="checked" initialValue={true}>
                            {/* <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, 'IsTaxable')}> */}
                            <Checkbox>{t('print_preview')}</Checkbox>
                          </Form.Item>
                        </Col>

                        <Col xs={11} sm={15} md={24} lg={24} xl={2} className="icon">
                          <Badge size="small" count={1}>
                            <AntButton
                              // style={{ marginLeft: '-3rem' }}
                              // danger
                              // ghost
                              // htmlType="reset"
                              // onClick={() => setTableData([])}
                              label={t('')}
                              icon={<PaperClipOutlined />}
                            />
                            {/* <Avatar shape="square" size="large" icon={<LinkOutlined />} /> */}
                          </Badge>
                          {/* <AntButton
                      style={{ width: '5rem', marginLeft: '-3rem' }}
                      // danger
                      // ghost
                      // htmlType="reset"
                      // onClick={() => setTableData([])}
                      label={t('')}
                      icon={<LinkOutlined style={{ fontSize: '1.3rem' }} />}
                    /> */}
                        </Col>

                        <Col xs={12} sm={15} md={24} lg={24} xl={4}>
                          <AntButton
                            danger
                            ghost
                            htmlType="reset"
                            onClick={() => setTableData([])}
                            label={t('reset')}
                            icon={<SyncOutlined />}
                          />
                        </Col>
                        <Col xs={11} sm={15} md={24} lg={24} xl={4}>
                          <AntButton
                            danger
                            ghost
                            // htmlType="reset"
                            // onClick={() => setTableData([])}
                            label={t('refresh')}
                            icon={<ReloadOutlined />}
                          />
                        </Col>
                        <Col xs={12} sm={15} md={24} lg={24} xl={3}>
                          <AntButton label={t('save')} htmlType="submit" icon={<SaveOutlined />} />
                        </Col>
                      </Row>
                    </Form.Item>
                  </Form.Item>
                </Col>
              </Row>

              <MainEntry form={form} />
              {/* <SalesPersonalInfo form={form} /> */}
              <DynamicForm form={form} />
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}
type TAddUpdatedRecod = {
  selectedRecordId?: number | null;
};
export default SaleOrderForm;
