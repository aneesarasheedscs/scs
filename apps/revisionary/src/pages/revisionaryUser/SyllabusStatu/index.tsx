import React from 'react';
import SyllabusStatus from './SyllabusTopic/SyllabusStatus';
import SyllabusSTopic from './SyllabusTopic/SyllabusTopic';
import SubStopic from './SyllabusTopic/SubStopic';
import SyllabusBooks from './SyllabusTopic/SyllabusBooks';
export default function MainSyllabusFile() {
  return (
    <div>
      <SyllabusBooks />
      <SyllabusStatus />
      <SyllabusSTopic />
      <SubStopic />
    </div>
  );
}
