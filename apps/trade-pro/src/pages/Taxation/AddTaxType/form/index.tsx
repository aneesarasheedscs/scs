import { useEffect, useState } from 'react';

import { TAddTaxTypeHistory } from '../type';
import { AntButton } from '@tradePro/components';

import { Card, Col, Form, Input, Row } from 'antd';

import { SaveOutlined, SyncOutlined } from '@ant-design/icons';

import AddTaxTypeForm from './TaxType';
import dayjs from 'dayjs';
import { queryClient } from '@tradePro/configs';
import { useAddTaxTypeSave, useUpdateAddTaxType } from '../queries';
import AddTaxTypeTable from '../table';
import { useAtom } from 'jotai';
import { selectedRowsAtom } from './Atom';
import { useGetAddTaxTypeGetById } from '../queryOptions';
import { isNumber } from 'lodash';
const { useForm, useWatch } = Form;

function AddTaxType() {
  const [form] = useForm<TAddTaxTypeHistory>();

  const formValues = useWatch<TAddTaxTypeHistory>([], form);
  const [selectedRow, setSelectedRow] = useAtom(selectedRowsAtom);
  const [myData, setmyData] = useState([]);
  const { setFieldValue, getFieldValue } = form;
  const Id = selectedRow?.[0]?.Id;

  const [isActive, setIsActive] = useState<boolean>(false);
  const [forms] = useForm<TAddTaxTypeHistory>();
  const FormData = form.getFieldsValue();

  const { mutate: addData } = useAddTaxTypeSave(0);
  const { mutate: updateData } = useUpdateAddTaxType(Id);
  const onFinish = (values: TAddTaxTypeHistory) => {
    queryClient.invalidateQueries('txtype-history');
    console.log(' values', values);
    // addData(values)
    isNumber(Id) ? updateData(values) : addData(values);
  };
  const { data, isError, isLoading, isSuccess } = useGetAddTaxTypeGetById(Id);
  useEffect(() => {
    setmyData(data?.data?.Data?.Result);
    if (myData?.length > 0) {
      setFieldValue('TaxName', selectedRow?.[0]?.TaxName);
      setFieldValue('Type', selectedRow?.[0]?.Type);
      setFieldValue('TaxGLAccountId', selectedRow?.[0].TaxGLAccountId);
    }
  }, [Id]);

  if (Id > 0) {
    setFieldValue('TaxName', selectedRow?.[0]?.TaxName);
    setFieldValue('Type', selectedRow?.[0]?.Type);
    setFieldValue('TaxGLAccountId', selectedRow?.[0].TaxGLAccountId);
  }

  return (
    <div>
      <Card>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row align="middle" justify="space-between">
            <Col>
              <Row gutter={10} align="middle">
                <Col style={{ fontSize: 18 }}>Add Tax Type</Col>
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
          <AddTaxTypeForm form={form} />
        </Form>
      </Card>
      <br />
      <AddTaxTypeTable formData={FormData} selectedRows={selectedRow} />
    </div>
  );
}

export default AddTaxType;
