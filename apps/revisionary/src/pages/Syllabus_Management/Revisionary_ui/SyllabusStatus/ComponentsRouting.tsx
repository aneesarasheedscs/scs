import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StudentProfile from '../StudentProfile'
import MainSyllabusFile from './MainSyllabusFile'
import Subject1 from '../Subject1'
import LoginForm from './Comp/LoginForm'
import SignForm from './Comp/SignForm'
import StudentSyllabus from './Comp/StudentSyllabus/StudentSyllabus'
import Assessment from './SyllabusBooks'
import Tab from '../../Tab'

export default function ComponentsRouting() {
  return (
    <div>
    <Routes>
        <Route path='/loginform' element={<LoginForm/>}></Route>
        <Route path='/signform' element={<SignForm/>}></Route>
        <Route path='/profile' element={<StudentProfile/>}></Route>
        <Route path='/syllabus1' element={<StudentSyllabus/>}></Route>
        <Route path='/syllabusfile' element={<MainSyllabusFile/>}></Route>
        <Route path='/subject' element={<Subject1/>}></Route>
        <Route path='/assessment' element={<Assessment/>}></Route>
        <Route path='/syllabus-management' element={<Tab/>}></Route>
    </Routes>
    </div>
  )
}
