import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StudentProfile from '../StudentProfile/StudentProfile';
import MainSyllabusFile from './MainSyllabusFile';
import Subject1 from '../Subject1';
// import LoginForm from '../../../revisionaryUser/Comp/LoginForm';
// import SignForm from '../../../revisionaryUser/Comp/SignForm';
// import StudentSyllabus from '../../../revisionaryUser/Comp/StudentSyllabus';
import Assessment from './SyllabusBooks';
import LoginForm from '../Comp/LoginForm';
import SignForm from '../Comp/SignForm';
import StudentSyllabus from '../Comp/StudentSyllabus';
import SyllabusManagement from '@revisionary/pages/Syllabus_Management';
import ClassManagement from '@revisionary/pages/classManagement';
// import Tab from '../../Tab';
// import Tab2 from '../../SyllabusManagement/SubjectCatagory';

export default function ComponentsRouting() {
  return (
    <div>
      <Routes>
        <Route path="/loginform" element={<LoginForm />}></Route>
        <Route path="/signform" element={<SignForm />}></Route>
        <Route path="/profile" element={<StudentProfile />}></Route>
        <Route path="/syllabus1" element={<StudentSyllabus />}></Route>
        <Route path="/syllabusfile" element={<MainSyllabusFile />}></Route>
        <Route path="/subject" element={<Subject1 />}></Route>
        <Route path="/assessment" element={<Assessment />}></Route>
        <Route path="/syllabus-management" element={<SyllabusManagement />}></Route>
        <Route path="/class-management" element={<ClassManagement />}></Route>
      </Routes>
    </div>
  );
}
