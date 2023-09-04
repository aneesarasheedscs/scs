import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StudentProfile from '../revisionaryUser/StudentProfile/StudentProfile';
import MainSyllabusFile from '../revisionaryUser/SyllabusStatu';
import Subject1 from '../revisionaryUser/Student Syllabus/AddSubject/AddSubject';
import Assessment from '../revisionaryUser/SyllabusStatu/SyllabusTopic/SyllabusBooks';
import LoginForm from '../revisionaryUser/Forms/LoginForm';
import SignForm from '../revisionaryUser/Forms/SignForm';
import StudentSyllabus from '../revisionaryUser/Student Syllabus';
import SyllabusManagement from '@revisionary/pages/Syllabus_Management';
import ClassManagement from '@revisionary/pages/classManagement';
import Dashboard from '../revisionaryUser/Dashboard/Index';
import DashboardSubTopic from '../revisionaryUser/Dashboard/DashboardSubTopic';
import CardTable from '../Subject_Topics/Card-Table';
import SyllabusDivisionByTopic from '../revisionaryUser/Syllabus';
// import SyllabusDivisionByTopic from '../revisionaryUser/SyllabusDivisionByTopic';

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
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/dashboardsubtopic" element={<DashboardSubTopic />}></Route>
        <Route path="/classsyllabusdivisionbytopic" element={<CardTable />}></Route>
        <Route path="/syllabusdivisionbytopic" element={<SyllabusDivisionByTopic />}></Route>
      </Routes>
    </div>
  );
}
