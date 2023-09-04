import '../style.scss';
import ChildAccountTable from './tables';
import { AntButton } from '@tradePro/components';
import { Card, Col, Form, Row, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import FormOfChartAccount from './FormOfChartAccount';
import { TChartAccountData } from '../types';
import { useState } from 'react';
import TableofAccountLevel1 from './tables/1stLevelAccount/tableofAccountLevel1';
import TableofAccountLevel2 from './tables/2ndLevelAccount/tableofAccountLevel2';
import TableofAccountLevel3 from './tables/3rdLevelAccount/tableofAccountLevel3';
import TableofAccountLevel4 from './tables/4thLevelAccount/tableofAccountLevel4';

const { useToken } = theme;
const { useForm, useWatch } = Form;
interface SelectedValues {
  accountLevel: number;
  accountTitle: string;
}
function ChartAccountForm() {
  const [form] = useForm<TChartAccountData>();
  const { t } = useTranslation();
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({
    accountLevel: 0,
    accountTitle: '',
  });
  const handleSelectedValuesChange = (accountLevel: number, accountTitle: string) => {
    setSelectedValues({
      accountLevel,
      accountTitle,
    });
  };
  const onFinish = (values: TChartAccountData) => {
    console.log(values);
  };

  return (
    <>
      <Card>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row align="middle" justify="space-between">
            <Col style={{ marginLeft: 20 }}>
              <Form.Item>
                <Row align="middle" gutter={10}>
                  <Col>
                    <AntButton danger ghost htmlType="reset" label={t('reset')} icon={<SyncOutlined />} />
                  </Col>
                  <Col>
                    <AntButton label={t('save_and_add_more')} htmlType="submit" />
                  </Col>
                  <Col>
                    <AntButton ghost label={t('save')} htmlType="submit" icon={<SaveOutlined />} />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
            <Row style={{ marginTop: -20 }}>
              <Col xl={11}>
                {' '}
                <FormOfChartAccount form={form} onSelectedValuesChange={handleSelectedValuesChange} />
              </Col>
              <Col xl={13}>
                <ChildAccountTable selectedValues={selectedValues} />
              </Col>
            </Row>
          </Row>
        </Form>
        <Row justify={'space-between'}>
          <Col xl={11}>
            <TableofAccountLevel1 />
          </Col>
          <Col xl={12}>
            <TableofAccountLevel2 />
          </Col>
          <Col xl={11}>
            <TableofAccountLevel3 />
          </Col>
          <Col xl={12}>
            <TableofAccountLevel4 />
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default ChartAccountForm;
