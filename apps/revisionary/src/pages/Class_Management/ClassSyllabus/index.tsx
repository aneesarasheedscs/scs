import React from 'react';
import { Collapse, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { useGetSubjectCategories } from '@revisionary/pages/Syllabus_Management/queries';
import StudentSubject from './ClassSyllabusSubject';
import { useGetClassById, useGetClasses } from '../Queries';
import { PageLoader } from '@scs/ui';
const ClassSyllabusDivisionByTopic = () => {
  const { t } = useTranslation();
  const { data: cards2, isError, isLoading } = useGetClasses();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="collapse col">
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          <h1 style={{ textAlign: 'center' }}>Class Syllabus</h1>
          <Divider />
          <div className="custom-collapse">
            <Collapse accordion>
              {cards2?.data?.apiData.map((item: any) => (
                <Collapse.Panel key={item.classId} header={item.className}>
                  <StudentSubject />
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
