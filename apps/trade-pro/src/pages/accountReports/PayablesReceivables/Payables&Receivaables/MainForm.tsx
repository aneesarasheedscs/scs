import { Col, Row, Tabs } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FollowUp from './FollowUp';
import PayablesReceivables from './payablesReceivables';
import { BackButton } from '@tradePro/components';

const PayablesReceivablesReport: React.FC<{
  AccountClassId?: number;
  FromDateProp?: Date;
  ToDateProp?: Date;
  CompanyIdProp?: number;
}> = (props) => {
  const { AccountClassId, FromDateProp, ToDateProp, CompanyIdProp } = props;
  const { t } = useTranslation();
  return (
    <div>
      <>
        <Row justify={'space-between'} align={'middle'}>
          <Col xs={10} sm={10} md={12} lg={12} xl={14} xxl={16} className="">
            <h1 className="report_heading" style={{ marginLeft: '0%' }}>
              {t('report')}
            </h1>
          </Col>
          <Col xxl={1} style={{ marginRight: '20px' }}>
            <BackButton goToDashboard={true} />
          </Col>
        </Row>

        <Row>
          <Col style={{ overflowX: 'hidden' }}>
            <Tabs
              type="card"
              size="large"
              defaultActiveKey="1"
              className="tabs-margin-bottom-0"
              items={[
                {
                  key: '1',
                  label: t(
                    AccountClassId == 2
                      ? 'receivables_report_accounts_classification_wise'
                      : 'payables_report_accounts_classification_wise'
                  ),

                  children: (
                    <PayablesReceivables
                      AccountClassId={AccountClassId}
                      FromDateProp={FromDateProp}
                      ToDateProp={ToDateProp}
                      CompanyIdProp={CompanyIdProp}
                    />
                  ),
                },
                { key: '2', label: t('follow_up'), children: <FollowUp /> },
              ]}
            />
          </Col>
        </Row>
      </>
    </div>
  );
};

export default PayablesReceivablesReport;
