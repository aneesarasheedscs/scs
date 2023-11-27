import { useEffect, useState } from 'react';
import DynamicForm from './DetailEntry';
import { TItemTaxShedule } from '../type';
import { AntButton } from '@tradePro/components';
import { Card, Col, Form, Input, Row } from 'antd';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { useItemTaxSheduleSave, useUpdateItemTaxShedule } from '../queries';
import ItemTaxSheduleTable from '../table';
import { queryClient } from '@tradePro/configs';
import { useAtom } from 'jotai';
import { selectedRowsAtom } from '../table/Atom';
import { isNumber } from 'lodash';
import { useGetItemTaxSheduleGetById } from '../queryOptions';
import dayjs from 'dayjs';
import { use } from 'i18next';
const { useForm, useWatch } = Form;

function ItemTaxSheduleScreen() {
  const [form] = useForm<TItemTaxShedule>();
  const formValues = useWatch<TItemTaxShedule>([], form);
  const [selectedRow, setSelectedRow] = useAtom(selectedRowsAtom);
  const [myData, setmyData] = useState([]);
  const { setFieldValue, getFieldValue } = form;
  const Id = selectedRow?.[0]?.Id;

  // const [formData, setFormData] = useState<TItemTaxShedule | null>(null);
  const { mutate: updateData, isSuccess: isSuccessUpdate } = useUpdateItemTaxShedule(Id);

  const { mutate: addData } = useItemTaxSheduleSave(0);

  // const { data, isError, isLoading, isSuccess } = useGetItemTaxSheduleGetById(true, Id);

  const FormData = form.getFieldsValue();
  const onFinish = (values: TItemTaxShedule) => {
    queryClient.invalidateQueries('Item-tax-shedule-history');
    // addData(values)
    isNumber(Id) ? updateData(values) : addData(values);
  };

  // const { data, isError, isLoading, isSuccess } = useGetItemTaxSheduleGetById(Id);
  // useEffect(() => {
  //   setmyData(data?.data?.Data?.Result);
  //   if (myData?.length > 0) {
  //     setFieldValue('ItemId', selectedRow?.[0]?.ItemId);
  //     setFieldValue('TaxTypeId', selectedRow?.[0]?.TaxTypeId);
  //     setFieldValue('EffectedDate', dayjs(selectedRow?.[0]?.EffectedDate));
  //   }
  // }, [Id]);

  if (Id > 0) {
    setFieldValue('ItemId', selectedRow?.[0]?.ItemId);
    setFieldValue('TaxTypeId', selectedRow?.[0]?.TaxTypeId);
    setFieldValue('EffectedDate', dayjs(selectedRow?.[0]?.EffectedDate));
  }

  return (
    <>
      <Card>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row align="middle" justify="space-between">
            <Col>
              <Row gutter={10} align="middle">
                <Col style={{ fontSize: 18 }}>Item Tax Shedule.</Col>
              </Row>
            </Col>

            <Col>
              <Form.Item>
                <Row align="middle" gutter={10}>
                  <Col>
                    <AntButton danger ghost htmlType="reset" label="Reset" icon={<SyncOutlined />} />
                  </Col>

                  <Col>
                    <AntButton ghost label="Save" htmlType="submit" icon={<SaveOutlined />} />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>

          <DynamicForm form={form} />
        </Form>
      </Card>
      <br />
      <ItemTaxSheduleTable formData={FormData} selectedRows={selectedRow} />
    </>
  );
}

export default ItemTaxSheduleScreen;
