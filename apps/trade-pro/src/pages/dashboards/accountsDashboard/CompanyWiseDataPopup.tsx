import { ReactNode, useState } from 'react';
import { AntColumnType } from '@tradePro/globalTypes';
import { useGetAccountDashboardData } from './queries';
import { Col, Modal, Row } from 'antd';
import { AntTable } from '@scs/ui';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { t } from 'i18next';
import ActivitySummaryReport from '@tradePro/pages/accountReports/ActivitySummary';

type CompanyWiseData = {
  CompanyId: number;
  CompanyName: string;
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
}> = ({ FromdateProp, TodateProp, Companies, ReqType, Id }) => {
  const [openModal, setopenModal] = useState<boolean>(false);
  const columns = (t: any): AntColumnType<CompanyWiseData>[] => [
    {
      title: 'Company Name',
      dataIndex: 'CompanyName',
      searchableInput: true,
      width: 250,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.CompanyName.localeCompare(b.CompanyName),
      render: (_, { CompanyId }) => (
        <Modal
          width={1700}
          key={CompanyId}
          open={CompanyId !== undefined}
          onCancel={() => setopenModal(false)}
          footer={null}
          bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
        >
          {Id == 1 && (
            <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
              <ActivitySummaryReport FromDateProp={FromdateProp} ToDateProp={TodateProp} />
            </div>
          )}
          {/* {Id == 2 && (
          <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
            <CashBalances FromDateProp={FromdateProp} ToDateProp={TodateProp} />
          </div>
        )}
        {Id == 3 && (
          <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
            <BankBalances FromDateProp={FromdateProp} ToDateProp={TodateProp} />
          </div>
        )}
        {Id== 6 && (
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
      ),
    },
    {
      title: 'Opening',
      dataIndex: 'Opening',
      searchableInput: true,
      sorter: (a, b) => a.Opening - b.Opening,
      showTotal: true,
      width: 200,
    },
    {
      title: 'Debit',
      dataIndex: 'CurrDr',
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      showTotal: true,
      sorter: (a, b) => a.CurrDr - b.CurrDr,
    },
    {
      title: 'Credit',
      dataIndex: 'CurrCr',
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      showTotal: true,
      sorter: (a, b) => a.CurrCr - b.CurrCr,
    },
    {
      title: 'Closing',
      dataIndex: 'Closing',
      searchableInput: true,
      sortDirections: ['ascend', 'descend'],
      showTotal: true,
      sorter: (a, b) => a.Closing - b.Closing,
    },
  ];

  const {
    data: dataSource,
    isError: isError,
    isLoading: isLoading,
    refetch,
  } = useGetAccountDashboardData(false, 2, {
    FromDate: FromdateProp,
    ToDate: TodateProp,
    CompanyIds: Array.isArray(Companies) ? Companies.join(',') : Companies,
    ReqType: ReqType,
  });

  return (
    <>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={24} className="">
          <AntTable
            rowKey={'AccountId'}
            columns={columns(t)}
            data={dataSource?.data?.Data?.Result || []}
            isError={isError}
            isLoading={isLoading}
            scroll={{ y: convertVhToPixels('50vh') }}
          />
        </Col>
      </Row>
    </>
  );
};

export default CompanyWiseDataPopUp;
