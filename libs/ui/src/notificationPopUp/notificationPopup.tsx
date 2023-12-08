import React from 'react';
import { Modal, Button, Typography } from 'antd';
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { AntButton } from '../button/AntButton';

const { Text } = Typography;

const CustomPopup: React.FC<{
  type?: string;
  title?: string;
  message?: string;
  visibility?: boolean;
  onOk?: any;
  onYesClicked?: any;
  onNoClicked?: any;
}> = (props) => {
  const { type, title, message, visibility, onOk, onYesClicked, onNoClicked } = props;

  const renderIcon = () => {
    if (type === 'warning') {
      return <ExclamationCircleOutlined style={{ color: '#f0ad4e', fontSize: '60px' }} />;
    } else if (type === 'success') {
      return <CheckCircleOutlined style={{ color: '#28971e', fontSize: '60px' }} />;
    } else if (type === 'error') {
      return <CloseCircleOutlined style={{ color: '#dd2923', fontSize: '60px' }} />;
    } else if (type === 'confirmation') {
      return <QuestionCircleOutlined style={{ fontSize: '60px', color: '#28971e' }} />;
    }
  };

  return (
    <Modal title={title} open={visibility} onCancel={onOk} footer={null}>
      <div style={{ textAlign: 'center' }}>
        {renderIcon()}
        <Text>{message}</Text>
        <div style={{ marginTop: '1em', display: 'flex', justifyContent: 'center' }}>
          {type !== 'confirmation' && (
            <AntButton label="Ok" style={{ /* backgroundColor: 'blue',*/ color: '#28971e' }} onClick={onOk} />
          )}
          {type === 'confirmation' && (
            <>
              <AntButton style={{ color: '#dd2923' }} onClick={onYesClicked} label="Yes" />
              <AntButton style={{ color: '#28971e', marginLeft: '5px' }} onClick={onNoClicked} label="No" />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CustomPopup;
