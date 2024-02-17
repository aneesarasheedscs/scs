import './style.scss';
import { useAtom } from 'jotai';
import ExpenseVoucherForm from './form';
import { useEffect, useState } from 'react';
import { viewDetailList } from './form/Atom';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row, Tabs, theme } from 'antd';
import ExpenseVoucherTable from './table/expenseVoucherTable';
import { useGetExpenseVoucherById, useGetExpenseVoucherDetail } from './queries/querySave';

function ExpenseVoucher() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<any>();
  const [selectedRecordDetailId, setSelectedRecordDetailId] = useState<any>();
  const [activeTab, setActiveTab] = useState<string>('1');
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);

  const {
    data: ExpenseVoucherById,
    refetch: refetchExpense,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetExpenseVoucherById(selectedRecordId);
  const { data, refetch, isSuccess, isLoading } = useGetExpenseVoucherDetail(selectedRecordDetailId);
  useEffect(() => {
    if (isSuccess) {
      setViewDetail(data?.data?.Data?.Result?.voucherDetailList);
    }
  }, [isSuccess, !isLoading]);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <>
      <Row style={{}}>
        <Col span={24}>
          <h2 className="form-heading">{t('expense_voucher')}</h2>
          <Tabs
            type="card"
            size="large"
            activeKey={activeTab}
            className="tabs-margin-bottom-0"
            onChange={(key) => setActiveTab(key)}
          >
            <Tabs.TabPane key="1" tab={t('history')}>
              <ExpenseVoucherTable
                setSelectedRecordId={setSelectedRecordId}
                setActiveTab={setActiveTab}
                setSelectedRecordDetailId={setSelectedRecordDetailId}
                refetch={refetch}
                isLoading={isLoading}
              />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab={t('form')}>
              <ExpenseVoucherForm
                selectedRecordId={selectedRecordId}
                setSelectedRecordId={setSelectedRecordId}
                refetchExpense={refetchExpense}
                ExpenseVoucherById={ExpenseVoucherById}
                isDataSuccess={isDataSuccess}
              />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}
export default ExpenseVoucher;
