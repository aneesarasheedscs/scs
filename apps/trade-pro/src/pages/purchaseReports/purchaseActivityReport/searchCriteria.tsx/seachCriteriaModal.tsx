import { Modal } from 'antd';
import { ReactNode } from 'react';
import { FilterFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { AntButton } from '@tradePro/components';
export function SearchCriteriaWrapper({ open, children, handleOpen, handleClose }: TSearchCriteriaWrapper) {
  const { t } = useTranslation();
  return (
    <>
      <AntButton ghost icon={<FilterFilled />} label={t('search_criteria')} onClick={handleOpen} />
      <Modal open={open} onCancel={handleClose} footer={null} width={900}>
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
