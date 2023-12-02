import { useEffect, useState } from 'react';
import { AntColumnType } from '@tradePro/globalTypes';
import { useGetAccountDashboardData } from './queries';
import { Col, Modal, Row } from 'antd';
import { AntTable } from '@scs/ui';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { t } from 'i18next';
import ActivitySummaryReport from '@tradePro/pages/accountReports/ActivitySummary';
import { Link } from 'react-router-dom';
import { numberFormatter } from '@tradePro/utils/numberFormatter';
import { curry } from 'lodash';
import CashBalances from '@tradePro/pages/accountReports/CashBalance';
import BankBalances from '@tradePro/pages/accountReports/BankBalances/bankBalancesReport/BankBalances';

type CompanyWiseData = {
  CompanyId: number;
  Company: string;
  Opening: number;
  CurrDr: number;
  CurrCr: number;
  Closing: number;
};

const CompanyWiseDataPopUp: React.FC<{
  FromdateProp?: Date;
  TodateProp?: Date;
  Companies?: string;
  ReqType?: string;
  Id?: number;
}> = (props) => {
  const { FromdateProp, TodateProp, Companies, ReqType, Id } = props;
  const {
    data: dataSource,
    isError: isError,
    isLoading: isLoading,
    isSuccess,
    refetch,
  } = useGetAccountDashboardData(true, 2, {
    FromDate: FromdateProp,
    ToDate: TodateProp,
    CompanyIds: Companies,
    ReqType: ReqType,
  });

  useEffect(() => {
    refetch();
  }, [props]);

  const [SelectedCompany, setSelectedCompany] = useState<number | undefined>(undefined);

  const handleRowClick = (Id: number) => {
    setSelectedCompany(Id);
  };

  const columns = (t: any): AntColumnType<CompanyWiseData>[] => [
    {
      title: 'Company Name',
      dataIndex: 'Company',
      // searchableInput: true,
      width: 250,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.Company.localeCompare(b.Company),
      render: (_, { Company, CompanyId }) => (
        <>
          <a onClick={() => handleRowClick(CompanyId)}>{Company}</a>,
        </>
      ),
    },
    {
      width: 300,
      title: 'Opening',
      dataIndex: 'Opening',
      // searchableInput: true,
      sorter: (a, b) => a.Opening - b.Opening,
      showTotal: true,
      render: (_, { Opening }) => numberFormatter(Opening),
    },
    {
      width: 300,
      title: 'Debit',
      dataIndex: 'CurrDr',
      // searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      showTotal: true,
      sorter: (a, b) => a.CurrDr - b.CurrDr,
      render: (_, { CurrDr }) => numberFormatter(CurrDr),
    },
    {
      width: 300,
      title: 'Credit',
      dataIndex: 'CurrCr',
      // searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      showTotal: true,
      sorter: (a, b) => a.CurrCr - b.CurrCr,
      render: (_, { CurrCr }) => numberFormatter(CurrCr),
    },
    {
      width: 300,
      title: 'Closing',
      dataIndex: 'Closing',
      // searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      showTotal: true,
      sorter: (a, b) => a.Closing - b.Closing,
      render: (_, { Closing }) => numberFormatter(Closing),
    },
  ];
  return (
    <>
      <AntTable
        rowKey={'CompanyId'}
        columns={columns(t)}
        refetch={refetch}
        data={dataSource?.data?.Data?.Result}
        isError={isError}
        isLoading={isLoading}
        scroll={{ y: convertVhToPixels('50vh') }}
      />
      <Modal
        width={1800}
        key={SelectedCompany}
        open={SelectedCompany !== undefined}
        onCancel={() => setSelectedCompany(undefined)}
        destroyOnClose={true}
        footer={null}
        bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        {Id === 1 ? (
          <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
            <ActivitySummaryReport FromDateProp={FromdateProp} ToDateProp={TodateProp} CompanyId={SelectedCompany} />
          </div>
        ) : null}
        {Id == 2 && (
          <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
            <CashBalances FromDateProp={FromdateProp} ToDateProp={TodateProp} CompanyId={SelectedCompany} />
          </div>
        )}
        {Id == 3 && (
          <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
            <BankBalances FromDateProp={FromdateProp} ToDateProp={TodateProp} CompanyId={SelectedCompany} />
          </div>
        )}
        {/* {Id== 6 && (
          <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
            <PayablesReceivablesReport AccountClassId={3} FromDateProp={FromdateProp} ToDateProp={TodateProp} />
          </div>
        )}
        {Id == 7 && (
          <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
            <PayablesReceivablesReport AccountClassId={2} FromDateProp={FromdateProp} ToDateProp={TodateProp} />
          </div>
        )} */}
      </Modal>
    </>
  );
};

export default CompanyWiseDataPopUp;
