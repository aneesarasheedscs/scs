import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StudentProfile from '../StudentProfile/StudentProfile';
import MainSyllabusFile from '../SyllabusStatu';
import Subject1 from '../Student Syllabus/AddSubject/AddSubject';
import Assessment from '../SyllabusStatu/SyllabusTopic/SyllabusBooks';
import LoginForm from '../Forms/LoginForm';
import SignForm from '../Forms/SignForm';
import StudentSyllabus from '../Student Syllabus';
import SyllabusManagement from '@revisionary/pages/Syllabus_Management';
import ClassManagement from '@revisionary/pages/classManagement';
import Dashboard from '../Dashboard/Index';
import DashboardSubTopic from '../Dashboard/DashboardSubTopic';
import ClassSyllabusDivisionByTopic from '@revisionary/pages/Class_Management/ClassSyllabusDivisionByTopic';

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
        <Route path="/classsyllabusdivisionbytopic" element={<ClassSyllabusDivisionByTopic />}></Route>
      </Routes>
    </div>
  );
}
