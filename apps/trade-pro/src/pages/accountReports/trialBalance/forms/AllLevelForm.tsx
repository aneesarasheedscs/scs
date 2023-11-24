import { AntButton, AntDatePicker, AntSelectDynamic } from '@scs/ui';
import { Card, Col, DatePicker, DatePickerProps, Form, Input, Radio, Row, Space, Typography, theme } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
const { useToken } = theme;
import dayjs from 'dayjs';
import '../style.scss';
import type { RadioChangeEvent } from 'antd';
import AllLevelTBTable from '../table/AllLevelTBTable';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { useForm, useWatch } = Form;

const AllLevelForm = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const [form] = useForm<any>();
  const { t } = useTranslation();
  // const onChange: DatePickerProps['onChange'] = (date, dateString) => {};
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const {
    token: { colorPrimary },
  } = theme.useToken();
  console.log(dayjs(new Date()));

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Row>
        <Col
          xs={2}
          sm={4}
          md={6}
          lg={8}
          xl={14}
          style={{ display: 'flex', alignItems: 'center', alignContent: 'center', margin: '16px' }}
        >
          <h1 style={{ fontFamily: 'Poppins', fontSize: '19px', padding: '0px' }}>{t('all_level_trial_balance')} </h1>
          {/* <span style={{ position: 'relative', left: '120%' }}>
            {' '}
            <b> {t('dashboard')}</b> &#9654; {t('account_dashboard')}
          </span> */}
        </Col>
      </Row>

      <Card style={{ width: '80vw', marginLeft: '50px', marginBottom: '10px' }}>
        <Form form={form}>
          <Row gutter={16} style={{ marginTop: '15px', marginBottom: '-20px' }}>
            <Col xl={4} className="formfields">
              <AntDatePicker name="FromDate" bordered={false} label={t('from_date')} />
            </Col>
            <Col xl={4} className="formfields" offset={1}>
              <AntDatePicker name="ToDate" bordered={false} label={t('to_date')} />
            </Col>
            <Col xl={4} className="formfields" offset={1}>
              <AntSelectDynamic bordered={false} label={t('view_options')} name="" fieldLabel="" fieldValue="" />
            </Col>
            <Col>
              <AntButton
                label={t('show')}
                htmlType="submit"
                //   isError={isPurchaseOrderError}
                //   isLoading={isPurchaseOrderLoading || isFetching}
              />
            </Col>
            <Col style={{ marginLeft: '0px' }}>
              <AntButton
                // style={{ backgroundColor: 'orange' }}
                label={t('clear')}
                htmlType="submit"
                //   isError={isPurchaseOrderError}
                //   isLoading={isPurchaseOrderLoading || isFetching}
              />
            </Col>
            <Col xl={2}>
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  <Radio value={1}>Collapse</Radio>
                  <Radio value={2}>Expand</Radio>
                </Space>
              </Radio.Group>
            </Col>
            <Col xl={2}>
              <Card style={{ width: '9.5vw', marginLeft: '-30px', marginTop: '-25px' }}>
                <Radio.Group onChange={onChange} value={value}>
                  <Space direction="vertical">
                    <Radio value={1}>Four Columns</Radio>
                    <Radio value={2}>Six Columns</Radio>
                  </Space>
                </Radio.Group>
              </Card>
            </Col>
          </Row>
        </Form>
      </Card>
      <AllLevelTBTable />
    </div>
  );
};

export default AllLevelForm;
