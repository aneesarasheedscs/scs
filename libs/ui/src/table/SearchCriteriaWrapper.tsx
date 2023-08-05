import { Modal } from 'antd';
import { ReactNode, useState } from 'react';
import { AntButton } from '../button/AntButton';
import { FilterFilled } from '@ant-design/icons';

function SearchCriteriaWrapper({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AntButton ghost icon={<FilterFilled />} label="Search Criteria" onClick={handleOpen} />
      <Modal open={open} onCancel={handleClose} footer={null}>
        {children}
      </Modal>
    </>
  );
}

export default SearchCriteriaWrapper;
