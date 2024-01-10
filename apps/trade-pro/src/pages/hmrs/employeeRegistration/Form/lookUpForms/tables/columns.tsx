import { AntColumnType } from '@tradePro/globalTypes';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { AntButton } from '@scs/ui';

export const columns = (t?: any): AntColumnType<any>[] => [
  {
    width: 260,
    searchableInput: true,
    title: <>{t('category_name')}</>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
  {
    width: 250,
    searchableInput: true,
    title: <>{t('short_name')} </>,
    dataIndex: 'CategoryDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryDescription.localeCompare(b.CategoryDescription),
  },
];
export const epmloyeeGroupColumns = (t?: any): AntColumnType<any>[] => [
  {
    width: 250,
    searchableInput: true,
    title: <>{t('short_name')} </>,
    dataIndex: 'CategoryDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryDescription.localeCompare(b.CategoryDescription),
  },
  {
    width: 260,
    searchableInput: true,
    title: <>{t('employee_group')}</>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
];
export const shiftColumns = (t?: any): AntColumnType<any>[] => [
  {
    width: 250,
    searchableInput: true,
    title: <>{t('shift_name')} </>,
    dataIndex: 'CategoryDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryDescription.localeCompare(b.CategoryDescription),
  },
  {
    width: 260,
    searchableInput: true,
    title: <>{t('short_name')} </>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
];
export const sectionColumns = (t?: any): AntColumnType<any>[] => [
  {
    width: 240,
    searchableInput: true,
    title: <>{t('department')} </>,
    dataIndex: 'CategoryDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryDescription.localeCompare(b.CategoryDescription),
  },
  {
    width: 200,
    searchableInput: true,
    title: <>{t('short_name')} </>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
  {
    width: 200,
    searchableInput: true,
    title: <>{t('section_name')} </>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
  {
    width: 150,
    searchableInput: true,
    title: <>{t('code')} </>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
];
export const benefitsColumns = (t?: any): AntColumnType<any>[] => [
  {
    width: 200,
    searchableInput: true,
    title: <>{t('benefit_profile')} </>,
    dataIndex: 'CategoryDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryDescription.localeCompare(b.CategoryDescription),
  },
  {
    width: 200,
    searchableInput: true,
    title: <>{t('benefit_name')} </>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
  {
    width: 180,
    searchableInput: true,
    title: <>{t('prefix')} </>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
];
export const departmentColumns = (t?: any): AntColumnType<any>[] => [
  {
    width: 150,
    searchableInput: true,
    title: <>{t('type')} </>,
    dataIndex: 'CategoryDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryDescription.localeCompare(b.CategoryDescription),
  },
  {
    width: 150,
    searchableInput: true,
    title: <>{t('short_name')} </>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
  {
    width: 180,
    searchableInput: true,
    title: <>{t('name')} </>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
  {
    width: 180,
    searchableInput: true,
    title: <>{t('payable_ac')} </>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
  {
    width: 180,
    searchableInput: true,
    title: <>{t('expense_ac')} </>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
  {
    width: 180,
    searchableInput: true,
    title: <>{t('loan_account')} </>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
];
export const column = (t?: any): AntColumnType<any>[] => [
  {
    width: 510,
    searchableInput: true,
    title: <>{t('name')}</>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
];
export const locationColumns = (t?: any): AntColumnType<any>[] => [
  {
    width: 150,
    searchableInput: true,
    title: <>{t('type')} </>,
    dataIndex: 'CategoryDescription',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryDescription.localeCompare(b.CategoryDescription),
  },
  {
    width: 180,
    searchableInput: true,
    title: <>{t('location_name')} </>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
  {
    width: 150,
    searchableInput: true,
    title: <>{t('short_name')} </>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },

  {
    width: 180,
    searchableInput: true,
    title: <>{t('sub_name')} </>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
  {
    width: 130,
    searchableInput: true,
    title: <>{t('mobile_1')} </>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
  {
    width: 130,
    searchableInput: true,
    title: <>{t('mobile_2')} </>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
  {
    width: 120,
    searchableInput: true,
    title: <>{t('email')} </>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
  {
    width: 150,
    searchableInput: true,
    title: <>{t('portal_url')} </>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
  {
    width: 180,
    searchableInput: true,
    title: <>{t('address_detail')} </>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
  {
    width: 150,
    searchableInput: true,
    title: <>{t('license_no')} </>,
    dataIndex: 'CategoryCode',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => a.CategoryCode.localeCompare(b.CategoryCode),
  },
];
