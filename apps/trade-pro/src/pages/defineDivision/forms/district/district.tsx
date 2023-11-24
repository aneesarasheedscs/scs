import { Card, Col, Form, Input, Row, Select } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import '../../stylee.scss';
import { AntButton, AntInput, AntSelectDynamic, AntTable } from '@tradePro/components';
import { columns } from './columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetDistrictState, useGetDistrictTable } from '../../queries';
import { RedoOutlined } from '@ant-design/icons';
import { isNumber } from 'lodash';
import { useGetDistrictById } from '../../queryGetById';
import { useSaveDistrictType } from '../../querySave';
import { TDefineDistrictDataOnAdd } from './types';
import { useTranslation } from 'react-i18next';

function District() {
  const [form] = Form.useForm<TDefineDistrictDataOnAdd>();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const { data, isError, isLoading } = useGetDistrictTable();
  const { mutate, isSuccess, isLoading: isSaveLoading } = useSaveDistrictType();
  const {
    data: district,
    refetch,
    isSuccess: isDataByIdSuccess,
    isLoading: isDataLoading,
  } = useGetDistrictById(selectedRecordId);

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
      form.setFieldsValue(district?.data?.Data?.Result);
    }
  }, [isDataByIdSuccess]);

  return (
    <>
      <div className="district-main">
        <Row
          style={{
            marginTop: '10%',
            width: '80%',
          }}
          align="middle"
          className="row-border"
        >
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
            <h2 className="heading">{t('define_district')}</h2>
          </Col>
        </Row>
        <center>
          <div className="main">
            <Form
              style={{
                maxWidth: '100vw',
              }}
              onFinish={onFinish}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 15 }}
              initialValues={{ remember: true }}
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
                    fieldValue="DivisionId"
                    label={t('division_name')}
                    name="divisionId"
                    fieldLabel="DivisionName"
                    style={{ width: '100%', marginLeft: '1%', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
                    query={useGetDistrictState}
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
                    className="districtCode-input"
                    label={t('district_code')}
                    name="DistrictCode"
                    style={{
                      textAlign: 'center',
                      marginLeft: '4.5%',
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
                    className="districtName-input"
                    label={t('district_name')}
                    name="DistrictName"
                    style={{
                      textAlign: 'center',
                      marginLeft: 8,
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
export default District;
