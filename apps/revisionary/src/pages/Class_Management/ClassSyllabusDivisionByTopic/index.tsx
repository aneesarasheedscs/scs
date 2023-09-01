import React from 'react';
import { Collapse, Divider } from 'antd';
import '../../Syllabus_Management/SyllabusManagement/Style.css';
import { useTranslation } from 'react-i18next';
import { useGetSubjectCategories } from '@revisionary/pages/Syllabus_Management/queries';
import ClassSubectTopic from './SubjectTopic/ClassSubjectTopic';
import { useGetTopics } from './queries';
import { PageLoader } from '@scs/ui';

const ClassSyllabusDivisionByTopic = () => {
  const { t } = useTranslation();
  const { data: cards2, isError, isLoading } = useGetSubjectCategories();
  const { data } = useGetTopics();

  return (
    <div className="collapse col">
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          <h1 style={{ textAlign: 'center' }}>Class Syllabus Division By Topic</h1>
          <Divider />
          <div className="custom-collapse">
            <Collapse accordion>
              {cards2?.data?.apiData.map((item: any) => (
                <Collapse.Panel key={item.subjectCategoryId} header={item.subjectCategoryDescription}>
                  <ClassSubectTopic />
                </Collapse.Panel>
              ))}
            </Collapse>
          </div>
        </>
      )}
    </div>
  );
};

export default ClassSyllabusDivisionByTopic;
