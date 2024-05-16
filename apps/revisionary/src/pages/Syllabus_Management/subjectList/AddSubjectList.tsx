import { isNumber, values } from 'lodash';
import { useEffect, useState } from 'react';
import { Col, Form, FormInstance, Input, Row } from 'antd';
import { useAddUpdateSubjectList, useGetSubjectListById } from '../queries';
import LookupFormModal from '../../Component/LookupFormModal';
import { useTranslation } from 'react-i18next';
import SubjectListForm from './Form';

function AddSubjectList({
  classList,
  isClassListLoading,
  setSelectedRecordId,
  subjectCategoryList,
  syllabusAuthorityList,
  isSubjectCategoryListLoading,
  isSyllabusAuthorityListLoading,
  open,
  form,
  handleClose,
  selectedRecordId,
}: TAddUpdateRecord) {
  const [btnClicked, setBtnClicked] = useState(false);
  const { mutate, isSuccess } = useAddUpdateSubjectList(selectedRecordId);

  const {
    data,
    refetch,
    isSuccess: isDataByIdSuccess,
    isFetching,
    isLoading,
  } = useGetSubjectListById(selectedRecordId);
  const onFinish = (values: any) => {
    console.log(values);
    if (isNumber(selectedRecordId)) {
      mutate({ ...values, rowVersion: data?.data?.apiData?.rowVersion });
    } else {
      mutate(values);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      if (!btnClicked) handleClose();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isNumber(selectedRecordId)) {
      refetch();
    }
  }, [selectedRecordId]);

  useEffect(() => {
    if (isDataByIdSuccess) {
      form.setFieldsValue(data?.data?.apiData);
    }
  }, [isDataByIdSuccess]);
  // if (isLoading) {
  //   return <TableLoader numberOfSkeletons={4} />;
  // }
  const { t } = useTranslation();
  return (
    <LookupFormModal
      width={800}
      open={open}
      form={form}
      onFinish={onFinish}
      isLoading={isLoading}
      isFetching={isFetching}
      handleClose={handleClose}
      isDataLoading={isLoading}
      // selectedRecordId={selectedRecordId}
      title={t('subject_list')}
      handleSaveMoreClick={() => setBtnClicked(true)}
    >
      <Row style={{ marginTop: 20 }}>
        <SubjectListForm
          // form={form}
          // onFinish={onFinish}
          classList={classList}
          selectedRecordId={selectedRecordId}
          isClassListLoading={isClassListLoading}
          setSelectedRecordId={setSelectedRecordId}
          subjectCategoryList={subjectCategoryList}
          syllabusAuthorityList={syllabusAuthorityList}
          isSubjectCategoryListLoading={isSubjectCategoryListLoading}
          isSyllabusAuthorityListLoading={isSyllabusAuthorityListLoading}
        />
      </Row>
    </LookupFormModal>
  );
}

type TAddUpdateRecord = {
  open: boolean;
  form: FormInstance<any>;
  handleClose: VoidFunction;
  selectedRecordId?: number | null;
  isClassListLoading: boolean;
  isSubjectCategoryListLoading: boolean;
  isSyllabusAuthorityListLoading: boolean;
  classList: Array<{ [key: string]: string }>;
  setSelectedRecordId: (id: number | null) => void;
  subjectCategoryList: Array<{ [key: string]: string }>;
  syllabusAuthorityList: Array<{ [key: string]: string }>;
};

export default AddSubjectList;
