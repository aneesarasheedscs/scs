import { Col, Row, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { CustomerTable, ItemAndPackTable, ItemTable, PackAndItemTable } from '../table/outstandingOrderTables';

function PendingOrders({ pendingOrdersData, isLoading, isFetching }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <Row>
        <Col span={24}>
          <Tabs type="card" size="large" className="tabs-margin-bottom-0">
            <Tabs.TabPane key="1" tab={t('item')}>
              <ItemTable data={pendingOrdersData?.Table} isLoading={isLoading} isFetching={isFetching} />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab={t('customer')}>
              <CustomerTable data={pendingOrdersData?.Table1} isLoading={isLoading} isFetching={isFetching} />
            </Tabs.TabPane>
            <Tabs.TabPane key="3" tab={t('item_pack')}>
              <ItemAndPackTable data={pendingOrdersData?.Table2} isLoading={isLoading} isFetching={isFetching} />
            </Tabs.TabPane>
            <Tabs.TabPane key="4" tab={t('pack_item')}>
              <PackAndItemTable data={pendingOrdersData?.Table2} isLoading={isLoading} isFetching={isFetching} />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}

export default PendingOrders;
interface Props {
  pendingOrdersData: any;
  isLoading: boolean;
  isFetching: boolean;
}
