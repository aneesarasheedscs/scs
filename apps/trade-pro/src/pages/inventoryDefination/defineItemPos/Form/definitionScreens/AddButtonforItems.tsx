import { Modal } from 'antd';
import { ReactNode } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { AntButton } from '@tradePro/components';

export function AddButtonforItems({ open, children, handleOpen, handleClose }: TButtonTypes) {
  return (
    <>
      <AntButton icon={<PlusOutlined />} label="" onClick={handleOpen} />
      <Modal open={open} onCancel={handleClose} footer={null} width={1200}>
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
