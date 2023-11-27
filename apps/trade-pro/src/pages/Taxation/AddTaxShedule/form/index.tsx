import { useEffect, useState } from 'react';

import { TAddTaxSheduleHistory } from '../type';
import { AntButton } from '@tradePro/components';

import { Card, Col, Form, Input, Row } from 'antd';
import { useGetAddTaxSheduleHistory, useAddTaxSheduleSave, useUpdateAddTaxShedule } from '../queries';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import AddTaxShedule from './AddTaxShedule';
import dayjs from 'dayjs';

import AddTaxSheduleTable from '../table';
import { queryClient } from '@tradePro/configs';
import { useAtom } from 'jotai';
import { selectedRowsAtom } from '../../AddTaxType/form/Atom';
import { isNumber } from 'lodash';
const { useForm, useWatch } = Form;
function AddTaxSheduleScreen() {
  const [form] = useForm<TAddTaxSheduleHistory>();
  const formValues = useWatch<TAddTaxSheduleHistory>([], form);
  const [formData, setFormData] = useState<TAddTaxSheduleHistory | null>(null);

  const [selectedRow, setSelectedRow] = useAtom(selectedRowsAtom);
  const [myData, setmyData] = useState([]);
  const { setFieldValue, getFieldValue } = form;
  const Id = selectedRow?.[0]?.Id;
  // const { data, mutate, isError, isLoading, isSuccess } = useGetAddTaxSheduleHistory();
  const { mutate: updateData } = useUpdateAddTaxShedule(Id);
  const { mutate: addData } = useAddTaxSheduleSave(0);
  const FormData = form.getFieldsValue();
  const onFinish = (values: TAddTaxSheduleHistory) => {
    const formData = form.getFieldsValue();
    queryClient.invalidateQueries('txshedule-history');
    console.log('values', values);
    if (isNumber(Id)) {
      updateData(values);
    } else {
      addData(values);
    }
  };

  if (Id > 0) {
    setFieldValue('EffectedDate', dayjs(selectedRow?.[0]?.EffectedDate));
    setFieldValue('TaxNameId', selectedRow?.[0]?.TaxNameId);
    setFieldValue('TaxPercent', selectedRow?.[0]?.TaxPercent);
  }
  return (
    <>
      <Card>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row align="middle" justify="space-between">
            <Col>
              <Row gutter={10} align="middle">
                <Col style={{ fontSize: 18 }}>Add Tax Shedule.</Col>
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

          <AddTaxShedule form={form} />
        </Form>
      </Card>
      <br />
      <AddTaxSheduleTable formData={FormData} selectedRows={selectedRow} />
    </>
  );
}

export default AddTaxSheduleScreen;
