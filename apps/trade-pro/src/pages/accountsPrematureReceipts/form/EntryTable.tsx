import { AntTablecopy } from '@scs/ui';
import React from 'react';
import { columns } from './columns';
import { useTranslation } from 'react-i18next';
import { convertVhToPixels } from '@tradePro/utils/converVhToPixels';
import { TAccountsPrematureReceiptsList } from '../types';

function EntryTable({ tableData }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <AntTablecopy
        showDefaultTableGrid={true}
        data={tableData || []}
        columns={columns(t)}
        scroll={{ x: '', y: convertVhToPixels('30vh') }}
      />
    </>
  );
}

export default EntryTable;
interface Props {
  tableData: TAccountsPrematureReceiptsList[];
}
