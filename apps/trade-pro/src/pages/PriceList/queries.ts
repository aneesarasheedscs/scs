import { QueryFunction, useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';
import { queryClient } from '@tradePro/configs';
import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import dayjs from 'dayjs';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };

export const useGetPriceList = (enabled = true) => {
  return useQuery(
    'price_list',
    () => {
      return requestManager.post('/api/ItemPricingSchedule/GetItemPricingList', {
        BranchesId: userDetail?.BranchesId,
        EffectedDate: new Date(),
        //Optional
        // ItemTypeId: 0,
        // ItemCategoryId: 0,
        ...params,
      });
    },
    { enabled }
  );
};
