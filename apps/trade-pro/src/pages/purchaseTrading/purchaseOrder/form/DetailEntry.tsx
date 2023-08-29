import { Card, Col, Form, Row } from 'antd';
import { useEffect, useState } from 'react';
import { TPurchaseOrderDetailEntry } from '../type';
import { AntSelectDynamic } from '@tradePro/components';
import { useGetItemsWithBaseUom, useGetJobLot } from '../queryOptions';
import { useTranslation } from 'react-i18next';

const DynamicForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [initialValues] = useState<TPurchaseOrderDetailEntry[]>([{ Amount: null }]);

  useEffect(() => {
    form.setFieldsValue({ items: initialValues });
  }, []);

  return (
    <Card className="antCard card-shadow">
      <Form.List name="items" initialValue={initialValues}>
        {(fields, { add, remove }) => (
          <>
            <Row gutter={16}>
              <Col span={8}> {t('item_name')}</Col>
              <Col span={3}> {t('job_lot')}</Col>
            </Row>
            {fields.map((field) => (
              <Row key={field.key} gutter={16}>
                <Col xs={8}>
                  <AntSelectDynamic
                    required
                    fieldValue="Id"
                    label={t('item_name')}
                    showLabel={false}
                    fieldLabel="ItemName"
                    query={useGetItemsWithBaseUom}
                    formItemProps={{ ...field, name: [field.name, 'OrderItemId'] }}
                  />
                </Col>

                <Col xs={3}>
                  <AntSelectDynamic
                    required
                    fieldValue="Id"
                    label={t('job_lot')}
                    showLabel={false}
                    query={useGetJobLot}
                    fieldLabel="JobLotDescription"
                    formItemProps={{ ...field, name: [field.name, 'JobLotId'] }}
                  />
                </Col>
              </Row>
            ))}
          </>
        )}
      </Form.List>
    </Card>
  );
};

export default DynamicForm;
