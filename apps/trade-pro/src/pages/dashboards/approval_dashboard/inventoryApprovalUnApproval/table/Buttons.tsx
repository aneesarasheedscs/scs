import { AntButton } from '@scs/ui';
import { Col, Row, Tooltip } from 'antd';
import { PrinterFilled, LinkOutlined, EditFilled } from '@ant-design/icons';
import { TRequisitionOrderforApprovalHistory } from '../types';

interface TButtons {
  setActiveTab: (tab: string) => void;
  selectedCardData: TRequisitionOrderforApprovalHistory;
  setSelectedRecordId: (id: number | null) => void;
}
const Buttons = ({ selectedCardData, setActiveTab, setSelectedRecordId }: TButtons) => {
  const handleEditForm = () => {
    setActiveTab('2');
    setSelectedRecordId(selectedCardData?.Id);
    console.log('clicked');
  };
  console.log(selectedCardData);
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
            <Tooltip placement="top" title="Edit">
              <AntButton icon={<EditFilled />} className="btn" onClick={handleEditForm} />
            </Tooltip>
            <Tooltip placement="top" title="Print">
              <AntButton className="btn" icon={<PrinterFilled />} />
            </Tooltip>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Buttons;
