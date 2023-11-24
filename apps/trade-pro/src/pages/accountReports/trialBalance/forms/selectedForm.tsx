import { Card, Checkbox, Col, DatePicker, Form, Radio, RadioChangeEvent, Row, Space, Typography, theme } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { AntButton, AntDatePicker, AntInput, AntSelectDynamic } from '@scs/ui';
import SelectedTBTable from '../table/selectedTBTable';
import { useGetAccountTitle } from '../trialBalanceReport/queries';
import { useGetCityName } from '../../TrialBalaceSelectedReport/trialBalanceSelected/queries';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { useForm, useWatch } = Form;

// const onChange = (checkedValues: CheckboxValueType[]) => {
//   console.log('checked = ', checkedValues);
// };

function SelectedFormTB() {
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

  // Wrap your JSX content inside a return statement
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
          <h1 style={{ fontFamily: 'Poppins', fontSize: '19px', padding: '0px' }}>{t('selected_trial_balance')} </h1>
          {/* <span style={{ position: 'relative', left: '120%' }}>
          {' '}
          <b> {t('dashboard')}</b> &#9654; {t('account_dashboard')}
        </span> */}
        </Col>
      </Row>

      <Card style={{ width: '80vw', marginLeft: '50px', marginBottom: '10px' }}>
        <Form form={form}>
          <Row gutter={16} style={{ marginTop: '15px', marginBottom: '-10px' }}>
            <Col xl={4} className="formfields">
              <AntDatePicker name="FromDate" bordered={false} label={t('from_date')} />
            </Col>
            <Col xl={4} className="formfields" offset={1} style={{ marginLeft: '20px' }}>
              <AntDatePicker name="ToDate" bordered={false} label={t('to_date')} />
            </Col>

            <Col xl={4} className="formfields" offset={1} style={{ marginLeft: '20px' }}>
              <AntSelectDynamic
                bordered={false}
                label={t('account_title')}
                name=""
                fieldLabel="AccounTitle"
                fieldValue="AccountTitle"
                query={useGetAccountTitle}
              />
            </Col>
            <Col xl={3} className="formfields" offset={1} style={{ marginLeft: '20px' }}>
              <AntSelectDynamic
                bordered={false}
                label={t('city_name')}
                name="CityName"
                fieldLabel="CityName"
                fieldValue="Id"
                query={useGetCityName}
              />
            </Col>
            <Col xl={4} className="formfields" offset={1} style={{ marginLeft: '20px' }}>
              <AntSelectDynamic bordered={false} label={t('custom_group')} name="" fieldLabel="" fieldValue="" />
            </Col>
            <Col>
              <AntButton
                label={t('show')}
                htmlType="submit"
                //   isError={isPurchaseOrderError}
                //   isLoading={isPurchaseOrderLoading || isFetching}
              />
            </Col>
            <Col xl={2} style={{ marginTop: '-23px' }}>
              <Checkbox.Group>
                <Space direction="vertical">
                  <Checkbox value={1}>Un Post</Checkbox>
                  <Checkbox value={2}>Skip Zero</Checkbox>
                  <Checkbox value={2}>Is Active</Checkbox>
                </Space>
              </Checkbox.Group>
            </Col>
          </Row>
        </Form>
      </Card>
      <SelectedTBTable />
    </div>
  );
}

export default SelectedFormTB;
