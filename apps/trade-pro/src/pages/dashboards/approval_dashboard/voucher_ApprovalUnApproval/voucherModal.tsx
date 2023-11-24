import { Col, Row, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { AntButton } from '@scs/ui';
import CardView from './cardView';
import VoucherTable from './VoucherTable';
import { useTranslation } from 'react-i18next';

const VoucherModal: React.FC<{ approvalId: number | undefined; appRovalUnApproval: boolean }> = (props) => {
  const { approvalId, appRovalUnApproval } = props;
  const [showComponent, setShowComponent] = useState(false);
  const [documentTypeId, setdocumentTypeId] = useState(0);
  const { t } = useTranslation();
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
  });

  const toggleCardView = () => {
    setShowComponent(true);
  };
  const toggleGridView = () => {
    setShowComponent(false);
  };

  return (
    <div>
      <Tabs
        type="card"
        size="large"
        defaultActiveKey="1"
        className="tabs-margin-bottom-0"
        items={[
          {
            key: '1',
            label: `${t('pending_for_approval')}`,
            children: (
              <>
                <Row align="middle" className="">
                  <Col xs={24} sm={12}>
                    <h2>
                      {' '}
                      {appRovalUnApproval ? `${t('vouchers_for_unapproval')}` : `${t('vouchers_for_approval')}`}{' '}
                    </h2>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div style={{ float: 'right' }}>
                      <AntButton onClick={toggleCardView} className="btn" label="Card View" />

                      <AntButton onClick={toggleGridView} className="btn" label="Grid View" />
                    </div>
                  </Col>
                </Row>
                <div>
                  {showComponent ? (
                    <CardView documentTypeId={documentTypeId} approvalUnApproval={appRovalUnApproval} />
                  ) : (
                    <VoucherTable documentTypeId={documentTypeId} />
                  )}
                </div>
              </>
            ),
          },
          { key: '2', label: `${t('pending_for_revision')}`, children: <> </> },
        ]}
      />
    </div>
  );
};

export default VoucherModal;
