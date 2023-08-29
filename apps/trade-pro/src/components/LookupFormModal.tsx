import { isNumber } from 'lodash';
import { ReactNode } from 'react';
import { AntButton, TableLoader } from '.';
import { Col, Form, FormInstance, Modal, Row } from 'antd';
import { useTranslation } from 'react-i18next';

function LookupFormModal({
  open,
  form,
  width,
  title,
  onFinish,
  children,
  isLoading,
  isFetching,
  handleClose,
  isDataLoading,
  selectedRecordId,
  handleSaveMoreClick,
}: TLookupFormModal) {
  const { t } = useTranslation();
  return (
    <Modal
      open={open}
      footer={null}
      width={900}
      title={title}
      onOk={handleClose}
      maskClosable={false}
      onCancel={handleClose}
    >
      {isDataLoading || isFetching ? (
        <TableLoader numberOfSkeletons={3} />
      ) : (
        <Form form={form} onFinish={onFinish} initialValues={{ remember: true }}>
          {children}

          <Form.Item>
            <Row gutter={6} justify="end">
              <Col>
                <AntButton label={t('cancel')} type="default" htmlType="reset" onClick={handleClose} />
              </Col>

              {isNumber(selectedRecordId) ? (
                <Col>
                  <AntButton label={t('update')} htmlType="submit" disabled={isLoading} />
                </Col>
              ) : (
                <>
                  <Col>
                    <AntButton label={t('save')} htmlType="submit" disabled={isLoading} />
                  </Col>

                  <Col>
                    <AntButton
                      htmlType="submit"
                      disabled={isLoading}
                      label="Save and Add more"
                      onClick={handleSaveMoreClick}
                    />
                  </Col>
                </>
              )}
            </Row>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}

type TLookupFormModal = {
  open: boolean;
  title?: ReactNode;
  isLoading?: boolean;
  children?: ReactNode;
  isFetching?: boolean;
  width?: string | number;
  form: FormInstance<any>;
  isDataLoading?: boolean;
  handleClose: VoidFunction;
  selectedRecordId?: number;
  onFinish: (values: any) => void;
  handleSaveMoreClick: VoidFunction;
};

export default LookupFormModal;
