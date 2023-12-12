import React, { useState } from 'react';
import { Modal, Form, Input, Button, Table } from 'antd';
import { AntTable } from '@scs/ui';
import { AntColumnType } from '@tradePro/globalTypes';

type NotesHistory = {
  SrNo: number;
  UserName: string;
  Date: Date;
  Note: string;
};

const VouchersNotesPopup: React.FC<{
  visible?: boolean;
  onClose?: any;
  onSave?: any;
  historyData?: any;
}> = ({ visible, onClose, onSave, historyData }) => {
  const [form] = Form.useForm();
  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave(values);
      form.resetFields();
    });
  };

  const columns = (): AntColumnType<NotesHistory>[] => [
    { title: 'Sr#', dataIndex: 'Sr#', fixed: 'left', render: (_: any, record: any, index: any) => index + 1 },
    { title: 'User Name', dataIndex: 'CommentsUserName', key: 'CommentsUserName' },
    { title: 'Date', dataIndex: 'CommentsEntryDate', key: 'CommentsEntryDate' },
    { title: 'Note', dataIndex: 'Comments', key: 'Comments' },
  ];

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      width={600}
      title="Voucher Notes"
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} onFinish={handleSave} layout="vertical">
        <Form.Item name="Comments" label="Note">
          <Input.TextArea placeholder="" autoSize={{ minRows: 3, maxRows: 5 }} />
        </Form.Item>
      </Form>
      <hr />
      <AntTable
        columns={columns()}
        dataSource={historyData}
        bordered
        pagination={false}
        scroll={{ x: 'max-content', y: 250 }}
        // summary={(pageData) => {
        //   let totalSr = 0;
        //   pageData.forEach((record) => {
        //     totalSr += record['Sr#'];
        //   });
        //   return (
        //     <>
        //       <Table.Summary.Row>
        //         <Table.Summary.Cell index={0} colSpan={1}>
        //           Total
        //         </Table.Summary.Cell>
        //         <Table.Summary.Cell index={1} colSpan={1}>
        //           {totalSr}
        //         </Table.Summary.Cell>
        //       </Table.Summary.Row>
        //     </>
        //   );
        // }}
      />
    </Modal>
  );
};

export default VouchersNotesPopup;
