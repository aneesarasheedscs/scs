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

const Buttons: React.FC<{ SelectedDocumentsCount: number; ApproveSelectedVouchers: any; ForRevision?: boolean }> = ({
  SelectedDocumentsCount,
  ApproveSelectedVouchers,
  ForRevision,
}) => {
  return (
    // <div>
    <Row className="col" style={{ width: '100%' }}>
      <Col xs={12} sm={12}>
        <AntButton icon={<PrinterFilled />} className="btn" />
        <Tooltip placement="top" title="Attachment">
          <AntButton icon={<LinkOutlined />} className="btn" />
        </Tooltip>
      </Col>

      <Col xs={12} sm={12} xl={12} style={{ display: 'flex', justifyContent: 'end' }}>
        <Tooltip placement="top" title="Approved Selected Vouchers">
          <AntButton
            icon={<FileProtectOutlined />}
            className="btn"
            onClick={() => ApproveSelectedVouchers(false)}
            label={`${SelectedDocumentsCount}`}
          />
        </Tooltip>
        {!ForRevision ? (
          <Tooltip placement="top" title="Make For Revision">
            <AntButton
              icon={<EditFilled />}
              className="btn"
              onClick={() => ApproveSelectedVouchers(true)}
              label={`${SelectedDocumentsCount}`}
            />
          </Tooltip>
        ) : null}
        {/* <Tooltip placement="top" title="Take Notes">
              <AntButton className="btn" icon={<FileTextOutlined />} />
            </Tooltip> */}
        {/* <Tooltip placement="top" title="General Ledger Of Header Account">
              <AntButton className="btn" icon={<AlignLeftOutlined />} />
            </Tooltip> */}
      </Col>
    </Row>
    // </div>
  );
};

export default Buttons;
