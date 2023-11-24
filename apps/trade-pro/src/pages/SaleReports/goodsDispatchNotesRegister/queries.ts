import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedUserDetail } from '@tradePro/utils/storageService';
import { gdnRegisterCriteria } from './type';

const userDetail = storedUserDetail();

const [CompanyId, OrganizationId] = [
    userDetail?.CompanyId,
    userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };

export const useGetCustomer = (enabled  =true) => {
    return useQuery('gdn-Customers', () => {
        return requestManager.get('/api/SupplierCustomer/SupplierCustomerAgainstGdn', {
            params,
        });
    },
    {enabled}
    );
};


export const useGetGdnRegister = (enabled = true, params?: gdnRegisterCriteria) => {
    return useQuery(
      'Gdn-Register-History',
      () => {
        return requestManager.post('/api/Inventory/GDNRetailRegister', {
          OrganizationId: userDetail?.OrganizationId,
          CompanyId: userDetail?.CompanyId,
          DocumentTypeId:86,
          ...params,
        });
      },
      { enabled }
    );
  };
  
  
  
  
  
  
  


