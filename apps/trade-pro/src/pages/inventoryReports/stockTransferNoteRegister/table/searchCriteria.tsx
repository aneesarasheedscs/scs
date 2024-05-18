import { useState } from 'react';
import { Col, Form, Row } from 'antd';
// import { useGetItems, useGetSuppliers, useGetOrderStatus, useGetApprovedStatus } from '../queries';
import {
  AntButton,
  AntDatePicker,
  AntInput,
  AntInputNumber,
  AntSelectDynamic,
  SearchCriteriaWrapper,
} from '@tradePro/components';
import { useTranslation } from 'react-i18next';
import { useGetDataForDropDownFromTransfer, useGetStockTransferNoteRegister } from '../quries';
import { map } from 'lodash';
import { useAtom } from 'jotai';
import { actvitityPAtom } from './atom';

const { useForm, useWatch } = Form;

function SearchCriteria() {
  const [open, setOpen] = useState(false);
  const [form] = useForm<TSearchCriteria>();
  const formValues = useWatch<TSearchCriteria>([], form);
  const { t } = useTranslation();
  const {
    refetch,
    isFetching,
    isError: isStockTransferRegisterError,
    isLoading: isStockTransferRegisterLoading,
  } = useGetStockTransferNoteRegister(false, form.getFieldsValue());

  console.log(form.getFieldsValue(), 'fields');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFinish = (_: TSearchCriteria) => {
    refetch().then(() => handleClose());
  };

  const [, setSelectedActivity] = useAtom(actvitityPAtom);

  interface TReqStatus {
    Id: number;
    name: string;
  }
  const ReqStatus: TReqStatus[] = [
    {
      Id: 1,
      name: 'Pending',
    },
    {
      Id: 2,
      name: 'Approved',
    },
    {
      Id: 3,
      name: 'Dispatched',
    },
    {
      Id: 4,
      name: 'Received',
    },
  ];

  // const Activity: TActivity[] = [
  //   {
  //     Id: 1,
  //     name: 'Detail',
  //   },
  //   {
  //     Id: 2,
  //     name: 'BranchAndItemWiseSummary',
  //   },

  // ];
  interface TReportType {
    Id: string;
    name: string;
  }
  interface TActivity {
    Id: string;
    name: string;
  }
  const Activity: TReportType[] = [
    { Id: 'Detail', name: 'Detail' },
    { Id: 'BranchAndItemWiseSummary', name: 'BranchAndItemWiseSummary' },
  ];

  const { data: StockTransferNote } = useGetDataForDropDownFromTransfer();

  console.log(StockTransferNote?.data?.Data?.Result, 'dfd');

  const filteredSourceLocation =
    StockTransferNote?.data?.Data?.Result.filter((item: any) => item.Activity === 'SourceLocation').map(
      (item: any) => ({
        label: item.ReferenceName,
        value: item.Id.toString(),
      })
    ) || [];

  const filteredDestinationLocation =
    StockTransferNote?.data?.Data?.Result.filter((item: any) => item.Activity === 'DestinationLocation').map(
      (item: any) => ({
        label: item.ReferenceName,
        value: item.Id.toString(),
      })
    ) || [];
  const filteredItem =
    StockTransferNote?.data?.Data?.Result.filter((item: any) => item.Activity === 'Item').map((item: any) => ({
      label: item.ReferenceName,
      value: item.Id.toString(),
    })) || [];
  const filteredParentCategory =
    StockTransferNote?.data?.Data?.Result.filter((item: any) => item.Activity === 'ParentCategory').map(
      (item: any) => ({
        label: item.ReferenceName,
        value: item.Id.toString(),
      })
    ) || [];
  const filteredItemType =
    StockTransferNote?.data?.Data?.Result.filter((item: any) => item.Activity === 'ItemType').map((item: any) => ({
      label: item.ReferenceName,
      value: item.Id.toString(),
    })) || [];
  const filteredItemItemCategory =
    StockTransferNote?.data?.Data?.Result.filter((item: any) => item.Activity === 'ItemCategory').map((item: any) => ({
      label: item.ReferenceName,
      value: item.Id.toString(),
    })) || [];

    const [reqTypeLabel, setReqTypeLabel] = useState('');

    const handleReqType = (selectedValue: number) => {
      console.log(selectedValue,'selectValue') 
      if(selectedValue === 1){
        form.setFieldValue('ReqType','Pending')
      }else if(selectedValue === 2 ){
        form.setFieldValue('ReqType','Approved')
      }else if(selectedValue ===  3){
        form.setFieldValue('ReqType','Dispatched')
      }else if(selectedValue === 4){
        form.setFieldValue('ReqType','Received')
      }
      }

  
  

  return (
    <SearchCriteriaWrapper open={open} handleOpen={handleOpen} handleClose={handleClose}>
      <Form form={form} onFinish={onFinish} layout="inline" initialValues={formValues}>
        <Row gutter={[0, 5]} justify={'space-between'}>
          <Col xs={24} sm={24} md={12} className="formsfield">
            <AntDatePicker name="FromDate" label={t('from_date')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={11} className="formsfield">
            <AntDatePicker name="ToDate" label={t('to_date')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={12} className="formsfield">
            <AntInputNumber name="FromDocNo" label={t('from_doc_no')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={11} className="formsfield">
            <AntInputNumber name="ToDocNo" label={t('to_doc_no')} bordered={false} />
          </Col>

          <Col xs={24} sm={24} md={12} className="formsfield">
            <AntSelectDynamic
              bordered={false}
              fieldValue="ReferenceName"
              label={t('source_location')}
              options={filteredSourceLocation}
              fieldLabel="Activity"
              name="SourceId"
            />
          </Col>

          <Col xs={24} sm={24} md={11} className="formsfield">
            <AntSelectDynamic
              bordered={false}
              name="DestinationId"
              fieldValue="ReferenceName"
              label={t('dest_location')}
              options={filteredDestinationLocation}
              fieldLabel="Activity"
            />
          </Col>
          <Col xs={24} sm={24} md={12} className="formsfield">
            <AntSelectDynamic
              bordered={false}
              name="InventoryParentCategories"
              fieldValue="ReferenceName"
              label={t('parent_category')}
              options={filteredParentCategory}
              fieldLabel="Activity"
            />
          </Col>
          <Col xs={24} sm={24} md={11} className="formsfield">
            <AntSelectDynamic
              bordered={false}
              name="ItemCategoryId"
              fieldValue="ReferenceName"
              label={t('item_category')}
              options={filteredItemItemCategory}
              fieldLabel="Activity"
            />
          </Col>
          <Col xs={24} sm={24} md={12} className="formsfield">
            <AntSelectDynamic
              bordered={false}
              name="ItemTypeId"
              fieldValue="ReferenceName"
              label={t('item_type')}
              options={filteredItemType}
              fieldLabel="Activity"
            />
          </Col>
          <Col xs={24} sm={24} md={11} className="formsfield">
            <AntSelectDynamic
              bordered={false}
              name="ItemId"
              fieldValue="ReferenceName"
              label={t('item_name')}
              options={filteredItem}
              fieldLabel="Activity"
            />
          </Col>
        </Row>
        <Col md={12} xxl={24}>
          <Row align="middle" gutter={[0, 5]} justify={'space-between'}>
            <Col xs={24} sm={24} md={12} className="formsfield">
              <AntSelectDynamic
                bordered={false}
                name="ReqTypeId"
                label={t('req_status')}
                fieldValue="ReqStatus"
                fieldLabel="ReqStatus"
                onSelect={(selectedValue) => handleReqType(selectedValue)}
                options={map(ReqStatus, (item) => ({
                  value: item.Id,
                  label: item.name,
                }))}
              />
            </Col>

            <Col xs={24} sm={24} md={11} className="formsfield">
              <AntSelectDynamic
                bordered={false}
                fieldValue=""
                name="Activity"
                label={t('activity')}
                fieldLabel=""
                onChange={(value) => setSelectedActivity(value)}
                options={map(Activity, (item: TActivity) => ({
                  value: item.Id,
                  label: item.name,
                }))}
                defaultValue={Activity[0].Id}
              />
            </Col>
          </Row>
        </Col>



        <Col xxl={24} md={24}>
          <Row justify={'end'}>
            <Col xs={24} sm={24} md={3}>
              <AntButton
                label={t('show')}
                htmlType="submit"
                style={{ marginTop: 10 }}
                isError={isStockTransferRegisterError}
                isLoading={isStockTransferRegisterLoading || isFetching}
              />
            </Col>
          </Row>
        </Col>

        <Col xs={24} sm={24} md={11} className="">
        <AntInput label={t('')} name='ReqType' readOnly style={{display:'none'}}/>
      </Col>
      </Form>
    </SearchCriteriaWrapper>
  );
}

export default SearchCriteria;
