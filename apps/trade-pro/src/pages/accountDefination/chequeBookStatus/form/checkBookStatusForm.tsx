import { AntButton, AntDatePicker, AntInput, AntInputNumber, AntSelectDynamic } from '@tradePro/components';
import { Card, Checkbox, Col, Row, Form, FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';
import '../style2.scss';
import { useGetBankSelect, useGetChequeBookSelect } from '../queries/queries';
import { useState } from 'react';

function ChequeBookStatusForm() {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState<boolean>(false);

  const { data: filter } = useGetBankSelect();

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 24, offset: 0 }}
          lg={{ span: 24, offset: 0 }}
          xl={{ span: 24, offset: 0 }}
        >
          <Card style={{ height: 'auto', paddingBottom: '1%', boxShadow: '2px 4px 12px 1px gray' }}>
            <div className="form-list-container">
              <Col
                xs={{ span: 22, offset: 1 }}
                sm={{ span: 23, offset: 0 }}
                md={{ span: 8, offset: 0 }}
                lg={{ span: 8, offset: 0 }}
                xl={{ span: 9, offset: 0 }}
                className="formfield "
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('bank')}
                  fieldValue="Id"
                  fieldLabel="AccountTitle"
                  name="BankId"
                  query={useGetBankSelect}
                />
              </Col>
              <Col
                xs={{ span: 14, offset: 1 }}
                sm={{ span: 16, offset: 0 }}
                md={{ span: 8, offset: 1 }}
                lg={{ span: 8, offset: 1 }}
                xl={{ span: 8, offset: 1 }}
                className="formfield "
              >
                <AntSelectDynamic
                  bordered={false}
                  label={t('cheque_book_no')}
                  fieldValue="Id"
                  fieldLabel="CheqNo"
                  name="Id"
                  query={useGetChequeBookSelect}
                />
              </Col>

              <Col
                xs={{ span: 8, offset: 0 }}
                sm={{ span: 7, offset: 0 }}
                md={{ span: 6, offset: 0 }}
                lg={{ span: 6, offset: 0 }}
                xl={{ span: 5, offset: 0 }}
              >
                <label>
                  <Checkbox
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    name="CheqCancelStatus"
                    style={{
                      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    }}
                    className="checkbox"
                  />
                  <span style={{ marginLeft: '5%' }}>{t('cheque_cancel')}</span>
                </label>
              </Col>

              <Col
                xs={{ span: 22, offset: 1 }}
                sm={{ span: 23, offset: 0 }}
                md={{ span: 23, offset: 0 }}
                lg={{ span: 23, offset: 0 }}
                xl={{ span: 9, offset: 0 }}
                style={{ marginTop: '1%' }}
                className="formfield"
              >
                <AntInput bordered={false} label="Remarks" name={''} />
              </Col>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ChequeBookStatusForm;
