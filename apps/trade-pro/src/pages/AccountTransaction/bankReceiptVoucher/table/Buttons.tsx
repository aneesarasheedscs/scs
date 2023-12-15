import { AntButton } from '@tradePro/components';
import { Col, Row, Tooltip } from 'antd';
import { PrinterFilled, LinkOutlined, EditFilled } from '@ant-design/icons';

function Buttons() {
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
              <AntButton icon={<EditFilled />} className="btn" />
            </Tooltip>
            <Tooltip placement="top" title="Print">
              <AntButton className="btn" icon={<PrinterFilled />} />
            </Tooltip>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Buttons;
