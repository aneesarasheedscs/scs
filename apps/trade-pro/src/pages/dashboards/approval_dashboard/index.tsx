import React, { useState } from 'react';
import { Card, Col, Row, Input, Space, Modal, Tag, Typography, Divider } from 'antd';
import { EyeFilled, SyncOutlined } from '@ant-design/icons';
import './approvel.scss';
import { useAccount, useInventory } from './queries/approvel';
import { AntButton } from '@tradePro/components';
import { useTranslation } from 'react-i18next';
import VoucherModal from './voucher_ApprovalUnApproval/voucherModal';
import { ApprovalModal } from './approvalModal';
import InventoryModal from './inventoryApprovalUnApproval/InventoryModal';

const Search = Input.Search;
const { Title } = Typography;

const gridStyle: React.CSSProperties = {
  width: '95%',
  textAlign: 'center',
  height: '150px',
};

const Approval_dashboard: React.FC = () => {
  const { t } = useTranslation();
  const {
    data: Account,
    isError: AccountError,
    refetch: AccountRefetch,
    isSuccess: AccountSucess,
    isLoading: AccountLoading,
  } = useAccount();

  const {
    data: Inventory,
    isError: InventoryError,
    refetch: InventoryRefetch,
    isSuccess: InventorySucess,
    isLoading: InventoryLoading,
  } = useInventory();

  const [activeAccountCard, setActiveAccountCard] = useState<number | undefined>(undefined);
  const [activeInventoryCard, setActiveInventoryCard] = useState<number | null>(null);
  const [activeInventoryCardDesc, setActiveInventoryCardDesc] = useState<string>('');
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>();
  const [showComponent, setShowComponent] = useState(false);

  const [activeTab, setActiveTab] = useState<string>('1');
  const handleVisibilityOfAccountModal = (cardId: number) => {
    setActiveAccountCard(cardId);
  };

  const handleVisibilityOfInventoryModal = (cardId: number, cardDescription: string) => {
    setActiveInventoryCard(cardId);
    setActiveInventoryCardDesc(cardDescription);
    setActiveTab('1');
  };
  console.log(activeInventoryCard);
  const [searchQuery, setSearchQuery] = useState('');
  const [search, setSearch] = useState('');

  return (
    <>
      <Space
        direction="vertical"
        style={{
          width: '100%',
          height: '85vh',
          background: '#fff',
        }}
        size={[0, 20]}
      >
        <Row className="firstTitle">
          <Col span={24}>
            <h2>{t('approval_dashboard')}</h2>
          </Col>
          <Col span={24}>
            <div style={{ float: 'right' }}>
              <AntButton className="btn" icon={<SyncOutlined />} />
            </div>
          </Col>
        </Row>

        <Row gutter={[16, 40]} style={{ width: '100%', height: '100%', paddingLeft: '1%' }}>
          <Col xxl={11} xs={24} sm={24} md={12} lg={12} xl={12}>
            <Row align="middle" className="AccountHeading">
              <Col xs={24} sm={12} xl={12} lg={12}>
                <h3 style={{ fontSize: '18px' }}>{t('accounts_dashboard')}</h3>
              </Col>
              <Col xs={24} sm={12}>
                <div style={{ float: 'right' }}>
                  <Search
                    placeholder={t('search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <Row gutter={[2, 16]} className="approvalcardsstyle">
              {Account?.data?.Data?.Result.filter((card: any) =>
                card.VoucherType.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((filteredCard: any) => (
                <Col
                  xs={24}
                  xl={11}
                  xxl={8}
                  lg={12}
                  md={12}
                  sm={12}
                  key={filteredCard.TypeID}
                  style={{ marginTop: '0%' }}
                >
                  <Card
                    style={gridStyle}
                    className="singleCard"
                    onClick={() => handleVisibilityOfAccountModal(filteredCard.TypeID)}
                    cover={
                      <>
                        <h2 className="accountsdashboardcounts">{filteredCard.Count}</h2>
                        <h3 className="accountsdashboarddescription">{filteredCard.VoucherType}</h3>
                      </>
                    }
                  ></Card>
                </Col>
              ))}
            </Row>
          </Col>
          <Col xxl={11} xs={24} sm={24} md={11} lg={11} xl={11}>
            <Row align="middle" className="AccountHeading">
              <Col xs={24} sm={12} xl={12} lg={12}>
                <h3 style={{ fontSize: '18px' }}>{t('inventory_dashboard')}</h3>
              </Col>
              <Col xs={24} sm={12}>
                <div style={{ float: 'right' }}>
                  <Search placeholder={t('search')} value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
              </Col>
            </Row>
            <Row gutter={[2, 4]} className="approvalcardsstyle">
              {Inventory?.data?.Data?.Result.filter((filteredCard: any) =>
                filteredCard.Description.toLowerCase().includes(search.toLowerCase())
              ).map((card: any) => (
                <Col xs={24} xl={11} lg={12} md={12} xxl={8} sm={12} key={card.TypeID} style={{ marginTop: '0%' }}>
                  <Card
                    style={gridStyle}
                    className="singleCard"
                    onClick={() => handleVisibilityOfInventoryModal(card.TypeID, card.Description)}
                    cover={
                      <>
                        <h3 className="accountsdashboardcounts">{card.Count}</h3>
                        <h3 className="accountsdashboarddescription">{card.Description}</h3>
                      </>
                    }
                  ></Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        {Inventory?.data?.Data?.Result.map((card: any) => (
          <Modal
            width={1700}
            key={card.TypeID}
            bodyStyle={{ maxHeight: '85vh', overflowY: 'auto' }}
            title
            open={card.TypeID === activeInventoryCard}
            onCancel={() => {
              setActiveInventoryCard(null);
              setSelectedRecordId(null);
              setShowComponent(false);
            }}
            footer={null}
          >
            {activeInventoryCard === 42 ? (
              <InventoryModal
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                selectedRecordId={selectedRecordId}
                setSelectedRecordId={setSelectedRecordId}
                cardTitle={activeInventoryCardDesc}
                approvalId={activeInventoryCard}
                appRovalUnApproval={false}
                showComponent={showComponent}
                setShowComponent={setShowComponent}
              />
            ) : null}
          </Modal>
        ))}

        <ApprovalModal
          width={1500}
          key={activeAccountCard}
          open={activeAccountCard !== undefined}
          handleClose={() => setActiveAccountCard(undefined)}
        >
          {activeAccountCard === null ? null : (
            <div className="">
              <VoucherModal approvalId={activeAccountCard} appRovalUnApproval={false} />
            </div>
          )}
        </ApprovalModal>
      </Space>
    </>
  );
};

export default Approval_dashboard;
