import { useEffect } from 'react';
import { isNumber, map } from 'lodash';
import { RedoOutlined } from '@ant-design/icons';
// import { AntButton, TableLoader } from "@/components";
import { Col, Input, Row, Select, Form, Tooltip } from 'antd';
import { useAddUpdateSubjectList, useGetSubjectListById } from '../queries';
import { TSubjectListFormDataOnAdd, TSubjectListFormDataOnUpdate } from '../queries/types';
import { AntButton, TableLoader } from '@revisionary/components';
import { useTranslation } from 'react-i18next';
// import { TSubjectListFormDataOnAdd, TSubjectListFormDataOnUpdate } from "@/types/subjectList";
// import { useAddUpdateSubjectList, useGetSubjectListById } from "@/hooks/apis/useSubjectList";

function SubjectListForm({
  classList,
  selectedRecordId,
  isClassListLoading,
  setSelectedRecordId,
  subjectCategoryList,
  syllabusAuthorityList,
  isSubjectCategoryListLoading,
  isSyllabusAuthorityListLoading,
}: TForm) {
  const [form] = Form.useForm();
  const { mutate, isSuccess } = useAddUpdateSubjectList(selectedRecordId);
  const { data, refetch, isSuccess: isDataByIdSuccess, isLoading } = useGetSubjectListById(selectedRecordId);
  const { t } = useTranslation();
  const onFinish = (values: TSubjectListFormDataOnAdd | TSubjectListFormDataOnUpdate) => {
    if (isNumber(selectedRecordId)) {
      mutate({ ...values, rowVersion: data?.data?.apiData?.rowVersion });
    } else {
      mutate(values);
    }
  };

  const handleReset = () => {
    form.resetFields();
    setSelectedRecordId(null);
  };

  useEffect(() => {
    if (isSuccess) handleReset();
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

  if (isLoading) {
    return <TableLoader numberOfSkeletons={4} />;
  }

  return (
    <Form form={form} onFinish={onFinish} initialValues={{ remember: true }}>
      <Form.Item
        name="syllabusAuthorityId"
        rules={[{ required: true, message: <>{t('placeholder_for_subject_authority')}</> }]}
      >
        <Select
          showSearch
          size="large"
          style={{ width: '100%' }}
          placeholder={t('syllabus_authority_puslisher')}
          loading={isSyllabusAuthorityListLoading}
          options={map(syllabusAuthorityList, (item) => ({
            value: item?.syllabusAuthorityId,
            label: item?.syllabusAuthorityName,
          }))}
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
        />
      </Form.Item>

      <Row gutter={10}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item
            name="subjectCategoryId"
            rules={[{ required: true, message: <>{t('placeholder_for_subject_category')}</> }]}
          >
            <Select
              showSearch
              size="large"
              style={{ width: '100%' }}
              placeholder={t('subject_catagory')}
              loading={isSubjectCategoryListLoading}
              options={map(subjectCategoryList, (item) => ({
                value: item?.subjectCategoryId,
                label: item?.subjectCategoryDescription,
              }))}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <Form.Item name="classId" rules={[{ required: true, message: <>{t('placeholder_for_class')}</> }]}>
            <Select
              showSearch
              size="large"
              style={{ width: '100%' }}
              placeholder={t('class')}
              loading={isClassListLoading}
              options={map(classList, (item) => ({
                value: item?.classId,
                label: item?.className,
              }))}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Row gutter={10}>
            <Col xs={24} md={8} lg={6} xl={7}>
              <Form.Item
                name="subjectCode"
                rules={[{ required: true, message: <>{t('placeholder_for_subjectcode')}</> }]}
              >
                <Input size="large" placeholder={t('subject_code')} />
              </Form.Item>
            </Col>

            <Col xs={24} md={10} lg={9} xl={10}>
              <Form.Item
                name="subjectName"
                rules={[{ required: true, message: <>{t('placeholder_for_subjectname')}</> }]}
              >
                <Input size="large" placeholder={t('subject_name')} />
              </Form.Item>
            </Col>

            <Col xs={20} md={4} lg={6} xl={5}>
              <Form.Item>
                <AntButton
                  size="large"
                  htmlType="submit"
                  style={{ width: '100%' }}
                  label={isNumber(selectedRecordId) ? <>{t('update')}</> : <>{t('add')}</>}
                />
              </Form.Item>
            </Col>

            <Col xs={4} md={2} lg={3} xl={2}>
              <Form.Item>
                <Tooltip title="Reset form">
                  <AntButton
                    ghost
                    size="large"
                    onClick={handleReset}
                    icon={<RedoOutlined />}
                    style={{ width: '100%' }}
                  />
                </Tooltip>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
}

type TForm = {
  isClassListLoading: boolean;
  selectedRecordId?: number | null;
  isSubjectCategoryListLoading: boolean;
  isSyllabusAuthorityListLoading: boolean;
  classList: Array<{ [key: string]: string }>;
  setSelectedRecordId: (id: number | null) => void;
  subjectCategoryList: Array<{ [key: string]: string }>;
  syllabusAuthorityList: Array<{ [key: string]: string }>;
};

export default SubjectListForm;

{
  /* <AntSelectDynamic
        required
        size="large"
        label=" "
        name="syllabusAuthorityId"
        fieldValue="syllabusAuthorityId"
        fieldLabel="syllabusAuthorityName"
        query={useSyllabusAuthorityForList()}
      /> */
}
