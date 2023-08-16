import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StudentProfile from '../StudentProfile'
import MainSyllabusFile from './MainSyllabusFile'
import Subject1 from '../Subject1'
import LoginForm from './Comp/LoginForm'
import SignForm from './Comp/SignForm'
import StudentSyllabus from './Comp/StudentSyllabus'

export default function ComponentsRouting() {
  return (
    <div>
    <Routes>
        <Route path='/' element={<LoginForm/>}></Route>
        <Route path='/signform' element={<SignForm/>}></Route>
        <Route path='/profile' element={<StudentProfile/>}></Route>
        <Route path='syllabus1' element={<StudentSyllabus/>}></Route>
        <Route path='syllabusfile' element={<MainSyllabusFile/>}></Route>
        <Route path='subject' element={<Subject1/>}></Route>
    </Routes>
    </div>
  )
}
