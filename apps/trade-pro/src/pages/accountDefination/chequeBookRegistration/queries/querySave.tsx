import { queryClient } from '@tradePro/configs/index';
import { useMutation } from 'react-query';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { TSaveChequeBook } from '../form/types';

// save form

const userDetail = storedUserDetail();
export const useAddChequeBookRegistration = (params?: TSaveChequeBook) => {
  return useMutation(
    'chequebookregistration-add',
    (data: TSaveChequeBook) => {
      let dataToSubmit = {};

      const { CbSrFrom, CbSrTo, Remarks, BankId } = data; // Assuming 'CbSrFrom' and 'CbSrTo' correspond to form fields

      // Parse 'CbSrFrom' and 'CbSrTo' as integers
      const serialFrom = parseInt(CbSrFrom, 10);
      const serialTo = parseInt(CbSrTo, 10);

      if (isNaN(serialFrom) || isNaN(serialTo)) {
        // Handle invalid input (e.g., non-numeric values)
        return Promise.reject("Invalid 'Serial From' or 'Serial To' values.");
      }

      const Cheqbookdetaillist = [];

      for (let i = serialFrom; i <= serialTo; i++) {
        Cheqbookdetaillist.push({
          CheqNo: `${i}`,
          CheqStatus: 'Blank',
          OtherRemarks: Remarks,
        });
      }
      dataToSubmit = {
        ...data,
        Id: 0,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        ModifyDate: new Date().toISOString(),
        EntryDate: new Date().toISOString(),
        PostDate: new Date().toISOString(),
        DocNo: 0,
        ChartOfAccountId: BankId,
        EntryUser: userDetail?.UserId,
        Cheqbookdetaillist,
        ...params,
      };
      return requestManager.post('/api/CheqBookHeader/Save', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('chequebookregistration-history');
        const msg = 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
