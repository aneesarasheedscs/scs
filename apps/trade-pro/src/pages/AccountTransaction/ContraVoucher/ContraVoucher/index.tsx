import './style.scss';
import { useAtom } from 'jotai';
import ContraVoucherForm from './form';
import { Col, Row, Tabs } from 'antd';
import { viewDetailList } from './form/Atom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ContraVoucherTable from './table/contraVoucherTable';
import { useGetContraVoucherById, useGetContraVoucherDetailById } from './queries/querySave';

function ContraVoucher() {
  const { t } = useTranslation();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [selectedRecordIdforDetail, setSelectedRecordIdforDetail] = useState<number | null>();
  const [activeTab, setActiveTab] = useState<string>('1');
  const [viewDetail, setViewDetail] = useAtom(viewDetailList);

  const {
    data: ContraVoucherById,
    refetch: refetchContra,
    isSuccess: isDataSuccess,
    isLoading: isDataLoading,
  } = useGetContraVoucherById(selectedRecordId);
  const { data, refetch, isSuccess, isLoading } = useGetContraVoucherDetailById(selectedRecordIdforDetail);
  useEffect(() => {
    if (isSuccess) {
      setViewDetail(data?.data?.Data?.Result?.voucherDetailList);
    }
  }, [isSuccess, !isLoading]);

  return (
    <>
      <Row style={{ background: '' }}>
        <Col span={24}>
          <h2 className="form-heading">{t('contra_voucher')}</h2>
          <Tabs
            type="card"
            size="large"
            activeKey={activeTab}
            className="tabs-margin-bottom-0"
            onChange={(key) => setActiveTab(key)}
          >
            <Tabs.TabPane key="1" tab={t('history')}>
              <ContraVoucherTable
                setSelectedRecordId={setSelectedRecordId}
                setSelectedRecordIdforDetail={setSelectedRecordIdforDetail}
                setActiveTab={setActiveTab}
                refetch={refetch}
                isLoading={isLoading}
              />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab={t('form')}>
              <ContraVoucherForm
                selectedRecordId={selectedRecordId}
                setSelectedRecordId={setSelectedRecordId}
                ContraVoucherById={ContraVoucherById}
                isDataSuccess={isDataSuccess}
              />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}
export default ContraVoucher;
