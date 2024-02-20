import React, { useEffect, useState } from 'react';
import './style.scss';
import { Card, Col, Form, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import AccountsDetailSearchCriteriaForm from './tables/AccountsDetailSearchCriteriaForm';
import { useGetGeneralLedgerDetail, useGetGeneralLedgerSummaryI, useGetGeneralLedgerSummaryII } from './queries';
import AccountDetailCard from './GeneralLedger/AccountDetailCard';
import { TFilterForms } from './type';
import { AntTable, BackButton } from '@scs/ui';
import { DetailTableColumns, SummaryIITableColumns, SummaryITableColumns } from './tables/columns';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useGetAccountBalance, useGetAccountDetail } from './queryOptions';
import { storedUserDetail } from '@tradePro/utils/storageService';
const { Title, Text } = Typography;
const userDetail = storedUserDetail();

const GeneralLedgerReport: React.FC<{
  FromDateProp?: Date;
  ToDateProp?: Date;
  AccountIdProp?: number;
  CompanyId?: number;
}> = (props) => {
  const { FromDateProp, ToDateProp, AccountIdProp, CompanyId } = props;
  const { t } = useTranslation();

  const [RefAccountId, setRefAccountId] = useState(0);
  const [formState, setformState] = useState<TFilterForms>({});
  const [showAccountDetailCard, setShowAccountDetailCard] = useState(false);

  const handleAccountTitleChange = (AccountId: number) => {
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
  } = useGetAccountDetail(
    false,
    CompanyId !== undefined && CompanyId > 0 ? CompanyId : userDetail?.CompanyId,
    RefAccountId
  );

  const {
    data: AccountBalance,
    isError: isAccountBalanceError,
    isLoading: isAccountBalanceLoading,
    refetch: refetchAccountBalance,
  } = useGetAccountBalance(
    false,
    CompanyId !== undefined && CompanyId > 0 ? CompanyId : userDetail?.CompanyId,
    formState?.AccountId,
    formState?.FromDate,
    formState?.ToDate
  );

  const {
    data: detailData,
    isError: detailError,
    isSuccess: detailDataSuccess,
    isLoading: detailDataLoading,
    refetch: detailRefetch,
    isFetching: detaiIsFetching,
  } = useGetGeneralLedgerDetail(
    true,
    CompanyId !== undefined && CompanyId > 0 ? CompanyId : userDetail?.CompanyId,
    formState
  );

  const {
    data: summary1Data,
    isError: summary1Error,
    isSuccess: summary1DataSuccess,
    isLoading: summary1DataLoading,
    refetch: summary1Refetch,
    isFetching: summary1isFetching,
  } = useGetGeneralLedgerSummaryI(
    false,
    CompanyId !== undefined && CompanyId > 0 ? CompanyId : userDetail?.CompanyId,
    formState
  );

  const {
    data: summary2Data,
    isError: summary2Error,
    isSuccess: summary2DataSuccess,
    isLoading: summary2DataLoading,
    refetch: summary2Refetch,
    isFetching: summary2isFetching,
  } = useGetGeneralLedgerSummaryII(
    false,
    CompanyId !== undefined && CompanyId > 0 ? CompanyId : userDetail?.CompanyId,
    formState
  );
  // const { data, isSuccess } = useGetGeneralLedgerDetail();

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
    <div style={{ background: '#fff' }}>
      <Row justify={'space-between'} align={'middle'}>
        <Col xs={10} sm={10} md={12} lg={12} xl={14} xxl={16} className="">
          <h1 className="report_heading">{t('general_ledger')}</h1>
        </Col>
        <Col xxl={1} style={{ marginRight: '50px' }}>
          <BackButton goToDashboard={false} />
        </Col>
      </Row>
      <Row>
        <Col style={{ marginLeft: '35px' }}>
          <AccountsDetailSearchCriteriaForm
            CriteriaObject={{ AccountIdProp, FromDateProp, ToDateProp, CompanyId }}
            handleAccountTitleChange={handleAccountTitleChange}
            handleFormStateChange={handleFormStateChange}
          />
        </Col>
      </Row>
      <br />
      {showAccountDetailCard && (
        <Row gutter={[24, 24]} justify={'space-around'}>
          <Col xxl={23} style={{ marginTop: '0px' }}>
            <AccountDetailCard
              DetailData={AccountDetail?.data?.Data?.Result}
              BalanceData={AccountBalance?.data?.Data?.Result}
            />
          </Col>
        </Row>
      )}
      {/* <br /> */}
      <Row gutter={[16, 16]} justify={'space-around'}>
        <Col span={23} style={{ marginTop: '10px' }}>
          {formState !== undefined && (formState.ReportType == undefined || formState?.ReportType == 1) && (
            <AntTable
              isError={detailError}
              columns={DetailTableColumns(t)}
              numberOfSkeletons={12}
              isLoading={detailDataLoading || detaiIsFetching}
              data={detailData?.data?.Data?.Result || []}
              scroll={{ x: '', y: convertVhToPixels('27vh') }}
              refetch={detailRefetch}
            />
          )}
          {formState !== undefined && formState?.ReportType == 2 && (
            <AntTable
              isError={summary1Error}
              columns={SummaryITableColumns(t)}
              numberOfSkeletons={12}
              isLoading={summary1DataLoading || summary1isFetching}
              refetch={summary1Refetch}
              data={summary1Data?.data?.Data?.Result || []}
              scroll={{ x: '', y: convertVhToPixels('27vh') }}
            />
          )}
          {formState !== undefined && formState?.ReportType == 3 && (
            <AntTable
              isError={summary2Error}
              columns={SummaryIITableColumns(t)}
              numberOfSkeletons={12}
              isLoading={summary2DataLoading || summary2isFetching}
              refetch={summary2Refetch}
              data={summary2Data?.data?.Data?.Result || []}
              scroll={{ x: '', y: convertVhToPixels('27vh') }}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default GeneralLedgerReport;
