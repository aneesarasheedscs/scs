import React from 'react';
import {
  SmileOutlined,
  PhoneOutlined,
  SettingOutlined,
  KeyOutlined,
  BellOutlined,
  DatabaseOutlined,
  UserOutlined,
  UserAddOutlined,
  PhoneFilled,
  WhatsAppOutlined,
} from '@ant-design/icons';
import { Col, Dropdown, MenuProps, Row } from 'antd';
function SupportButton() {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <p> +92 302 6967769</p>,
      //   icon: <PhoneOutlined />,
    },
    {
      key: '2',
      label: <p> +92 300 0441807</p>,
      //   icon: <PhoneOutlined />,
    },
  ];
  return (
    <>
      <Dropdown menu={{ items }} overlayStyle={{ border: '2px solid #006640', borderRadius: '5%' }}>
        <a onClick={(e) => e.preventDefault()}>
          <Row gutter={0} className="headerLogoutBtn">
            <Col span={24}>
              <p style={{}}>
                {' '}
                <WhatsAppOutlined style={{ color: 'green', fontSize: '20px', marginRight: '5%' }} />
                <span style={{ color: 'black' }}> Support </span>
              </p>
            </Col>
          </Row>
        </a>
      </Dropdown>
    </>
  );
}

export default SupportButton;
