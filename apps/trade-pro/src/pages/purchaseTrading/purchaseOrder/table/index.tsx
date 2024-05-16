import { columns } from './columns';
import { AntButton, AntTable } from '@tradePro/components';
import { useGetPurchaseOrder, useGetPurchaseOrderStatus } from '../queries';
import SearchCriteriaFrom from './SearchCriteriaForm';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row, theme } from 'antd';
import PurchaseOrderStatus from './purchaseOrderStatus';
import { useState } from 'react';
import CardView from './cardView';
import { relative } from 'path';

const { useToken } = theme;
interface TPurchaseTypes {
  setSelectedRecordId: (selectedRecordId: number) => void;
  setActiveTab: (tab: string) => void;
}

function PurchaseOrderTable({ setSelectedRecordId, setActiveTab }: TPurchaseTypes) {
  const { t } = useTranslation();
  const { data, refetch, isError, isLoading, isFetching } = useGetPurchaseOrder();
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [showComponent, setShowComponent] = useState(false);

  const toggleGridView = () => {
    setShowComponent(false);
  };
  const toggleCardView = () => {
    setShowComponent(true);
  };

  function CriteriaString() {
    return (
      <Row style={{ border: '1px solid #25A7DF', padding: 5, borderRadius: 5 }}>
        <h5> {data?.data?.Data?.Result?.[0]?.ReportCriteria}</h5>
      </Row>
    );
  }
  return (
    <>
      <Row gutter={10}>
        <Col span={24} style={{ marginLeft: '0.5%', borderTop: '1px solid #dfdfdf', background: '#fff' }}>
          <Row>
            <Col style={{}}>
              <AntButton
                onClick={toggleGridView}
                className={showComponent ? 'toggleGridView' : 'toggleCardView'}
                label={t('grid_view')}
              />
              <AntButton
                onClick={toggleCardView}
                className={showComponent ? 'toggleCardView' : 'toggleGridView'}
                label={t('card_view')}
              />
            </Col>
            <Col xxl={21}>
              <PurchaseOrderStatus />
            </Col>
          </Row>
        </Col>

        <Col xl={24}>
          {/* <PurchaseOrderStatus /> */}
          {showComponent ? (
            <>
              <Card
                cover={
                  <>
                    <CardView setActiveTab={setActiveTab} setSelectedRecordId={setSelectedRecordId} />
                  </>
                }
              ></Card>
            </>
          ) : (
            <>
              <AntTable
                rowKey="Id"
                refetch={refetch}
                isError={isError}
                columns={columns(t)}
                numberOfSkeletons={12}
                isLoading={isLoading || isFetching}
                data={data?.data?.Data?.Result || []}
                searchCriteriaForm={<SearchCriteriaFrom />}
                searchCriteriaReport={data?.data?.Data?.Result?.[0]?.ReportCriteria ? <CriteriaString /> : ''}
                scroll={{ x: '', y: convertVhToPixels('60vh') }}
              />
            </>
          )}
        </Col>
      </Row>
    </>
  );
}

export default PurchaseOrderTable;
