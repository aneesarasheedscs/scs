import { isNumber } from 'lodash';
import { queryClient } from '@tradePro/configs/index';
import { useMutation } from 'react-query';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { TChequeDetail, TSaveChequeStatus } from '../form/types';
// import { TSaveChequeBook } from '../form/types';

// save form

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');

export const useAddChequeBookStatus = (params?: TSaveChequeStatus) => {
  return useMutation(
    'chequebookstatus-history',
    (data: TSaveChequeStatus | any) => {
      let dataToSubmit = {};
      const userDetail = storedUserDetail();

      const { Id, OtherRemarks, CheqCancelStatus } = data; // Assuming 'CbSrFrom' and 'CbSrTo' correspond to form fields

      const Cheqbookdetaillist = [];

      Cheqbookdetaillist.push({
        Id: Id, //Cheque  No Id To Cancel The Cheque
        OtherRemarks: OtherRemarks,
        CheqCancelStatus: CheqCancelStatus,
        StatusChangeUserId: 2,
      });

      dataToSubmit = {
        ...data,
        Id: 0,
        OrganizationId: userDetail?.OrganizationId,
        CompanyId: userDetail?.CompanyId,
        EntryUser: 2,
        DocDate: new Date().toISOString(),
        EntryDate: new Date().toISOString(),
        ModifyDate: new Date().toISOString(),
        PostDate: new Date().toISOString(),
        ...params,
        Cheqbookdetaillist,
      };
      return requestManager.post('/api/CheqBookHeader/CheqBookDetailSave', dataToSubmit);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('chequebookstatus-history');
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
