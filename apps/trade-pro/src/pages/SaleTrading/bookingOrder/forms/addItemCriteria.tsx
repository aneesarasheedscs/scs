import { AntButton, AntSelectDynamic } from '@tradePro/components';
import { Card, Col, Form, Row, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FilterFilled, SyncOutlined } from '@ant-design/icons';
import { map } from 'lodash';

const { useForm, useWatch } = Form;

interface TProps {
  data: any;
  setFilteredRecord: (data: any[]) => void;
}
interface TForm {
  ItemId: number;
}
const AddItemCriteria = ({ data, setFilteredRecord }: TProps) => {
  const { t } = useTranslation();
  const [form] = useForm<TForm>();
  const formValues = useWatch<TForm>([], form);
  const [message, setmessage] = useState('');
  const {
    token: { colorPrimary },
  } = theme.useToken();
  useEffect(() => {
    setFilteredRecord(data?.data?.Data?.Result);
  }, [data]);
  const [itemName, setItemName] = useState('');

  const handleSelectItem = (value: number) => {
    const selectedAccount = data?.data?.Data?.Result?.find((item: any) => item.ItemId === value);
    if (selectedAccount) {
      const accountTitle = selectedAccount.ItemName;
      //here we are setting the item name we are selecting from the dropdown
      setItemName(accountTitle);
    }
  };
  const Item = form.getFieldValue('ItemId');
  console.log(Item);
  const handleFiltereItems = () => {
    if (Item) {
      const filterdData = data?.data?.Data?.Result?.filter((item: any) => item.ItemName === itemName);
      setFilteredRecord(filterdData);
      setmessage('');
    } else {
      setmessage('Please select Item!');
    }
  };
  const handleResetItems = () => {
    setFilteredRecord(data?.data?.Data?.Result);
  };

  return (
    <>
      <Row style={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 1 }}>
        <Col xxl={24} xl={24} lg={24} sm={24} md={24} xs={24} style={{ padding: 0 }}>
          <Card style={{ height: '6vh' }} className="cardHieght">
            <Col xxl={24} xl={23} sm={23} xs={23} lg={23} className="ItemCriteriaStyle" style={{ padding: 0 }}>
              <Form form={form} initialValues={formValues}>
                <Col>
                  <Row justify={'space-between'} style={{ marginTop: -15 }}>
                    <Col xs={24} sm={12} md={12} xxl={12} className="formfield">
                      <AntSelectDynamic
                        bordered={false}
                        label={t('select_item')}
                        name="ItemId"
                        fieldLabel="ItemName"
                        fieldValue="Id"
                        options={map(data?.data?.Data?.Result, (item: any) => ({
                          value: item.ItemId,
                          label: item.ItemName,
                        }))}
                        onSelect={(value) => handleSelectItem(value)}
                      />
                      <p style={{ marginTop: -30, color: 'red' }}> {message}</p>
                    </Col>

                    <Col>
                      <Row gutter={[6, 0]} style={{ marginRight: -15 }} justify={'space-between'}>
                        <Col>
                          <AntButton
                            onClick={handleFiltereItems}
                            ghost
                            icon={<FilterFilled style={{ fontWeight: 'bold', fontSize: 25 }} />}
                          />
                        </Col>
                        <Col>
                          <AntButton
                            onClick={handleResetItems}
                            ghost
                            icon={<SyncOutlined style={{ fontWeight: 'bold', fontSize: 20 }} />}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Form>
            </Col>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default AddItemCriteria;
