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
  const formValues = form.getFieldsValue(['CbSrFrom', 'CbSrTo', 'Remarks']);
  // const formValues2 = form.getFieldsValue(['BankId','CbPrefix']);
  const { CbSrFrom, CbSrTo, Remarks, BankId } = formValues;

  const serialFrom = parseInt(CbSrFrom, 10);
  const serialTo = parseInt(CbSrTo, 10);

  // if (isNaN(serialFrom) || isNaN(serialTo)) {
  //   // Handle invalid input (e.g., non-numeric values)
  //   return Promise.reject("Invalid 'Serial From' or 'Serial To' values.");
  // }

  const handleGenerateButtonClick = () => {
    // Generate dummy data for the new table
    const Cheqbookdetaillist: any[] = [];
    for (let i = serialFrom; i <= serialTo; i++) {
      Cheqbookdetaillist.push({
        CheqNo: `${i}`,
        CheqStatus: 'Blank',
        OtherRemarks: Remarks,
        ChartOfAccountId: BankId,
        Cheqbookdetaillist,
      });
    }

    // Update the table data and enable the save button
    setTableData(Cheqbookdetaillist);
    setIsSaveButtonDisabled(false);
  };

  const onFinish = (values: TSaveChequeBook) => {
    console.log(values);
    mutate(values);
  };

  return (
    <Form
      labelCol={{ span: 0 }}
      wrapperCol={{ span: 24 }} // Full width on small screens
      initialValues={{ remember: true }}
      autoComplete="off"
      form={form}
      layout="horizontal"
      onFinish={onFinish}
    >
      <Row align="middle" justify="space-between">
        <Col
          xs={{ span: 24, offset: 6 }}
          sm={{ span: 17, offset: 10 }}
          md={{ span: 15, offset: 15 }}
          lg={{ span: 15, offset: 14 }}
          xl={{ span: 10, offset: 19 }}
        >
          <Form.Item className="buttons">
            <Row align="middle" style={{ marginLeft: '-22%' }} gutter={10}>
              <Col>
                <AntButton label={t('generate')} onClick={handleGenerateButtonClick} />
              </Col>
              <Col>
                <AntButton danger ghost htmlType="reset" label={t('reset')} icon={<SyncOutlined />} />
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

      <ChequeBook />
      <br />

      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
          <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}>
            <AntTable
              dataSource={tableData}
              columns={generatecolumns(t)}
              scroll={{ x: '', y: convertVhToPixels('36vh') }}
            />
          </Card>
        </Col>
      </Row>
      <br />
      {/* <ChequeBookTable/> */}
    </Form>
  );
}

export default ChequeForm;
