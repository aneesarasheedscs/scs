import React from 'react';
import { Collapse, Divider } from 'antd';
import '../../Syllabus_Management/SyllabusManagement/Style.css';
import { useTranslation } from 'react-i18next';
const ClassSyllabus = () => {
  const { t } = useTranslation();
  return (
    <div className="collapse">
      <h1 style={{ textAlign: 'center' }}>{t('class_syllabus')}</h1>
      <Divider />
      <div className="custom-collapse">
        <Collapse accordion>
          <Collapse.Panel header="GCSE" key="1">
            In Progress
          </Collapse.Panel>
          <Collapse.Panel header="IGSE" key="2">
            In Progress
          </Collapse.Panel>
          <Collapse.Panel header="Matric" key="3">
            In Progress
          </Collapse.Panel>
          <Collapse.Panel header="Fsc. Pre-Medical" key="4">
            In Progress
          </Collapse.Panel>
        </Collapse>
      </div>
    </div>
  );
};
export default ClassSyllabus;
