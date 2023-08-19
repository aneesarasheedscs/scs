import { Modal } from 'antd';
import { ReactNode } from 'react';
import { AntButton } from '../button/AntButton';
import { FilterFilled } from '@ant-design/icons';

export function SearchCriteriaWrapper({ open, children, handleOpen, handleClose }: TSearchCriteriaWrapper) {
  return (
    <>
      <AntButton ghost icon={<FilterFilled />} label="Search Criteria" onClick={handleOpen} />
      <Modal open={open} onCancel={handleClose} footer={null}>
        {children}
      </Modal>
    </>
  );
}

type TSearchCriteriaWrapper = {
  open?: boolean;
  children?: ReactNode;
  handleOpen?: VoidFunction;
  handleClose?: VoidFunction;
};
