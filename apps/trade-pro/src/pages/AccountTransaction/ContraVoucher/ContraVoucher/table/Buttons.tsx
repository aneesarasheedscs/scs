import { AntButton } from '@tradePro/components';
import { Badge, Col, Row, Tooltip } from 'antd';
import { PrinterFilled, LinkOutlined, EditFilled, FileTextOutlined } from '@ant-design/icons';
interface Props {
  selectedRecordId: any;
  setSelectedRecordId: (Id: number | null) => void;
  setActiveTab: (tab: string) => void;
}
function Buttons({ selectedRecordId, setSelectedRecordId, setActiveTab }: Props) {
  return (
    <div>
      <Row align="middle" className="row">
        <Col xs={24} sm={12}>
          <Tooltip placement="top" title="PrintPrivew">
            <AntButton
              icon={<PrinterFilled style={{ fontSize: 20 }} />}
              style={{ border: '1px solid #d6d6d6', marginRight: 2 }}
              className=""
              ghost
            />
          </Tooltip>
          <Tooltip placement="top" title="Attachment">
            <Badge count={'1'}>
              <AntButton
                ghost
                icon={<LinkOutlined style={{ fontSize: 20, fontWeight: 'bold' }} />}
                className="attachment"
              />
            </Badge>
          </Tooltip>
        </Col>
        <Col xs={24} sm={12}>
          <div style={{ border: '', display: 'flex', justifyContent: 'end' }}>
            <Tooltip placement="top" title="Edit">
              <Badge count={`${1}`}>
                <AntButton
                  ghost
                  icon={<EditFilled style={{ color: 'green', fontSize: 20 }} />}
                  className="btn_for_revision"
                  onClick={() => {
                    setSelectedRecordId(selectedRecordId), setActiveTab('2');
                  }}
                />
              </Badge>
            </Tooltip>

            <Tooltip placement="top" title="Take Notes">
              <AntButton
                className="btn"
                ghost
                style={{ border: '1px solid #d6d6d6', marginLeft: '2%' }}
                icon={<FileTextOutlined style={{ fontSize: 20 }} />}
                // onClick={() => handlVoucherNotesButtonClick()}
              />
            </Tooltip>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Buttons;
