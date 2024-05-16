import { Col, Modal, Row } from 'antd';
import { ReactNode } from 'react';
import { AntButton } from '../button/AntButton';
import { FilterFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
export function SearchCriteriaWrapper({ open, children, handleOpen, handleClose }: TSearchCriteriaWrapper) {
  const { t } = useTranslation();
  return (
    <>
      <AntButton ghost icon={<FilterFilled />} label={t('search_criteria')} onClick={handleOpen} />
      <Modal open={open} onCancel={handleClose} footer={null} width={900} destroyOnClose={true}>
        <Row
          style={{
            marginBottom: '5px',
            width: '100%',
          }}
          className="row-border"
        >
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
            <h2 style={{ borderBottom: '1px solid lightgrey', marginTop: -5, marginBottom: 10 }}>
              {t('search_criteria')}
            </h2>
            {children}
          </Col>
        </Row>
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
