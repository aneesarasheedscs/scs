import { Modal } from 'antd';
import { ReactNode } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { AntButton } from '@tradePro/components';
import { useTranslation } from 'react-i18next';

export function AddButtonforItems({ open, children, handleOpen, handleClose }: TButtonTypes) {
  return (
    <>
      <AntButton icon={<PlusOutlined />} label="" onClick={handleOpen} />
      <Modal open={open} onCancel={handleClose} footer={null} width={900}>
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
export function AddButtonforBenefits({ open, children, handleOpen, handleClose }: TButtonTypes) {
  const { t } = useTranslation();
  return (
    <>
      <AntButton icon={''} label={t('define_benefits')} onClick={handleOpen} />
      <Modal open={open} onCancel={handleClose} footer={null} width={900}>
        {children}
      </Modal>
    </>
  );
}
