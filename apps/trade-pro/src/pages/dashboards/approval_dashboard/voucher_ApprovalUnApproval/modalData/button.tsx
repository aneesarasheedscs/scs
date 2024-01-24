import { AntButton } from '@scs/ui';
import { Badge, Col, Row, Tooltip } from 'antd';
import {
  PrinterFilled,
  LinkOutlined,
  FileProtectOutlined,
  EditFilled,
  FileTextOutlined,
  AlignLeftOutlined,
} from '@ant-design/icons';
import React from 'react';

const Buttons: React.FC<{
  SelectedDocumentsCount: number;
  ApproveSelectedVouchers: any;
  ForRevision?: boolean;
  VoucherNotesByApprovalPersonVisible?: boolean;
  handlVoucherNotesButtonClick?: any;
}> = ({
  SelectedDocumentsCount,
  ApproveSelectedVouchers,
  ForRevision,
  VoucherNotesByApprovalPersonVisible,
  handlVoucherNotesButtonClick,
}) => {
  return (
    // <div>
    <Row className="col" style={{ width: '100%' }}>
      <Col xs={21} sm={21}>
        <AntButton title="Print" icon={<PrinterFilled />} className="btn" />
        <Tooltip placement="top" title="Attachment">
          <Badge count={'1'}>
            <AntButton icon={<LinkOutlined style={{ fontSize: 17 }} />} className="attachment" />
          </Badge>
        </Tooltip>
      </Col>

      {ForRevision ? (
        <Col xs={2} sm={2} xl={2} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Badge count={`${SelectedDocumentsCount}`}>
            <Tooltip placement="top" title="Approved Selected Vouchers">
              <AntButton
                icon={<FileProtectOutlined style={{ fontSize: 17 }} />}
                className="btn"
                onClick={() => ApproveSelectedVouchers(false)}
                // label={`${SelectedDocumentsCount}`}
              />
            </Tooltip>
          </Badge>

          {VoucherNotesByApprovalPersonVisible && (
            <Tooltip placement="top" title="Take Notes">
              <AntButton className="btn" icon={<FileTextOutlined />} onClick={() => handlVoucherNotesButtonClick()} />
            </Tooltip>
          )}
        </Col>
      ) : (
        <Col xs={3} sm={3} xl={3} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Badge count={`${SelectedDocumentsCount}`}>
            <Tooltip placement="top" title="Approved Selected Vouchers">
              <AntButton
                icon={<FileProtectOutlined style={{ fontSize: 17 }} />}
                className="btn"
                onClick={() => ApproveSelectedVouchers(false)}
                // label={`${SelectedDocumentsCount}`}
              />
            </Tooltip>
          </Badge>

          <Tooltip placement="top" title="Make For Revision">
            <Badge count={`${SelectedDocumentsCount}`}>
              <AntButton
                icon={<EditFilled style={{ color: '#fff', fontSize: 17 }} />}
                className="btn_for_revision"
                onClick={() => ApproveSelectedVouchers(true)}
                // label={`${SelectedDocumentsCount}`}
              />
            </Badge>
          </Tooltip>

          {VoucherNotesByApprovalPersonVisible && (
            <Tooltip placement="top" title="Take Notes">
              <AntButton className="btn" icon={<FileTextOutlined />} onClick={() => handlVoucherNotesButtonClick()} />
            </Tooltip>
          )}
          {/* <Tooltip placement="top" title="General Ledger Of Header Account">
            <AntButton className="btn" icon={<AlignLeftOutlined />} />
          </Tooltip> */}
        </Col>
      )}
    </Row>
    // </div>
  );
};

export default Buttons;
