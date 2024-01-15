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
  width: '100%',
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
        }}
        size={[0, 48]}
      >
        <Row align="middle" className="firstTitle">
          <Col xs={24} sm={12}>
            <h2>{t('approval_dashboard')}</h2>
          </Col>
          <Col xs={24} sm={12}>
            <div style={{ float: 'right' }}>
              <AntButton className="btn" icon={<SyncOutlined />} />
            </div>
          </Col>
        </Row>

        <Row style={{ width: '100%', height: '100%', gap: '2%' }}>
          <Col span={11}>
            <Row align="middle" className="AccountHeading">
              <Col xs={24} sm={12}>
                <h3>{t('accounts_dashboard')}</h3>
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
            <Row
              gutter={[16, 0]}
              style={{
                backgroundColor: '#f1f1f1',
                padding: 9,
                borderRadius: '1%',
                marginLeft: '2px',
                height: '100%',
              }}
            >
              {Account?.data?.Data?.Result.filter((card: any) =>
                card.VoucherType.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((filteredCard: any) => (
                <Col xs={24} xl={8} key={filteredCard.TypeID} style={{ marginTop: '2%' }}>
                  <Card
                    style={gridStyle}
                    className="singleCard"
                    onClick={() => handleVisibilityOfAccountModal(filteredCard.TypeID)}
                  >
                    <Tag id="ribbon" color="#5A54F9">
                      {filteredCard.Count}
                    </Tag>
                    <p style={{ display: 'none' }}> {filteredCard.DocumentTypeId}</p>
                    <h3 style={{ marginTop: '1%' }}>{filteredCard.VoucherType}</h3>
                    <EyeFilled />
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
          <Col span={11}>
            <Row align="middle" className="AccountHeading">
              <Col xs={24} sm={12}>
                <h3>{t('inventory_dashboard')}</h3>
              </Col>
              <Col xs={24} sm={12}>
                <div style={{ float: 'right' }}>
                  <Search placeholder={t('search')} value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
              </Col>
            </Row>
            <Row
              gutter={[16, 0]}
              style={{
                backgroundColor: '#f1f1f1',
                padding: 9,
                borderRadius: '1%',
                marginLeft: '2px',
                height: '100%',
              }}
            >
              {Inventory?.data?.Data?.Result.filter((filteredCard: any) =>
                filteredCard.Description.toLowerCase().includes(search.toLowerCase())
              ).map((card: any) => (
                <Col xs={24} xl={8} key={card.TypeID} style={{ marginTop: '2%' }}>
                  <Card
                    style={gridStyle}
                    className="singleCard"
                    onClick={() => handleVisibilityOfInventoryModal(card.TypeID, card.Description)}
                  >
                    <Tag id="ribbon" color="#5A54F9">
                      {card.Count}
                    </Tag>
                    <h3>{card.Description}</h3>
                    <EyeFilled />
                  </Card>
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
