import { Col, Dropdown, MenuProps, Modal, Row } from 'antd';
import { BellOutlined } from '@ant-design/icons';

function NotificationButton() {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Notifications
        </a>
      ),
      //   icon: <SmileOutlined />,
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Updates
        </a>
      ),
      //   icon: <SmileOutlined />,
    },
  ];
  return (
    <>
      <Dropdown menu={{ items }} overlayStyle={{ border: '2px solid #006640', borderRadius: '5%' }}>
        <a onClick={(e) => e.preventDefault()}>
          <Row gutter={0}>
            <Col span={24}>
              <p>
                <BellOutlined style={{ color: 'green', fontSize: '20px', marginRight: '5%' }} />
              </p>
            </Col>
          </Row>
        </a>
      </Dropdown>
    </>
  );
}

export default NotificationButton;
