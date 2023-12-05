import React, { useEffect, useState } from 'react';
import './style.scss';
import { Card, Col, Form, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import AccountsDetailSearchCriteriaForm from './tables/AccountsDetailSearchCriteriaForm';
import { useGetGeneralLedgerDetail, useGetGeneralLedgerSummaryI, useGetGeneralLedgerSummaryII } from './queries';
import AccountDetailCard from './GeneralLedger/AccountDetailCard';
import { TFilterForms } from './type';
import { AntTable } from '@scs/ui';
import { DetailTableColumns, SummaryIITableColumns, SummaryITableColumns } from './tables/columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetAccountBalance, useGetAccountDetail } from './queryOptions';
const { Title, Text } = Typography;

const GeneralLedgerReport: React.FC<{ FromDateProp?: Date; ToDateProp?: Date; AccountIdProp?: number }> = (props) => {
  const { FromDateProp, ToDateProp, AccountIdProp } = props;
  const { t } = useTranslation();

  const [RefAccountId, setRefAccountId] = useState(0);
  const [formState, setformState] = useState<TFilterForms>({});
  const [showAccountDetailCard, setShowAccountDetailCard] = useState(false);

  const handleAccountTitleChange = (AccountId: number) => {
    console.log(AccountId);
    if (AccountId > 0) {
      setRefAccountId(AccountId);
      setShowAccountDetailCard(true);
    } else {
      setRefAccountId(0);
      setShowAccountDetailCard(false);
    }
  };

  const handleFormStateChange = (FormState: TFilterForms) => {
    setformState(FormState);
  };

  const {
    data: AccountDetail,
    isError,
    isLoading,
    refetch: refetchAccountDetail,
  } = useGetAccountDetail(false, RefAccountId);

  const {
    data: AccountBalance,
    isError: isAccountBalanceError,
    isLoading: isAccountBalanceLoading,
    refetch: refetchAccountBalance,
  } = useGetAccountBalance(false, formState?.AccountId, formState?.FromDate, formState?.ToDate);

  const {
    data: detailData,
    isError: detailError,
    isSuccess: detailDataSuccess,
    isLoading: detailDataLoading,
    refetch: detailRefetch,
  } = useGetGeneralLedgerDetail(false, formState);

  const {
    data: summary1Data,
    isError: summary1Error,
    isSuccess: summary1DataSuccess,
    isLoading: summary1DataLoading,
    refetch: summary1Refetch,
  } = useGetGeneralLedgerSummaryI(false, formState);

  const {
    data: summary2Data,
    isError: summary2Error,
    isSuccess: summary2DataSuccess,
    isLoading: summary2DataLoading,
    refetch: summary2Refetch,
  } = useGetGeneralLedgerSummaryII(false, formState);

  const { data, isSuccess } = useGetGeneralLedgerDetail();

  useEffect(() => {
    if (RefAccountId > 0) {
      refetchAccountDetail();
    }
  }, [RefAccountId]);

  useEffect(() => {
    if (formState?.FromDate !== undefined) {
      if (formState?.ReportType === undefined || formState?.ReportType == 1) {
        refetchAccountBalance();
        detailRefetch();
      } else if (formState?.ReportType == 2) {
        refetchAccountBalance();
        summary1Refetch();
      } else if (formState?.ReportType == 3) {
        refetchAccountBalance();
        summary2Refetch();
      }
    }
  }, [formState]);

  return (
    <Card style={{ marginLeft: '-1%', marginTop: '-2%' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h2 style={{ boxShadow: '2px 4px 12px 1px gray' }} className="form-heading">
            {t('general_ledger')}
          </h2>
        </Col>
      </Row>
      <br />

      <Col xs={15} sm={10} md={6} lg={5} xxl={4}>
        {' '}
        <AccountsDetailSearchCriteriaForm
          CriteriaObject={{ AccountIdProp, FromDateProp, ToDateProp }}
          handleAccountTitleChange={handleAccountTitleChange}
          handleFormStateChange={handleFormStateChange}
        />
      </Col>
      <br />

      {showAccountDetailCard && (
        <Col
          sm={{ span: 24, offset: 0 }}
          md={{ span: 20, offset: 2 }}
          lg={{ span: 20, offset: 5 }}
          xl={{ span: 16, offset: 10 }}
          xxl={{ span: 10, offset: 13 }}
          style={{ marginTop: '-4%' }}
          className="card"
        >
          <AccountDetailCard
            DetailData={AccountDetail?.data?.Data?.Result}
            BalanceData={AccountBalance?.data?.Data?.Result}
          />
        </Col>
      )}
      <br />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          {formState !== undefined && (formState.ReportType == undefined || formState?.ReportType == 1) && (
            <AntTable
              isError={detailError}
              columns={DetailTableColumns(t)}
              numberOfSkeletons={12}
              isLoading={detailDataLoading}
              data={detailData?.data?.Data?.Result || []}
              scroll={{ x: '', y: convertVhToPixels('40vh') }}
            />
          )}
          {formState !== undefined && formState?.ReportType == 2 && (
            <AntTable
              isError={summary1Error}
              columns={SummaryITableColumns(t)}
              numberOfSkeletons={12}
              isLoading={summary1DataLoading}
              data={summary1Data?.data?.Data?.Result || []}
              scroll={{ x: '', y: convertVhToPixels('40vh') }}
            />
          )}
          {formState !== undefined && formState?.ReportType == 3 && (
            <AntTable
              isError={summary2Error}
              columns={SummaryIITableColumns(t)}
              numberOfSkeletons={12}
              isLoading={summary2DataLoading}
              data={summary2Data?.data?.Data?.Result || []}
              scroll={{ x: '', y: convertVhToPixels('40vh') }}
            />
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default GeneralLedgerReport;
