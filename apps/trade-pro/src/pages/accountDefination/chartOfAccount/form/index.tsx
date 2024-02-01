import '../style.scss';
import ChildAccountTable from './tables';
import { AntButton } from '@tradePro/components';
import { Card, Col, Form, Row, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { SaveOutlined, SyncOutlined, PrinterFilled } from '@ant-design/icons';
import FormOfChartAccount from './FormOfChartAccount';
import { TChartAccountData } from '../types';
import TableofAccountLevel1 from './tables/1stLevelAccount/tableofAccountLevel1';
import TableofAccountLevel2 from './tables/2ndLevelAccount/tableofAccountLevel2';
import TableofAccountLevel3 from './tables/3rdLevelAccount/tableofAccountLevel3';
import TableofAccountLevel4 from './tables/4thLevelAccount/tableofAccountLevel4';
import { useChartofAccountSave, useParentAccountLeaveService } from './querie';
import { useAtom } from 'jotai';
import { selectedRowsAtom, selectedChildRowsAtom } from './Atom';
import { useEffect, useState } from 'react';

const { useToken } = theme;
const { useForm, useWatch } = Form;

function ChartAccountForm() {
  const [form] = useForm<TChartAccountData>();
  const [printPreview, setPrintPreview] = useState(true);

  const { t } = useTranslation();
  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);
  const [selectedChildRows, setSelectedChildRows] = useAtom(selectedChildRowsAtom);

  const AccountCode = form.getFieldValue('ParentAccountCode');
  console.log('Account Code:', AccountCode);
  const handleButtonClick = () => {
    setPrintPreview(!printPreview);
  };
  const { data, isSuccess, isLoading } = useParentAccountLeaveService(true, AccountCode);
  const { mutate } = useChartofAccountSave();

  const onFinish = (values: TChartAccountData) => {
    values.PrintPreview = printPreview;
    mutate(values);
    console.log(values);
  };
  const handleKeyDown = (event: any) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault();

      onFinish(form.getFieldsValue());
    } else if (event.key === 'Enter') {
      event.preventDefault();
    }
    if (event.altKey && event.key === 'p') {
      event.preventDefault();

      setPrintPreview((prevPrintPreview) => !prevPrintPreview);
    }
    if (event.key === 'Escape') {
      form.resetFields();
      setSelectedRows([]);
      setSelectedChildRows([]);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [form]);
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
                      title="PrintPreview"
                      onClick={handleButtonClick}
                      icon={<PrinterFilled />}
                      style={{ backgroundColor: printPreview ? '#21E298' : 'red' }}
                    />
                  </Col>

                  <Col>
                    <AntButton label={t('save')} htmlType="submit" icon={<SaveOutlined style={{ fontSize: 16 }} />} />
                  </Col>
                  <Col>
                    <AntButton
                      danger
                      ghost
                      htmlType="reset"
                      onClick={() => {
                        form.resetFields();
                        setSelectedRows([]);
                        setSelectedChildRows([]);
                      }}
                      label={t('reset')}
                      icon={<SyncOutlined style={{ fontSize: 16 }} />}
                    />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
            <Row style={{ marginTop: -20 }}>
              <Col xl={11}>
                <FormOfChartAccount form={form} data={data} isSuccess={isSuccess} isLoading={isLoading} />
              </Col>
              <Col xl={13}>
                <ChildAccountTable selectedRows={selectedRows} data={data} />
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
