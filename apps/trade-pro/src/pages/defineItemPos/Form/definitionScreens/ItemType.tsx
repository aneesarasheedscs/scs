import { useState } from 'react';
import { CloseOutlined, FileAddOutlined } from '@ant-design/icons';
import { Checkbox, Col, DatePicker, Divider, Form, Row, Table, Typography } from 'antd';
import { TPurchaseOrderSearchCriteria } from '../../type';
import { AntButton, AntInput, AntSelectDynamic, SearchCriteriaWrapper } from '@tradePro/components';
import { AddButtonforItems } from './AddButtonforItems';
import { getItemCategory, getItemClass, getItemType } from '../queries';
import ItemDefinitionTable from '../table';

const { useForm, useWatch } = Form;

function ItemType() {
  const [open, setOpen] = useState(false);
  const [form] = useForm<TPurchaseOrderSearchCriteria>();
  const {
    data: itemType,
    isSuccess: isitemSuccess,
    isLoading: isitemLoading,
    isError: isitemError,
    refetch,
  } = getItemType();

  const formValues = useWatch<TPurchaseOrderSearchCriteria>([], form);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAdd = () => {
    console.log(formValues);
    refetch().then(() => handleClose());
  };

  return (
    <AddButtonforItems open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <h4> Definitions</h4>
      <Divider></Divider>
      <h2 style={{ marginBottom: 20 }}>Define Item Type</h2>
      <Form form={form} layout="vertical" initialValues={formValues} style={{ width: '100%' }}>
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={24} md={6}>
            <AntInput name="Code" label="Code" inputProps={{ type: 'number' }} />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <AntInput name="Description" label="Description" inputProps={{ type: 'text' }} />
          </Col>

          <Col xs={24} sm={24} md={7}>
            <AntSelectDynamic
              fieldValue="Id"
              name="TypeDescription"
              label="Type"
              fieldLabel="TypeDescription"
              isError={isitemError}
              isLoading={isitemLoading}
              data={itemType?.data?.Data?.Result}
            />
          </Col>

          <Col xs={24} sm={24} md={3}>
            <AntButton
              label="Save"
              icon={<FileAddOutlined />}
              htmlType="submit"
              className="fullWidth"
              onClick={handleAdd}
              style={{ marginTop: 20, marginRight: 0 }}
              // isError={isPurchaseOrderError}
              // isLoading={isPurchaseOrderLoading || isFetching}
            />
          </Col>
        </Row>
      </Form>
      <ItemDefinitionTable />
    </AddButtonforItems>
  );
}

export default ItemType;
