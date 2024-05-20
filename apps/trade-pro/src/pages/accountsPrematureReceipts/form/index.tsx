import { Card, Form, Row } from 'antd';
import React, { useState } from 'react';
import MainEntry from './MainEntry';
import { TAccountsPrematureReceiptsList } from '../types';
import Buttons from './Buttons';
import AccountsPrematureTable from './table';
const { useForm, useWatch } = Form;

function AccountsPrematureForm({ selectedRecordId, setSelectedRecordId }: TForm) {
  const [form] = useForm<TAccountsPrematureReceiptsList>();
  const formValues = useWatch<TAccountsPrematureReceiptsList>([], form);
  const DocumentTypeId = 159;
  const [printPreview, setPrintPreview] = useState<boolean>(true);
  // const [delettableData, setDeleteTableData] = useAtom(deleteData);
  // const [newtableData, setNewTableData] = useAtom(newTableData);
  // const [tableData, setTableData] = useAtom(addtableData);
  const onFinish = (values: TAccountsPrematureReceiptsList) => {
    // refetch();
    console.log(values);
  };
  return (
    <>
      <>
        <Card>
          <Form form={form} onFinish={onFinish} layout="horizontal" style={{ marginBottom: 20 }}>
            <Buttons
              form={form}
              selectedRecordId={selectedRecordId}
              setSelectedRecordId={setSelectedRecordId}
              DocumentTypeId={DocumentTypeId}
              // requisitionById={requisitionById}
              // isDataSuccess={isDataSuccess}
              printPreview={printPreview}
              setPrintPreview={setPrintPreview}
            />
            <MainEntry form={form} />
            <AccountsPrematureTable />
          </Form>
        </Card>
      </>
    </>
  );
}

export default AccountsPrematureForm;
interface TForm {
  selectedRecordId: number | null;
  setSelectedRecordId: (id: number | null) => void;
}
