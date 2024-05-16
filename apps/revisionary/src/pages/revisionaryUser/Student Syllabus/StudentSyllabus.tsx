import { Card, Col, Row, Tabs, Pagination, Divider, Form, message, Progress, Table, Checkbox } from 'antd';
import React, { useState } from 'react';
import '../style2.scss';
import { AntButton, PageLoader } from '@scs/ui';
import { Link, useNavigate } from 'react-router-dom';
import { useGetSubjectCategories } from '@revisionary/pages/Syllabus_Management/queries';
import {
  ExperimentOutlined,
  SettingOutlined,
  HomeOutlined,
  MinusOutlined,
  FontColorsOutlined,
  PlusOutlined,
  MedicineBoxOutlined,
  HourglassOutlined,
  BuildOutlined,
  HistoryOutlined,
  PercentageOutlined,
  FileExcelOutlined,
  DragOutlined,
} from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useTranslation } from 'react-i18next';

type SubjectIcons = {
  [key: string]: JSX.Element;
};
type SubjectColorMap = {
  [key: string]: string;
};
const StudentSyllabus: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>();
  const [checkedItems, setCheckedItems] = useState<any[]>([]);
  const [uncheckedItems, setUncheckedItems] = useState<any[]>([]);

  const navigate = useNavigate();
  const { data: cards2, isError, isLoading } = useGetSubjectCategories();
  const { t } = useTranslation();
  const subjectColorMap: SubjectColorMap = {
    'Rs EdExcel': '#C606F0',
    'Quantum Physics': 'green',
    Physics: '#ABE007',
    Chemistry: '#EA02D5',
    Math: 'blue',
    English: '#F0F004',
    Biology: 'red',
    Geography: '#DE7C07',
    'Human History': 'black',
    'Computer Sciences': '#2CE0DD',
    'Business Studies': '#F26504',
  };
  const subjectIcons: SubjectIcons = {
    'Rs EdExcel': (
      <FileExcelOutlined
        style={{
          color: '#C606F0',
          fontSize: 26,
          padding: 8,
        }}
      />
    ),
    'Quantum Physics': (
      <DragOutlined
        style={{
          color: 'green',
          fontSize: 26,
          padding: 8,
        }}
      />
    ),
    Physics: (
      <SettingOutlined
        style={{
          color: '#ABE007',
          fontSize: 26,
          padding: 8,
        }}
      />
    ),
    Chemistry: (
      <ExperimentOutlined
        style={{
          color: '#EA02D5',
          fontSize: 26,
          padding: 8,
        }}
      />
    ),
    Math: (
      <>
        <PercentageOutlined
          style={{
            color: 'blue',
            fontSize: 26,
            padding: 8,
          }}
        />
      </>
    ),
    English: (
      <FontColorsOutlined
        style={{
          color: '#F0F004',
          fontSize: 26,
          padding: 8,
        }}
      />
    ),
    Biology: (
      <MedicineBoxOutlined
        style={{
          color: 'red',
          fontSize: 26,
          padding: 8,
        }}
      />
    ),
    Geography: (
      <HomeOutlined
        style={{
          color: '#DE7C07',
          fontSize: 26,
          padding: 8,
        }}
      />
    ),
    'Computer Sciences': (
      <HourglassOutlined
        style={{
          color: '#2CE0DD',
          fontSize: 26,
          padding: 8,
        }}
      />
    ),
    'Business Studies': (
      <BuildOutlined
        style={{
          color: '#F26504',
          fontSize: 26,
          padding: 8,
        }}
      />
    ),
    'Human History': (
      <HistoryOutlined
        style={{
          color: 'black',
          fontSize: 26,
          padding: 8,
        }}
      />
    ),
  };
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const handleCheckboxChange = (subjectListId: number, isActive: boolean) => {
    // const itemToMove = isActive
    //   ? checkedItems.find((item) => item.subjectListId === subjectListId)
    //   : uncheckedItems.find((item) => item.subjectListId === subjectListId);
    // if (itemToMove) {
    //   setCheckedItems((prevChecked) =>
    //     isActive ? prevChecked.filter((item) => item.subjectListId !== subjectListId) : [...prevChecked, itemToMove]
    //   );
    //   setUncheckedItems((prevUnchecked) =>
    //     isActive ? [...prevUnchecked, itemToMove] : prevUnchecked.filter((item) => item.subjectListId !== subjectListId)
    //   );
    // }
  };

  const handleAddSubject = () => {
    navigate('/subject');
  };
  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          <Card style={{ marginLeft: 20, height: '100vh' }}>
            <Row gutter={[16, 16]}>
              {/* <Col xs={6}></Col> */}
              <Col xs={23}>
                <Divider>
                  <h1 className="h2"> {t('student_syllabus')} </h1>
                </Divider>
                <Row>
                  <Col span={12}>
                    <h1 style={{ marginLeft: '10%', fontSize: 30, fontFamily: 'Times New Roman' }}>{t('subjects')} </h1>
                    <h5
                      style={{
                        marginLeft: '10%',
                        fontSize: '1rem',
                        fontFamily: 'Poppins',
                      }}
                    >
                      {t('chose_your_subject')}
                    </h5>
                  </Col>

                  <Col span={6}>
                    <AntButton label={'+ ' + t('add_subject')} className="addsubject" onClick={handleAddSubject} />
                  </Col>
                </Row>

                <div
                  style={{
                    width: '95%',
                  }}
                >
                  <div>
                    <Row gutter={[10, 10]} style={{ marginTop: 40, marginLeft: 15 }}>
                      {cards2?.data?.apiData.map((item: any) => (
                        <Col
                          xs={{ span: 20 }}
                          sm={{ span: 12 }}
                          md={9}
                          lg={8}
                          xl={6}
                          xxl={4}
                          key={item.subjectCategoryId}
                        >
                          <Card
                            key={item.subjectListId}
                            className="cardSubjectSyllabus classCard"
                            bordered={false}
                            style={{
                              color: subjectColorMap[item.subjectCategoryDescription],
                              border: `1px solid ${subjectColorMap[item.subjectCategoryDescription]}`,
                            }}
                          >
                            {/* <Checkbox className="customCheckbox" onChange={onChange}></Checkbox> */}

                            {/* <Checkbox
                              type="secondary"
                              className="customCheckbox"
                              // checked={false}
                              // onClick={(record: any) => {
                              //   setSelectedId(record?.ClassSyllabusId);
                              // }}
                              onChange={() => handleCheckboxChange(item.subjectCategoryId, false)}
                            /> */}

                            <div>
                              <h2 style={{ textAlign: 'center' }}>{subjectIcons[item.subjectCategoryDescription]}</h2>
                              <p className="card-description">{item.subjectCategoryDescription}</p>
                            </div>
                            <div></div>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </>
      )}
    </>
  );
};
export default StudentSyllabus;
