import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, Form } from 'antd';
import { AddButtonforItems } from '../AddButtonForItems';
import AllocateDiscountTable from './table/AllocateDiscountTable';
import { TSaveCustomerAllocateDiscountPolicy } from '../../types';
import AllocateDiscountItem from './form/AllocateDiscountItem';

const { useForm } = Form;

function AllocateDiscountItemForm() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [form] = useForm<TSaveCustomerAllocateDiscountPolicy>();
  const [selectedRecordId2, setSelectedRecordId2] = useState<number | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <AddButtonforItems open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <h2 style={{ marginBottom: 20 }}>{t('allocate_discount_item_to_discount_type')} </h2>
      <Divider></Divider>

      <br />
      <AllocateDiscountItem selectedRecordId2={selectedRecordId2} setSelectedRecordId2={setSelectedRecordId2} />
      <AllocateDiscountTable setSelectedRecordId2={setSelectedRecordId2} />
    </AddButtonforItems>
  );
}

export default AllocateDiscountItemForm;
