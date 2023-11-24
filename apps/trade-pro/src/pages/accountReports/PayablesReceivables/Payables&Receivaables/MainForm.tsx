import { Tabs } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FollowUp from './FollowUp';
import PayablesReceivables from './payablesReceivables';

const PayablesReceivablesReport: React.FC<{ AccountClassId?: number; FromDateProp?: Date; ToDateProp?: Date }> = (
  props
) => {
  const { AccountClassId, FromDateProp, ToDateProp } = props;
  const { t } = useTranslation();
  return (
    <div>
      <>
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
                />
              ),
            },
            { key: '2', label: t('follow_up'), children: <FollowUp /> },
          ]}
        />
      </>
    </div>
  );
};

export default PayablesReceivablesReport;
