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
    <Modal
      destroyOnClose
      centered
      width={390}
      title={title}
      open={visibility}
      onCancel={type === 'confirmation' ? onNoClicked : onOk}
      footer={null}
    >
      <div style={{ textAlign: 'center' }}>
        {renderIcon()}
        <div>{message}</div>
        <div style={{ marginTop: '1em', display: 'flex', justifyContent: 'center' }}>
          {type !== 'confirmation' && (
            <AntButton label="Ok" style={{ /* backgroundColor: 'blue',*/ width: '80px' }} onClick={onOk} />
          )}
          {type === 'confirmation' && (
            <>
              <AntButton danger style={{ /*color: '#dd2923',*/ width: '80px' }} onClick={onYesClicked} label="Yes" />
              <AntButton
                style={{
                  backgroundColor: 'white',
                  color: '#28971e',
                  border: '1px solid',
                  marginLeft: '5px',
                  width: '80px',
                }}
                onClick={onNoClicked}
                label="No"
              />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CustomPopup;
