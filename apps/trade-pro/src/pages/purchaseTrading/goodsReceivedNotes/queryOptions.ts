import { useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { storedFinancialYear, storedUserDetail } from '@tradePro/utils/storageService';

const userDetail = storedUserDetail();
const financialYear = storedFinancialYear();

const [BranchesId, CompanyId, OrganizationId] = [
  userDetail?.BranchesId,
  userDetail?.CompanyId,
  userDetail?.OrganizationId,
];

const params = { CompanyId, OrganizationId };

export const useGetDocumentNumber = () => {
  return useQuery(
    'document-number',
    () => {
      return requestManager.get(
        '/api/InvGrn/GenerateCode?OrganizationId=2&CompanyId=2&BranchesId=2&DocumentTypeId=46&FinancialYearId=2',
        {
          params: { ...params, BranchesId, DocumentTypeId: 46, FinancialYearId: financialYear?.Id },
        }
      );
    },
    { cacheTime: 5000 }
  );
};

export const useGetSuppliersforGRN = () => {
  return useQuery('supplier-customer-GRN', () => {
    return requestManager.get('/api/SupplierCustomer/GetforComboBinding?OrganizationId=2&CompanyId=2', {
      params,
    });
  });
};
//Vehicle Type
export const useGetVehicleType = () => {
  return useQuery('vehicle-type', () => {
    return requestManager.get('/api/VehicleType/GetAll', {});
  });
};
//Transporter
export const useGetTransporters = () => {
  return useQuery('transporters', () => {
    return requestManager.get('/api/COAAllocation/GetAll?OrganizationId=2&CompanyId=2', { params });
  });
};
//Delivery Term

export const useGetDeliveryTerms = () => {
  return useQuery('deliveryTerms', () => {
    return requestManager.get('/api/CommonController/StaticColumnNames', {
      params: { Activity: 'DeliveryTerm' },
    });
  });
};
//Job Lot
export const useGetJobLot = () => {
  return useQuery('jobLot', () => {
    return requestManager.get('/api/JobLot/GetByOrganizationCompanyId', {
      params,
    });
  });
};
//City Bind
export const useGetCityName = () => {
  return useQuery('city', () => {
    return requestManager.get('/api/City/GetByOrganizationCompanyId', {
      params,
    });
  });
};
//WareHouse Bind
export const useGetWareHouseName = () => {
  return useQuery('warehouse', () => {
    return requestManager.get('/api/InvWareHouse/GetAllWarehouse', {
      params,
    });
  });
};
