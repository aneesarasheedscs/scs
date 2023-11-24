import { Card, Col, Form, Row } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import '../../stylee.scss';
import { AntButton, AntInput, AntSelectDynamic, AntTable } from '@tradePro/components';
import { columns } from './columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetDivisionState, useGetDivisionTable } from '../../queries';
import { isNumber } from 'lodash';
import { useSaveDivisionType } from '../../querySave';
import { useGetDivisionById } from '../../queryGetById';
import { RedoOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { TDefineDistrictDataOnAdd } from '../district/types';

function Division() {
  const [form] = Form.useForm<TDefineDistrictDataOnAdd>();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const { data, isError, isLoading } = useGetDivisionTable();
  const { mutate, isSuccess } = useSaveDivisionType(selectedRecordId);
  const { data: division, refetch, isSuccess: isDataByIdSuccess } = useGetDivisionById(selectedRecordId);

  const { t } = useTranslation();

  const tableColumns = useMemo(() => columns(t, setSelectedRecordId), [t, setSelectedRecordId]);

  const onFinish = (values: TDefineDistrictDataOnAdd) => {
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
      form.setFieldsValue(division?.data?.Data?.Result);
    }
  }, [isDataByIdSuccess]);

  return (
    <>
      <div className="division-main">
        <Row
          style={{
            marginTop: '10%',
            width: '80%',
          }}
          align="middle"
          className="row-border"
        >
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
            <h2 className="heading">{t('define_division')}</h2>
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
                  sm={{ span: 20, offset: 3 }}
                  md={{ span: 20, offset: 3 }}
                  lg={{ span: 20, offset: 3 }}
                  xl={{ span: 15, offset: 4 }}
                >
                  <AntSelectDynamic
                    fieldValue="StateProvinceId"
                    label={t('province-name')}
                    name="StateProvinceId"
                    fieldLabel="ProvinceName"
                    style={{ width: '100%', marginLeft: '1%', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
                    query={useGetDivisionState}
                  />
                </Col>
              </Row>

              <Row align="middle">
                <Col
                  xs={{ span: 15, offset: 5 }}
                  sm={{ span: 20, offset: 3 }}
                  md={{ span: 20, offset: 3 }}
                  lg={{ span: 20, offset: 3 }}
                  xl={{ span: 15, offset: 4 }}
                >
                  <AntInput
                    className="divisionCode-input"
                    label={t('division_code')}
                    name="DivisionCode"
                    style={{
                      textAlign: 'center',
                      marginLeft: '4%',
                      width: '100%',
                      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    }}
                  />
                </Col>
              </Row>

              <Row align="middle">
                <Col
                  xs={{ span: 15, offset: 5 }}
                  sm={{ span: 20, offset: 3 }}
                  md={{ span: 20, offset: 3 }}
                  lg={{ span: 20, offset: 3 }}
                  xl={{ span: 15, offset: 4 }}
                >
                  <AntInput
                    className="divisionName-input"
                    label={t('division_name')}
                    name="DivisionName"
                    style={{
                      textAlign: 'center',
                      marginLeft: 6,
                      width: '100%',
                      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    }}
                  />
                </Col>
                <Row />

                <Row style={{ width: '60%', marginLeft: '36.5%', marginTop: '3%' }}>
                  <Col
                    xs={{ span: 2, offset: 2 }}
                    sm={{ span: 2, offset: 0 }}
                    md={{ span: 2, offset: 0 }}
                    lg={{ span: 2, offset: 0 }}
                    xl={{ span: 1, offset: 0 }}
                  >
                    <AntButton
                      htmlType="submit"
                      label={isNumber(selectedRecordId) ? <>{t('update')}</> : <>{t('add')}</>}
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
                    <h2 className="history-heading">{t('history')}</h2>
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
                        data={data?.data?.Data?.Result || refetch}
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
export default Division;
