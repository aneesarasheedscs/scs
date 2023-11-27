import { useEffect, useState } from 'react';
import DocNumber from './DocNumber';
import MainEntry from './MainEntry';
import { AntButton } from '@tradePro/components';
import { Card, Col, Form, Input, Row, notification } from 'antd';
import { SaveOutlined, SyncOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { isNumber, sumBy } from 'lodash';
import DynamicForm from './DetailEntry';
import dayjs from 'dayjs';
import { useAddJournalVoucher, useGetDocumentNumber, useUpdateJournalVoucher } from '../quries';
import { TJournalVoucherData } from '../types';
import { useAtom } from 'jotai';
import { addtableData } from './Atom';
import _ from 'lodash';

const { useForm } = Form;

function JournalVoucherForm({ selectedRecordId, refetchJournal, journalVoucherData, isDataSuccess }: TAddUpdateRecord) {
  const [form] = useForm<TJournalVoucherData>();
  const { data, isError, refetch, isLoading, isSuccess } = useGetDocumentNumber();
  const { t } = useTranslation();
  const [tableData, setTableData] = useAtom(addtableData);
  const { mutate: addJournalVoucher } = useAddJournalVoucher();
  const { mutate: updateJournalVoucher } = useUpdateJournalVoucher(selectedRecordId);

  useEffect(() => {
    if (isSuccess) form.setFieldValue('VoucherNo', data?.data?.Data?.Result?.[0]?.VoucherCode);
    form.setFieldValue('VoucherCode', data?.data?.Data?.Result?.[0]?.VoucherCode);
  }, [data, isSuccess]);

  const onFinish = (values: TJournalVoucherData) => {
    values.voucherDetailList = tableData;
    console.log(values);

    const TotalDebit: number = _.sumBy(values?.voucherDetailList, 'DebitAmount');
    const TotalCredit: number = _.sumBy(values?.voucherDetailList, 'CreditAmount');
    if (TotalDebit !== TotalCredit) {
      notification.error({ message: 'Credit And Debit Side not equal' });
    }
    values.VoucherAmount = TotalDebit;
    if (isNumber(selectedRecordId)) {
      updateJournalVoucher(values);
    } else {
      console.log(values);
      addJournalVoucher(values);
    }
    setTableData([]);
  };

  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetchJournal();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataSuccess) {
      form.setFieldValue('VoucherDate', dayjs(journalVoucherData?.data?.Data?.Result?.VoucherDate));
      form.setFieldValue('Remarks', journalVoucherData?.data?.Data?.Result?.Remarks);
      setTableData(journalVoucherData?.data?.Data?.Result?.voucherDetailList);
    }
  }, [isDataSuccess]);

  return (
    <>
      <Card>
        <Form form={form} onFinish={onFinish} layout="horizontal" style={{ marginBottom: 25 }}>
          <Card className="grn-card">
            <Row align="middle" justify="space-between" style={{ marginLeft: 10, marginRight: 60 }}>
              <Col>
                <Row gutter={10} align="middle">
                  <Col style={{ fontSize: 18 }}> {t('document_no')}</Col>
                  <Col>
                    <DocNumber
                      isError={isError}
                      refetch={refetch}
                      isLoading={isLoading}
                      data={data?.data?.Data?.Result?.[0]?.VoucherCode}
                    />
                    <Form.Item name="VoucherNo" style={{ display: 'none' }}>
                      <Input />
                    </Form.Item>
                    <Form.Item name="VoucherCode" style={{ display: 'none' }}>
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col>
                <Form.Item>
                  <Row align="middle" gutter={10}>
                    <Col>
                      <AntButton
                        danger
                        ghost
                        htmlType="reset"
                        label={t('reset')}
                        onClick={() => setTableData([])}
                        icon={<SyncOutlined />}
                      />
                    </Col>

                    <Col>
                      <AntButton ghost label={t('save')} htmlType="submit" icon={<SaveOutlined />} />
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
            </Row>

            <MainEntry form={form} />
            <DynamicForm form={form} />
          </Card>
        </Form>
      </Card>
    </>
  );
}
type TAddUpdateRecord = {
  selectedRecordId?: number | null;
  refetchJournal: any;
  journalVoucherData: any;
  isDataSuccess: any;
};
export default JournalVoucherForm;
