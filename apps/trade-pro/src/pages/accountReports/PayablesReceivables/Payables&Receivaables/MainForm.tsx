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
    <div style={{backgroundColor:'#fff'}}>

      
      <>
        <Row justify={'space-between'} align={'middle'}>
        <Col xs={10} sm={10} md={12} lg={8} xl={14} xxl={3} style={{marginLeft:15}}>

<h1 className="report_heading">{t('report')}</h1>
</Col>
<Col xxl={1} style={{ marginRight: '50px' }}>
          <BackButton goToDashboard={false} />
        </Col>
        </Row>

        <Row justify={'space-around'}style={{margin:20}}>
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
