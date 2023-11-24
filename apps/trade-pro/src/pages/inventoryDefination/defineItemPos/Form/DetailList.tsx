import './style.scss';
import image from './OIP.jpg';
import { useTranslation } from 'react-i18next';
import { Card, Checkbox, Col, Form, Row, theme } from 'antd';
import { getCompaniesNames } from './queryOptions';
import { AntInput, AntSelectDynamic, AntSelectDynamicMultiple } from '@tradePro/components';
import { FormInstance } from 'rc-field-form';
import { TItemAllocationlist } from './types';
import { useEffect, useState } from 'react';

const { useToken } = theme;
const { useForm, useWatch } = Form;

//convert image
const getBase64 = (file: any): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader(); // built-in function
    reader.onload = () => resolve(reader.result as string);
    reader.onabort = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

function DetailList({ form }: TDynamicForm) {
  const { setFields, getFieldValue } = form;
  const { t } = useTranslation();
  const { token } = useToken();
  const formValues = useWatch<TItemAllocationlist[]>('ItemAllocationlist', form);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const handleImage2 = (e: React.ChangeEvent<any>) => {
    const file = e.target.files?.[0];
    if (file) {
      getBase64(file).then((base64: string) => {
        setSelectedImage(base64);
        localStorage.setItem('img', base64 as string);
      });
    }
  };
  const handleCheckboxChange = (isChecked: boolean, fieldName: string) => {
    form.setFieldsValue({
      [fieldName]: isChecked,
    });
  };

  return (
    <>
      <>
        <Card style={{ display: '', marginBottom: 10, marginTop: 3 }} className="antCard card-shadow">
          <Form.List name="ItemAllocationlist" initialValue={[formValues]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Row key={field.key} style={{ width: '100%' }}>
                    <Col span={23} style={{ marginRight: 0 }}>
                      <Col style={{ display: 'flex', marginTop: 5, marginBottom: 5 }} xl={5}>
                        <Row>
                          <Form.Item name={[field.name, 'ItemStatus']} valuePropName="checked" initialValue={false}>
                            <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked, field.name.toString())}>
                              {t('Is Active')}
                            </Checkbox>
                          </Form.Item>
                        </Row>
                      </Col>
                      <AntSelectDynamic
                        required
                        mode="multiple"
                        fieldValue="Id"
                        label={t('select_companies')}
                        className="select"
                        placeholder="Select Companies"
                        fieldLabel="CompName"
                        // name="CompanyId"
                        name={[field.name, 'CompanyId']}
                        style={{
                          width: '101%',
                          background: '#ffff',
                        }}
                        query={getCompaniesNames}
                      />
                      <Row>
                        <Col xl={6} md={10} lg={10} sm={16}>
                          <p>{t('product_image')}</p>
                          <img
                            src={selectedImage || localStorage.getItem('img') || image}
                            alt=""
                            style={{ border: '1px solid gray', borderRadius: 10 }}
                            height={150}
                            width={200}
                          />
                          <AntInput
                            label={''}
                            type="file"
                            onChange={handleImage2}
                            style={{ width: 200 }}
                            formItemProps={{ ...field, name: [field.name, 'ProductImage'] }}
                          />
                        </Col>{' '}
                        <Col xl={4}>
                          <p>{t('barcode_image')}</p>
                          <AntInput
                            label={''}
                            type="image"
                            formItemProps={{ ...field, name: [field.name, 'BarcodeImage'] }}
                            style={{ display: '', width: 250, height: 50 }}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ))}
              </>
            )}
          </Form.List>
        </Card>
      </>
    </>
  );
}
type TDynamicForm = { form: FormInstance };
export default DetailList;
