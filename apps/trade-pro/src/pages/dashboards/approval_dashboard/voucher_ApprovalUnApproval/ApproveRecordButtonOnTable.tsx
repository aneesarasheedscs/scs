import { AntButton } from '@scs/ui';
import { Col, Row, Tooltip } from 'antd';
import { FileProtectOutlined } from '@ant-design/icons';
import React from 'react';

const ApproveRecordButtonOnTable: React.FC<{ SelectedCount: number; ApproveRecords(): any }> = ({
  SelectedCount,
  ApproveRecords,
}) => {
  return (
    <div>
      <Row align="middle" className="row">
        <Col xs={24} sm={12}>
          <div style={{ float: 'right' }}>
            <Tooltip placement="top" title="Approved Selected Vouchers">
              <AntButton
                icon={<FileProtectOutlined />}
                className="btn"
                onClick={ApproveRecords}
                label={`${SelectedCount}`}
              />
            </Tooltip>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ApproveRecordButtonOnTable;
