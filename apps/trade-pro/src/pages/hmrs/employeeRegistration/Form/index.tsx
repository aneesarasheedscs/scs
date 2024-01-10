import { AntButton, AntTable } from '@tradePro/components';
import { Card, Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { SaveOutlined, SyncOutlined, ExportOutlined } from '@ant-design/icons';
import MainForm from './MainForm';
import { useEffect, useState } from 'react';
import { useAddGoodsRecievedNotes } from './query';
import EmployeeHistory from './EmployeeRegistrationHistory';
import EmployeeDetail from './EmployeeDetail';

const { useForm } = Form;
interface Props {}
function EmployeeRegistrationForm() {
  const [form] = useForm<any>();
  const { t } = useTranslation();
  // const {
  //   data,
  //   isSuccess,
  //   isError: isErrorDoc,
  //   refetch: refetchDocNo,
  //   isLoading: isLoadingDoc,
  // } = useGetDocumentNumber();
  const { mutate } = useAddGoodsRecievedNotes();
  // useEffect(() => {
  //   if (isSuccess) form.setFieldValue('DocNo', data?.data?.Data?.Result);
  // }, [data, isSuccess]);

  const [tableData, setTableData] = useState([]);

  const onFinish = (values: any) => {
    // console.log(values);
    // mutate(values);
  };

  return (
    <>
      <Card>
        <Form form={form} onFinish={onFinish} layout="horizontal" style={{ marginBottom: 25 }}>
          <Card className="grn-card">
            <Row align="middle" justify="space-between" style={{ marginLeft: 10, marginRight: 60 }}>
              <Col>
                <Row gutter={10} align="middle">
                  <Col style={{ fontSize: 18 }}> {t('employee_no')}</Col>
                  <Col>
                    {/* <DocNumber
                      isError={isErrorDoc}
                      refetch={refetchDocNo}
                      isLoading={isLoadingDoc}
                      data={data?.data?.Data?.Result}
                    /> */}
                    <Form.Item name="EmployeeNo" style={{ display: 'none' }}>
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col>
                <Form.Item>
                  <Row align="middle" gutter={10}>
                    <Col>
                      <AntButton danger ghost htmlType="reset" label={t('reset')} icon={<SyncOutlined />} />
                    </Col>
                    <Col>
                      <AntButton label={t('save_and_more')} htmlType="submit" />
                    </Col>
                    <Col>
                      <AntButton ghost label={t('save')} htmlType="submit" icon={<SaveOutlined />} />
                    </Col>
                    <Col>
                      <AntButton ghost label="Shift Timing" icon={<ExportOutlined />} style={{ width: '150px' }} />
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
            </Row>

            <MainForm form={form} />
            <EmployeeHistory form={form} />
            <EmployeeDetail form={form} />
          </Card>
        </Form>
      </Card>
    </>
  );
}

export default EmployeeRegistrationForm;
