import { AntColumnType } from "@tradePro/globalTypes";
import { TFunction } from "i18next";

export const Columns = (t:TFunction): AntColumnType<any>[] => [
    {
      title: 'Account Title',
      width: 150,
      dataIndex: 'AccountTitle',
    },
]