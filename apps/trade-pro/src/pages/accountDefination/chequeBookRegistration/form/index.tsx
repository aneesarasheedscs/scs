import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
// import { TPurchaseOrderEntry } from '../type';
import { AntButton, AntTable } from '@tradePro/components';
import { Card, Col, Form, Input, Row } from 'antd';
// import { useGetDocumentNumber } from '../queryOptions';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import ChequeBook from './chequeBookForm';
import ChequeBookTable from '../table/chequeBookRegistrationTable';
import { TSaveChequeBook } from './types';
import { useAddChequeBookRegistration } from '../queries/querySave';
import { generatecolumns } from '../table/columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';

const { useForm } = Form;

function ChequeForm() {
  const { t } = useTranslation();
  const [form] = useForm<TSaveChequeBook>();
  const { mutate, isError, isLoading, isSuccess } = useAddChequeBookRegistration();
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [tableData, setTableData] = useState<any>([]);

  // Parse 'CbSrFrom' and 'CbSrTo' as integers
  // const data = form.getFieldsValue(['CbSrFrom', 'CbSrTo', 'Remarks']);
  const formValues = form.getFieldsValue(['CbSrFrom', 'CbSrTo', 'CbPrefix', 'Remarks', 'BankId', 'AccountTitle']);
  // const formValues2 = form.getFieldsValue(['BankId','CbPrefix']);
  const { CbSrFrom, CbSrTo, CbPrefix, Remarks, BankId, AccountTitle } = formValues;
  form.setFieldValue('DocDate', dayjs(new Date()));
  const serialFrom = parseInt(CbSrFrom, 10);
  const serialTo = parseInt(CbSrTo, 10);

  // if (isNaN(serialFrom) || isNaN(serialTo)) {
  //   // Handle invalid input (e.g., non-numeric values)
  //   return Promise.reject("Invalid 'Serial From' or 'Serial To' values.");
  // }
  const [renderCount, setRenderCount] = useState(0);
  const handleGenerateButtonClick = () => {
    setRenderCount((prevCount) => prevCount + 1);
    const Cheqbookdetaillist: any[] = [];
    for (let i = serialFrom; i <= serialTo; i++) {
      Cheqbookdetaillist.push({
        CheqNo: `${i}`,
        CheqStatus: 'Blank',
        OtherRemarks: Remarks,
        CbPrefix: CbPrefix,
        ChartOfAccountId: AccountTitle,
        Cheqbookdetaillist,
      });
      return;
    }

    setTableData([...tableData, ...Cheqbookdetaillist]);
    setIsSaveButtonDisabled(false);
  };
  console.log(renderCount);
  useEffect(() => {
    const Cheqbookdetaillist: any[] = [];
    for (let i = serialFrom; i <= serialTo; i++) {
      Cheqbookdetaillist.push({
        CheqNo: `${i}`,
        CheqStatus: 'Blank',
        OtherRemarks: Remarks,
        CbPrefix: CbPrefix,
        ChartOfAccountId: AccountTitle,
        Cheqbookdetaillist,
      });
    }
    setTableData(Cheqbookdetaillist);
  }, [serialFrom, serialTo, Remarks, CbPrefix, AccountTitle, renderCount]);
  const onFinish = (values: TSaveChequeBook) => {
    console.log(values);
    mutate(values);
  };
  console.log(tableData);
  const handleResetForm = () => {
    setTableData([]);
    form.setFieldValue('DocDate', dayjs(new Date()));
  };
  return (
    <Card className="main_card">
      <Form
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }} // Full width on small screens
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
        layout="horizontal"
        onFinish={onFinish}
      >
        <Row align="top" justify="space-between" style={{ border: ' ' }}>
          <Col xs={24} md={24} sm={24} lg={24} xl={24} xxl={18}>
            <Form.Item className="buttons">
              <Row align="top" justify={'end'} style={{ marginRight: '0%', border: ' ' }} gutter={10}>
                <Col>
                  <AntButton label={t('generate')} onClick={() => handleGenerateButtonClick()} />
                </Col>
                <Col>
                  <AntButton
                    danger
                    ghost
                    htmlType="reset"
                    onClick={handleResetForm}
                    label={t('reset')}
                    icon={<SyncOutlined />}
                  />
                </Col>

                <Col>
                  <AntButton
                    ghost
                    label={t('save')}
                    htmlType="submit"
                    disabled={isSaveButtonDisabled}
                    icon={<SaveOutlined />}
                  />
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>

        <ChequeBook form={form} />

        <Row style={{ marginTop: '0.8%' }}>
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={18}>
            <>
              <AntTable
                dataSource={tableData}
                columns={generatecolumns(t)}
                scroll={{ x: '', y: convertVhToPixels('34vh') }}
              />
            </>
          </Col>
        </Row>
        <br />
      </Form>
    </Card>
  );
}

export default ChequeForm;
