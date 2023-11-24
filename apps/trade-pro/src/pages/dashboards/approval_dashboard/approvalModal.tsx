import { Modal } from 'antd';
import { ReactNode } from 'react';

export function ApprovalModal({ width, key, open, children, handleOpen, handleClose }: ApprovalModalWrapper) {
  return (
    <>
      <Modal
        bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
        width={width}
        key={key}
        open={open}
        onCancel={handleClose}
        destroyOnClose={true}
        footer={null}
      >
        {children}
      </Modal>
    </>
  );
}
type ApprovalModalWrapper = {
  width?: number;
  key?: number;
  open?: boolean;
  children?: ReactNode;
  handleOpen?: VoidFunction;
  handleClose?: VoidFunction;
};
