import { Modal } from 'antd';
import { ReactNode } from 'react';
import { AntButton } from '@tradePro/components';
import { useTranslation } from 'react-i18next';

export function AddButtonforItems({ open, children, handleOpen, handleClose }: TButtonTypes) {
  const { t } = useTranslation();
  return (
    <>
      <AntButton label={t('allocate_discount_item_to_discount_type')} onClick={handleOpen} />
      <Modal open={open} onCancel={handleClose} footer={null} width={800}>
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
