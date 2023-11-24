import { Card, Checkbox, Col, Form, Row } from 'antd';
import { useEffect, useState } from 'react';
import '../../defineJobLots/style2.scss';
import { AntButton, AntInput, AntTable } from '@tradePro/components';

import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { isNumber } from 'lodash';
import { RedoOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useGetWareHouseById, useGetWareHouseTable } from '../queries';
import { columns } from './columns';
import { TDefineWareHouseOnAdd } from '../types';
import { useSaveWareHouseType } from '../querySave';

function WareHouse() {
  const [form] = Form.useForm();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const { data, isError, isLoading } = useGetWareHouseTable();
  const [isActive, setIsActive] = useState<boolean>(false);
  const { mutate, isSuccess, isLoading: isSaveLoading } = useSaveWareHouseType(selectedRecordId);
  const {
    data: warehouse,
    refetch,
    isSuccess: isDataByIdSuccess,
    isLoading: isDataLoading,
  } = useGetWareHouseById(selectedRecordId);

  const { t } = useTranslation();

  const onFinish = (values: TDefineWareHouseOnAdd) => {
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
      form.setFieldsValue(warehouse?.data?.Data?.Result);
    }
  }, [isDataByIdSuccess]);

  const handleEditClick = (recordId: number) => {
    setSelectedRecordId(recordId);
    const selectedRecord = data?.data?.Data?.Result.find((record: any) => record.Id === recordId);
    setIsActive(selectedRecord?.IsActive === true);
  };

  return (
    <>
      <div className="warehouse-main">
        <Row
          style={{
            marginTop: '5%',
            width: '65vw',
          }}
          className="row-border"
        >
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
            <h2 className="warehouse-heading">{t('define_ware_house')}</h2>
          </Col>
        </Row>
        <center>
          <div>
            <Form
              style={{
                width: '80vw',
                paddingTop: '5%',
              }}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 15 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
              form={form}
            >
              <Row>
                <Col
                  xs={{ span: 15, offset: 2 }}
                  sm={{ span: 15, offset: 2 }}
                  md={{ span: 7, offset: 0 }}
                  lg={{ span: 7, offset: 1 }}
                  xl={{ span: 7, offset: 1 }}
                >
                  <AntInput
                    label={t('warehouse_code')}
                    name="WareHouseCode"
                    style={{
                      marginLeft: '2%',
                      textAlign: 'center',
                      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    }}
                  />
                </Col>

                <Col
                  xs={{ span: 15, offset: 2 }}
                  sm={{ span: 15, offset: 2 }}
                  md={{ span: 7, offset: 1 }}
                  lg={{ span: 7, offset: 1 }}
                  xl={{ span: 7, offset: 1 }}
                >
                  <AntInput
                    className="warehouse-name"
                    label={t('warehouse_name')}
                    name="WareHouseName"
                    style={{
                      textAlign: 'center',
                      marginLeft: '4%',
                      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    }}
                  />
                </Col>

                <Col
                  xs={{ span: 15, offset: 2 }}
                  sm={{ span: 15, offset: 3 }}
                  md={{ span: 4, offset: 1 }}
                  lg={{ span: 4, offset: 0 }}
                  xl={{ span: 3, offset: 0 }}
                >
                  <label>
                    <Checkbox
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      name="IsActive"
                      style={{
                        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                      }}
                    />
                    <span style={{ marginLeft: '7%' }}>{t('is_active')} </span>
                  </label>
                </Col>
                <Row />

                <Row style={{ width: '60%', marginLeft: '33%', marginTop: '3%' }}>
                  <Col
                    xs={{ span: 1, offset: 0 }}
                    sm={{ span: 10, offset: 0 }}
                    md={{ span: 2, offset: 0 }}
                    lg={{ span: 2, offset: 0 }}
                    xl={{ span: 1, offset: 0 }}
                  >
                    <AntButton
                      htmlType="submit"
                      label={isNumber(selectedRecordId) ? <>{t('update')}</> : <>{t('add')}</>}
                      className="save-btn2"
                    ></AntButton>
                  </Col>

                  <Col
                    xs={{ span: 8, offset: 8 }}
                    sm={{ span: 5, offset: 0 }}
                    md={{ span: 4, offset: 4 }}
                    lg={{ span: 3, offset: 3 }}
                    xl={{ span: 2, offset: 3 }}
                  >
                    <AntButton
                      icon={<RedoOutlined />}
                      style={{ width: '100%' }}
                      onClick={handleReset}
                      className="reset-btn2"
                    />
                  </Col>
                </Row>

                <Row className="row-border" style={{ marginTop: '3%', width: '65vw' }}>
                  <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                    <h2 className="history-heading">{t('history')}</h2>
                  </Col>
                </Row>

                <Row style={{ marginTop: '3%' }}>
                  <Col
                    xs={{ span: 20 }}
                    sm={{ span: 20 }}
                    md={{ span: 20 }}
                    lg={{ span: 19 }}
                    xl={{ span: 15, offset: 2 }}
                  >
                    <Card style={{ boxShadow: '2px 4px 12px 1px gray', textAlign: 'left' }}>
                      <AntTable
                        isError={isError}
                        numberOfSkeletons={8}
                        isLoading={isLoading}
                        scroll={{ x: '', y: convertVhToPixels('29vh') }}
                        data={data?.data?.Data?.Result}
                        columns={columns(setSelectedRecordId, handleEditClick, t)}
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
export default WareHouse;
