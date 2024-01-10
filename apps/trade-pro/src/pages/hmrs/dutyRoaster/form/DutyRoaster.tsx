import { AntButton, AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic, AntTable } from '@tradePro/components';
import { Card, Checkbox, Col, Row, Form, FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';
import EmployeesFilter from './EmployeesFilter';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { columns } from '../table/columns';

function DutyRoaster() {
  // { form }: TDynamicForm
  const { t } = useTranslation();

  // const { data: filter } = useGetContraCreditAccountSelect();

  return (
    <>
      {/* <h2 style={{ boxShadow: '2px 2px 12px 1px #5a54f9' }} className="form-heading">
        {t('duty_roaster')}
      </h2> */}
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={14}>
          <br />
          <Card style={{ boxShadow: '2px 2px 12px 1px #5a54f9', marginTop: '-3%' }}>
            <h3>{t('main')}</h3>
            <br />
            <div className="form-list-container">
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 23, offset: 0 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 11, offset: 0 }}
                className="formfield"
              >
                <AntDatePicker bordered={false} label={t('from_date')} name="CompanyId" />
              </Col>

              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 23, offset: 0 }}
                md={{ span: 11, offset: 1 }}
                lg={{ span: 11, offset: 1 }}
                xl={{ span: 11, offset: 1 }}
                className="formfield"
              >
                <AntDatePicker bordered={false} label={t('to_date')} name="CompanyId" />
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 23, offset: 0 }}
                md={{ span: 11, offset: 0 }}
                lg={{ span: 11, offset: 0 }}
                xl={{ span: 11, offset: 0 }}
                className="formfield"
              >
                <AntInput bordered={false} label={t('description')} name="CompanyId" />
              </Col>
              <EmployeesFilter />
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={10}>
          <Col span={24} offset={1}>
            <h2 style={{ boxShadow: '2px 2px 12px 1px #5a54f9' }} className="form-heading">
              {t('apply_group')}
            </h2>
          </Col>
          <br />
          <Card style={{ marginLeft: '3%', border: 'none', boxShadow: '2px 2px 12px 1px #5a54f9', textAlign: 'left' }}>
            {' '}
            <Col span={3}>
              <AntButton label={t('apply')} />
            </Col>
            <AntTable
              // isError={isError}
              numberOfSkeletons={12}
              // isLoading={isLoading}
              scroll={{ x: '', y: convertVhToPixels('29vh') }}
              // style={{ width: 'auto', padding: '2%' }}
              // data={data?.data?.Data?.Result || []}
              columns={columns(t)}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

type TDynamicForm = { form: FormInstance };

export default DutyRoaster;
