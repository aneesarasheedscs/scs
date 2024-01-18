import React, { useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Card, Col, Dropdown, MenuProps, Modal, Row } from 'antd';
function CreateButton() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const items: MenuProps['items'] = [
    // {
    //   key: '1',
    //   label: (
    //     <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
    //       Click to Open
    //     </a>
    //   ),
    //   //   icon: <SmileOutlined />,
    // },
  ];
  return (
    <>
      <Dropdown menu={{ items }} overlayStyle={{ visibility: 'hidden' }}>
        <a
          onClick={() => {
            handleOpen();
          }}
        >
          <Row gutter={0} className="headerLogoutBtn">
            <Col span={24}>
              <p style={{}}>
                {' '}
                <PlusCircleOutlined style={{ color: 'green', fontSize: '20px', marginRight: '5%' }} />
                <span style={{ color: 'black' }}> Create </span>
              </p>
            </Col>
          </Row>
        </a>
      </Dropdown>
      <Modal open={open} onCancel={handleClose} width={800} footer={null} onOk={handleClose}>
        <Row gutter={[10, 10]} style={{ marginTop: '3%' }}>
          <Col span={12}>
            <Card hoverable> Module 1 </Card>
          </Col>
          <Col span={12}>
            <Card hoverable> Module 2 </Card>
          </Col>
          <Col span={12}>
            <Card hoverable> Module 3 </Card>
          </Col>
          <Col span={12}>
            <Card hoverable> Module 4 </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default CreateButton;
