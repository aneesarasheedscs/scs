import { AntButton } from '@scs/ui';
import { Col, Row, Tooltip } from 'antd';
import {
  PrinterFilled,
  LinkOutlined,
  FileProtectOutlined,
  EditFilled,
  FileTextOutlined,
  AlignLeftOutlined,
} from '@ant-design/icons';
import React from 'react';

const Buttons: React.FC<{ SelectedDocumentsCount: number; ApproveSelectedVouchers(): any }> = ({
  SelectedDocumentsCount,
  ApproveSelectedVouchers,
}) => {
  return (
    <div>
      <Row align="middle" className="row">
        <Col xs={24} sm={12}>
          <AntButton icon={<PrinterFilled />} className="btn" />

          <Tooltip placement="top" title="Attachment">
            <AntButton icon={<LinkOutlined />} className="btn" />
          </Tooltip>
        </Col>
        <Col xs={24} sm={12}>
          <div style={{ float: 'right' }}>
            <Tooltip placement="top" title="Approved Selected Vouchers">
              <AntButton
                icon={<FileProtectOutlined />}
                className="btn"
                onClick={ApproveSelectedVouchers}
                label={`${SelectedDocumentsCount}`}
              />
            </Tooltip>
            <Tooltip placement="top" title="Make For Revision">
              <AntButton icon={<EditFilled />} className="btn" label={`${SelectedDocumentsCount}`} />
            </Tooltip>
            <Tooltip placement="top" title="Take Notes">
              <AntButton className="btn" icon={<FileTextOutlined />} />
            </Tooltip>
            <Tooltip placement="top" title="General Ledger Of Header Account">
              <AntButton className="btn" icon={<AlignLeftOutlined />} />
            </Tooltip>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Buttons;
