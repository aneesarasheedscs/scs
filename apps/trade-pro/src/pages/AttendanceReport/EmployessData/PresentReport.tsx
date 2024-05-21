import { AntTablecopy } from '@scs/ui';
import { AntColumnType } from '@tradePro/globalTypes';
import { TFunction } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';

function PresentReport() {
  const { t } = useTranslation();
  return (
    <>
      <AntTablecopy showDefaultTableGrid={true} columns={columns(t)} />
    </>
  );
}

export default PresentReport;
const columns = (t: TFunction): AntColumnType<any>[] => [
  {
    title: 'Employee Name',
    dataIndex: '',
  },
  {
    title: 'Present',
    dataIndex: '',
  },
  {
    title: 'Absent',
    dataIndex: '',
  },
  {
    title: 'Late',
    dataIndex: '',
  },
];
