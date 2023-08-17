import { Modal } from 'antd';
import { ReactNode } from 'react';
import { AntButton } from '../../../../../../../libs/ui/src/button/AntButton';
import { PlusOutlined } from '@ant-design/icons';

export function AddButtonforItems({ open, children, handleOpen, handleClose }: TButtonTypes) {
  return (
    <>
      <AntButton icon={<PlusOutlined />} label="" onClick={handleOpen} />
      <Modal open={open} onCancel={handleClose} footer={null} width={1000}>
        {children}
      </Modal>
    </>
  );
}

type TButtonTypes = {
  open?: boolean;
  children?: ReactNode;
  handleOpen?: VoidFunction;
  handleClose?: VoidFunction;
};
