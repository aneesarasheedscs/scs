import { Card, Col, Form, Row } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import '../../stylee.scss';
import { AntButton, AntInput, AntSelectDynamic, AntTable } from '@tradePro/components';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetTownState, useGetTownTable } from '../../queries';
import { RedoOutlined } from '@ant-design/icons';
import { useSaveTownType } from '../../querySave';
import { useGetTownById } from '../../queryGetById';
import { isNumber } from 'lodash';
import { TDefineTownDataOnAdd } from './types';
import { useTranslation } from 'react-i18next';
import { columns } from './columns';

function Town() {
  const [form] = Form.useForm<TDefineTownDataOnAdd>();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const { data, isError, isLoading } = useGetTownTable();
  const { mutate, isSuccess, isLoading: isSaveLoading } = useSaveTownType(selectedRecordId);
  const {
    data: town,
    refetch,
    isSuccess: isDataByIdSuccess,
    isLoading: isDataLoading,
  } = useGetTownById(selectedRecordId);

  const { t } = useTranslation();

  const tableColumns = useMemo(() => columns(t, setSelectedRecordId), [t, setSelectedRecordId]);

  const onFinish = (values: TDefineTownDataOnAdd) => {
    if (isNumber(selectedRecordId)) {
      mutate(values);
    } else {
      mutate(values);
    }
  };

  const handleReset = () => {
    form.resetFields();
    setSelectedRecordId(null);
  };

  useEffect(() => {
    if (isSuccess) handleReset();
  }, [isSuccess]);

  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetch();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataByIdSuccess) {
      form.setFieldsValue(town?.data?.Data?.Result);
    }
  }, [isDataByIdSuccess]);

  return (
    <>
      <div className="town-main">
        <Row
          style={{
            marginTop: '10%',
            width: '80%',
          }}
          align="middle"
          className="row-border"
        >
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
            <h2 className="heading">{t('define_town')}</h2>
          </Col>
        </Row>
        <center>
          <div className="main">
            <Form
              style={{
                maxWidth: '100vw',
              }}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 15 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
              form={form}
            >
              <Row align="middle">
                <Col
                  xs={{ span: 15, offset: 5 }}
                  sm={{ span: 24, offset: 0 }}
                  md={{ span: 20, offset: 3 }}
                  lg={{ span: 20, offset: 3 }}
                  xl={{ span: 15, offset: 4 }}
                >
                  <AntSelectDynamic
                    fieldValue="TehsilId"
                    label={t('tehsil_name')}
                    name="TehsilId"
                    fieldLabel="TehsilName"
                    style={{ width: '100%', marginLeft: '3%', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
                    query={useGetTownState}
                  />
                </Col>
              </Row>

              <Row align="middle">
                <Col
                  xs={{ span: 15, offset: 5 }}
                  sm={{ span: 24, offset: 0 }}
                  md={{ span: 20, offset: 3 }}
                  lg={{ span: 20, offset: 3 }}
                  xl={{ span: 15, offset: 4 }}
                >
                  <AntInput
                    className="townCode-input"
                    label={t('town_code')}
                    name="TownCode"
                    style={{
                      textAlign: 'center',
                      marginLeft: '5%',
                      width: '100%',
                      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    }}
                  />
                </Col>
              </Row>

              <Row align="middle">
                <Col
                  xs={{ span: 15, offset: 5 }}
                  sm={{ span: 24, offset: 0 }}
                  md={{ span: 20, offset: 3 }}
                  lg={{ span: 20, offset: 3 }}
                  xl={{ span: 15, offset: 4 }}
                >
                  <AntInput
                    label={t('town_name')}
                    name="TownName"
                    style={{
                      textAlign: 'center',
                      marginLeft: '4%',
                      width: '100%',
                      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    }}
                  />
                </Col>
                <Row />

                <Row style={{ width: '60%', marginLeft: '35%', marginTop: '3%' }}>
                  <Col
                    xs={{ span: 2, offset: 2 }}
                    sm={{ span: 2, offset: 0 }}
                    md={{ span: 2, offset: 0 }}
                    lg={{ span: 2, offset: 0 }}
                    xl={{ span: 1, offset: 0 }}
                  >
                    <AntButton
                      htmlType="submit"
                      label={isNumber(selectedRecordId) ? 'Update' : 'Add'}
                      className="save-btn"
                    ></AntButton>
                  </Col>

                  <Col
                    xs={{ span: 2, offset: 15 }}
                    sm={{ span: 2, offset: 12 }}
                    md={{ span: 2, offset: 12 }}
                    lg={{ span: 1, offset: 11 }}
                    xl={{ span: 1, offset: 9 }}
                  >
                    <AntButton
                      icon={<RedoOutlined />}
                      style={{ width: '500%' }}
                      onClick={handleReset}
                      className="reset-btn"
                    />
                  </Col>
                </Row>

                <Row className="row-border" style={{ marginTop: '15%', width: '100%', padding: '0%' }}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                    <h2 className="history-heading">History</h2>
                  </Col>
                </Row>

                <Row style={{ marginTop: '5%' }}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                    <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}>
                      <AntTable
                        isError={isError}
                        numberOfSkeletons={8}
                        isLoading={isLoading}
                        scroll={{ x: '', y: convertVhToPixels('29vh') }}
                        data={data?.data?.Data?.Result}
                        columns={tableColumns}
                      />
                    </Card>
                  </Col>
                </Row>
              </Row>
            </Form>
          </div>
        </center>
      </div>
    </>
  );
}
export default Town;
