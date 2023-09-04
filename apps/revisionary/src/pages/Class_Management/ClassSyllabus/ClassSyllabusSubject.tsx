import { Card, Col, Row, Checkbox, Divider } from 'antd';
import '../../Syllabus_Management/SyllabusManagement/Style.css';

import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useGetClassSyllabus } from '../ClassDivision/queries';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function StudentSubject() {
  const { data: studentsubject, isError, isLoading } = useGetClassSyllabus();
  const [checkedItems, setCheckedItems] = useState<any[]>([]);
  const [uncheckedItems, setUncheckedItems] = useState<any[]>([]);

  useEffect(() => {
    if (studentsubject && studentsubject.data && studentsubject.data.apiData) {
      const apiData = studentsubject.data.apiData;
      const checked = apiData.filter((item: any) => item.isActive);
      const unchecked = apiData.filter((item: any) => !item.isActive);

      setCheckedItems(checked);
      setUncheckedItems(unchecked);
    }
  }, [studentsubject]);

  const handleCheckboxChange = (subjectListId: string, isActive: boolean) => {
    const itemToMove = isActive
      ? checkedItems.find((item) => item.subjectListId === subjectListId)
      : uncheckedItems.find((item) => item.subjectListId === subjectListId);

    if (itemToMove) {
      setCheckedItems((prevChecked) =>
        isActive ? prevChecked.filter((item) => item.subjectListId !== subjectListId) : [...prevChecked, itemToMove]
      );
      setUncheckedItems((prevUnchecked) =>
        isActive ? [...prevUnchecked, itemToMove] : prevUnchecked.filter((item) => item.subjectListId !== subjectListId)
      );
    }
  };
  const { t } = useTranslation();
  return (
    <div>
      {isLoading ? (
        <p>Loading......</p>
      ) : (
        <div className="card-container" style={{ marginLeft: '14px' }}>
          <Row gutter={[16, 16]}>
            {/* Checked Cards */}
            <Col span={24}>
              <Divider orientation="left">{t('selected_subject')}</Divider>
            </Col>
            {checkedItems.map((item) => (
              <Col span={8} xs={24} sm={12.6} md={12} lg={6} key={item.subjectListId}>
                <Card className="cardS classCard" bordered={false}>
                  <div>
                    <div className="card-header">
                      <p className="card-header-text">{t('syllabus_books')}</p>
                      <div className="card-checkbox">
                        <Checkbox
                          className="customCheckbox"
                          checked={true}
                          onChange={() => handleCheckboxChange(item.subjectListId, true)}
                        />
                      </div>
                    </div>
                    <p className="card-description">{item.subjectName}</p>
                  </div>
                </Card>
              </Col>
            ))}

            {/* Unchecked Cards */}
            <Col span={24}>
              <Divider orientation="left">{t('selected_subject')}</Divider>
            </Col>
            {uncheckedItems.map((item) => (
              <Col span={8} xs={24} sm={12.6} md={12} lg={6} key={item.subjectListId}>
                <Card className="cardS classCard" bordered={false}>
                  <div>
                    <div className="card-header">
                      <p className="card-header-text">Syllabus Books</p>
                      <div className="card-checkbox">
                        <Checkbox
                          className="customCheckbox"
                          checked={false}
                          onChange={() => handleCheckboxChange(item.subjectListId, false)}
                        />
                      </div>
                    </div>
                    <p className="card-description">{item.subjectName}</p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
}

export default StudentSubject;
