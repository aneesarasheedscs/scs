import { Col, Row, Tabs, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import { AntButton } from '@scs/ui';
import CardView from './cardView';
import VoucherTable from './VoucherTable';
import { useTranslation } from 'react-i18next';
import { useGetVouchersModernHistoryHeaderData } from '../queries/approvel';

const VoucherModal: React.FC<{ approvalId: number | undefined; appRovalUnApproval: boolean }> = (props) => {
  const { approvalId, appRovalUnApproval } = props;
  const [showComponent, setShowComponent] = useState(false);
  const [PendingForApprovalTabActive, setPendingForApprovalTabActive] = useState<boolean>(true);
  const [documentTypeId, setdocumentTypeId] = useState(0);
  const [RecordsPendingForApproval, setRecordsPendingForApproval] = useState(0);
  const [RecordsPendingForRevision, setRecordsPendingForRevision] = useState(0);
  const [filteredData, setfilteredData] = useState([]);

  const { t } = useTranslation();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  useEffect(() => {
    if (approvalId === 0) setdocumentTypeId(1);
    else if (approvalId === 1) setdocumentTypeId(2);
    else if (approvalId === 2) setdocumentTypeId(3);
    else if (approvalId === 3) setdocumentTypeId(4);
    else if (approvalId === 4) setdocumentTypeId(6);
    else if (approvalId === 5) setdocumentTypeId(7);
    else if (approvalId === 6) setdocumentTypeId(10);
    else if (approvalId === 7) setdocumentTypeId(26);
    else if (approvalId === 8) setdocumentTypeId(5);
    else if (approvalId === 9) setdocumentTypeId(27);
  }, []);

  const {
    data: Data,
    isError: VouchersError,
    refetch: VouchersRefetch,
    isFetching,
    isSuccess: VouchersSucess,
    isLoading: VouchersLoading,
  } = useGetVouchersModernHistoryHeaderData(documentTypeId.toString(), 0, true, 'Not All', appRovalUnApproval);

  useEffect(() => {
    if (!VouchersLoading && VouchersSucess) {
      let FilteredData = Data?.data?.Data?.Result.filter(
        (item: any) => item.ActionTypeId == !PendingForApprovalTabActive
      );
      setfilteredData(FilteredData);

      if (PendingForApprovalTabActive) {
        setRecordsPendingForApproval(FilteredData.length);
        setRecordsPendingForRevision(Data?.data?.Data?.Result.length - FilteredData?.length);
      } else {
        setRecordsPendingForApproval(Data?.data?.Data?.Result.length - FilteredData?.length);
        setRecordsPendingForRevision(FilteredData.length);
      }
    }
  }, [Data, PendingForApprovalTabActive]);

  const toggleCardView = () => {
    setShowComponent(true);
  };
  const toggleGridView = () => {
    setShowComponent(false);
  };

  const handleTabChange = (key: any) => {
    console.log(key);
    if (key === '1') {
      setPendingForApprovalTabActive(true);
    } else if (key === '2') {
      setPendingForApprovalTabActive(false);
    }
  };

  return (
    <div>
      <Tabs
        type="card"
        size="large"
        defaultActiveKey="1"
        className="tabs-margin-bottom-0"
        onChange={(key) => handleTabChange(key)}
        items={[
          {
            key: '1',
            label: `${t('pending_for_approval')} ${RecordsPendingForApproval}`,
            children: (
              <>
                <Row align="middle" className="col">
                  <Col xs={24} sm={12}>
                    <h2> {appRovalUnApproval ? `${t('approved_vouchers')}` : `${t('unapproved_vouchers')}`} </h2>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div style={{ float: 'right' }}>
                      <AntButton
                        onClick={toggleGridView}
                        style={{
                          background: showComponent ? '' : '#fff',
                          color: showComponent ? '' : `${colorPrimary}`,
                          border: showComponent ? '' : `1px solid ${colorPrimary}`,
                        }}
                        className="btn"
                        label={t('grid_view')}
                      />
                      <AntButton
                        onClick={toggleCardView}
                        style={{
                          background: showComponent ? '#fff' : '',
                          color: showComponent ? `${colorPrimary}` : '',
                          border: showComponent ? `1px solid ${colorPrimary}` : '',
                        }}
                        className="btn"
                        label={t('card_view')}
                      />
                    </div>
                  </Col>
                </Row>
                <div>
                  {showComponent ? (
                    <CardView
                      documentTypeId={documentTypeId}
                      approvalUnApproval={appRovalUnApproval}
                      dataSource={filteredData}
                    />
                  ) : (
                    <VoucherTable
                      documentTypeId={documentTypeId}
                      approvalUnApproval={appRovalUnApproval}
                      dataSource={filteredData}
                      VouchersRefetch={VouchersRefetch}
                      VouchersLoading={VouchersLoading}
                      isFetching={isFetching}
                    />
                  )}
                </div>
              </>
            ),
          },
          {
            key: '2',
            label: `${t('pending_for_revision')} ${RecordsPendingForRevision}`,
            children: (
              <>
                <Row align="middle" className="col">
                  <Col xs={24} sm={12}>
                    <h2> {appRovalUnApproval ? `${t('approved_vouchers')}` : `${t('unapproved_vouchers')}`} </h2>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div style={{ float: 'right' }}>
                      <AntButton onClick={toggleGridView} className="btn" label="Grid View" />
                      <AntButton onClick={toggleCardView} className="btn" label="Card View" />
                    </div>
                  </Col>
                </Row>
                <div>
                  {showComponent ? (
                    <CardView
                      documentTypeId={documentTypeId}
                      approvalUnApproval={appRovalUnApproval}
                      dataSource={filteredData}
                      ForRevision={true}
                    />
                  ) : (
                    <VoucherTable
                      documentTypeId={documentTypeId}
                      approvalUnApproval={appRovalUnApproval}
                      dataSource={filteredData}
                      ForRevision={true}
                    />
                  )}
                </div>{' '}
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default VoucherModal;
