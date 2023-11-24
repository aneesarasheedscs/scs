import '../style.scss';
import ChildAccountTable, { ChildAccountTableforView } from './tables';
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
import { useChartofAccountSave, useParentAccountLeaveService } from './querie';
import { useAtom } from 'jotai';
import { selectedRowsAtom, selectedAccountAtom, selectedChildRowsAtom } from './Atom';

const { useToken } = theme;
const { useForm, useWatch } = Form;
interface SelectedValues {
  accountLevel: number;
  accountTitle: string;
}
function ChartAccountForm() {
  const [form] = useForm<TChartAccountData>();
  const formValues = useWatch<TChartAccountData>([], form);

  const { t } = useTranslation();
  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);
  const [displayData, setDisplayData] = useAtom(selectedAccountAtom);
  const [selectedChildRows, setSelectedChildRows] = useAtom(selectedChildRowsAtom);
  const handleSelectedValuesChange = (accountLevel: number, accountTitle: string) => {
    setDisplayData({ accountLevel, accountTitle });
  };

  const AccountCode = form.getFieldValue('ParentAccountCode');
  console.log('Account Code:', AccountCode);

  const { data, isSuccess, isLoading } = useParentAccountLeaveService(true, AccountCode);
  const { mutate } = useChartofAccountSave();

  const onFinish = (values: TChartAccountData) => {
    mutate(values);
    console.log(values);
  };

  return (
    <>
      <Card>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row align="middle" justify="space-between">
            <Col xl={10} style={{ display: 'flex', justifyContent: 'end' }}>
              <Form.Item>
                <Row align="middle" gutter={10} style={{ marginRight: '-35px' }}>
                  <Col>
                    <AntButton
                      danger
                      ghost
                      htmlType="reset"
                      onClick={() => {
                        form.resetFields();
                        setSelectedChildRows([]);
                      }}
                      label={t('reset')}
                      icon={<SyncOutlined />}
                    />
                  </Col>

                  <Col>
                    <AntButton ghost label={t('save')} htmlType="submit" icon={<SaveOutlined />} />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
            <Row style={{ marginTop: -20 }}>
              <Col xl={11}>
                <FormOfChartAccount
                  form={form}
                  data={data}
                  isSuccess={isSuccess}
                  isLoading={isLoading}
                  onSelectedValuesChange={handleSelectedValuesChange}
                />
              </Col>
              <Col xl={13}>
                <ChildAccountTable displayData={displayData} selectedRows={selectedRows} data={data} />
                <ChildAccountTableforView displayData={displayData} selectedRows={selectedRows} data={data} />
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
