import React from 'react'
import SyllabusStatus from './SyllabusStatus'
import Assessment from './SyllabusBooks'
import SyllabusSTopic from './SyllabusTopic'
import SubStopic from './SubStopic'
export default function MainSyllabusFile() {
  return (
    <div>
         <Assessment />
      <SyllabusStatus />
      <SyllabusSTopic/>
      <SubStopic />
     
    </div>
  )
}
