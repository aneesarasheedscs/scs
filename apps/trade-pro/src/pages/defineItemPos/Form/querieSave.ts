import { useMutation, useQuery } from 'react-query';
import { requestManager } from '@tradePro/configs/requestManager';
import { TPurchaseOrderSearchCriteria } from '../type';
import { queryClient } from '@tradePro/configs/index';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { isNumber } from 'lodash';
import { TSubjectListFormDataOnAdd } from './types';

const userDetail: any = JSON.parse(localStorage.getItem('loggedInUserDetail') || '{}');
const financialYear: any = JSON.parse(localStorage.getItem('financialYear') || '{}');
//Item getbyId
export const useGetItemById = (Id?: number | null) => {
  return useQuery(
    ['subject', Id],
    () => {
      return getItemById(Id);
    },
    {
      cacheTime: 0,
      staleTime: 0,
      enabled: false,
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};
const getItemById = (Id?: number | null) => {
  return requestManager.get('/api/Item/GetByID', { params: { Id } });
};
//Form Save api
export const useSaveItemCategory = (Id?: number | null) => {
  return useMutation(
    (data: TSubjectListFormDataOnAdd) => {
      console.log(data);
      return saveItemCategory(data, Id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('save-item');
        const msg = Id ? 'Record updated successfully!' : 'Record added successfully!';
        notification.success({ description: '', message: msg });
      },
      onError: (error: AxiosError) => {
        const msg = error.response?.data || 'Something went wrong';
        notification.error({ description: '', message: msg as string });
      },
    }
  );
};

const saveItemCategory = (data: any, Id?: number | null) => {
  let dataToSubmit = {};
  if (isNumber(Id)) {
    dataToSubmit = {
      RecordNo: 100,
      Id: 1,
      ItemCode: '1001',
      ItemName: 'MAKAI ATTA 40KG',
      BaseUnitId: 12,
      ItemCategoryId: 1,
      ItemTypeId: 7,
      ItemClassId: 1,
      PurchaseGLAC: 21540,
      SaleGLAC: 21536,
      COGSGLAC: 21538,
      HSCode: '',
      PackQty: 1.0,
      ItemStatus: true,
      ManufactureId: 0,
      BuyerSupplierId: 0,
      BuyerPartNo: '',
      ProductNo: null,
      MinStockLevel: 20.0,
      OptimalStockLevel: 5.0,
      MaxStockLevel: 1000.0,
      ReorderLevel: 20.0,
      ItemOriginId: 25,
      CostPrice: 3995.0,
      UOMScheduleIdCostRate: 0,
      PurchasePrice: 3995.0,
      UOMScheduleIdPurRate: 0,
      RetailPrice: 4000.0,
      UOMScheduleIdRetailRate: 0,
      WholeSalePrice: 4000.0,
      UOMScheduleIdWhsRate: 0,
      AmountCalcType: null,
      BarcodeImage: '',
      BarcodeNo: '1001',
      BaseCropYear: '',
      ApplyGST: false,
      ApplyVAT: false,
      ApplyExciese: false,
      OtherTax: false,
      Pic1: null,
      Pic2: '',
      PostDate: '2023-05-23T13:07:28.953',
      PostUser: 0,
      PostState: false,
      OrganizationId: 2,
      CompanyId: 2,
      BranchesId: 0,
      ProjectsId: 0,
      GlStockAccountTitle: 'MAKAI ATTA 40KG STOCK A/C',
      GlSaleAccountTitle: 'DAAL & OTHERS SALE A/C',
      GlCgsAccountTitle: 'DAAL & OTHERS CGS A/C',
      CategoryDescription: 'DAAL & OTHERS',
      TypeDescription: 'ATTA',
      UOMCode: '40KG',
      InvParentCateDescription: 'DAAL & OTHERS',
      ClassGroupName: 'Finish Goods',
      ProductType: null,
      MasterItemId: 0,
      ItemSpecification: '',
      UomLookUpId: 25,
      ItemAliasName: 'مکئی آٹا 40 کلو گرام',
      PurchaseTypeLookUpId: 28,
      IsExpirable: false,
      ShelfLife: 0,
      IsDiscountable: false,
      SaleTaxPurPercent: 0.0,
      AtRetailPriceTax: false,
      AtPurcahsePriceTax: false,
      SaleTaxSalesPercent: 0.0,
      IsTaxable: false,
      DepreciationExpenseAcId: 0,
      accumulatedDepreciationAcId: 0,
      CapitalWipAcId: 0,
      EntryUserName: 'INAM TRADER-',
      EntryUserId: 2,
      EntryDate: '2023-05-19T14:33:12.403',
      ModifyUserName: 'INAM TRADER-',
      ModifyUser: 2,
      ModifyDate: '2023-05-23T13:07:28.953',
      EntryUserProfileImage: null,
      MoidifyUserProfileImage: null,
      NoOfAttachments: 0,
      ...data,
    };
  } else {
    dataToSubmit = {
      itemId: 0,
      RecordNo: 100,
      Id: 1,
      ItemCode: '1001',
      ItemName: 'MAKAI ATTA 40KG',
      BaseUnitId: 12,
      ItemCategoryId: 1,
      ItemTypeId: 7,
      ItemClassId: 1,
      PurchaseGLAC: 21540,
      SaleGLAC: 21536,
      COGSGLAC: 21538,
      HSCode: '',
      PackQty: 1.0,
      ItemStatus: true,
      ManufactureId: 0,
      BuyerSupplierId: 0,
      BuyerPartNo: '',
      ProductNo: null,
      MinStockLevel: 20.0,
      OptimalStockLevel: 5.0,
      MaxStockLevel: 1000.0,
      ReorderLevel: 20.0,
      ItemOriginId: 25,
      CostPrice: 3995.0,
      UOMScheduleIdCostRate: 0,
      PurchasePrice: 3995.0,
      UOMScheduleIdPurRate: 0,
      RetailPrice: 4000.0,
      UOMScheduleIdRetailRate: 0,
      WholeSalePrice: 4000.0,
      UOMScheduleIdWhsRate: 0,
      AmountCalcType: null,
      BarcodeImage: '',
      BarcodeNo: '1001',
      BaseCropYear: '',
      ApplyGST: false,
      ApplyVAT: false,
      ApplyExciese: false,
      OtherTax: false,
      Pic1: null,
      Pic2: '',
      PostDate: '2023-05-23T13:07:28.953',
      PostUser: 0,
      PostState: false,
      OrganizationId: 2,
      CompanyId: 2,
      BranchesId: 0,
      ProjectsId: 0,
      GlStockAccountTitle: 'MAKAI ATTA 40KG STOCK A/C',
      GlSaleAccountTitle: 'DAAL & OTHERS SALE A/C',
      GlCgsAccountTitle: 'DAAL & OTHERS CGS A/C',
      CategoryDescription: 'DAAL & OTHERS',
      TypeDescription: 'ATTA',
      UOMCode: '40KG',
      InvParentCateDescription: 'DAAL & OTHERS',
      ClassGroupName: 'Finish Goods',
      ProductType: null,
      MasterItemId: 0,
      ItemSpecification: '',
      UomLookUpId: 25,
      ItemAliasName: 'مکئی آٹا 40 کلو گرام',
      PurchaseTypeLookUpId: 28,
      IsExpirable: false,
      ShelfLife: 0,
      IsDiscountable: false,
      SaleTaxPurPercent: 0.0,
      AtRetailPriceTax: false,
      AtPurcahsePriceTax: false,
      SaleTaxSalesPercent: 0.0,
      IsTaxable: false,
      DepreciationExpenseAcId: 0,
      accumulatedDepreciationAcId: 0,
      CapitalWipAcId: 0,
      EntryUserName: 'INAM TRADER-',
      EntryUserId: 2,
      EntryDate: '2023-05-19T14:33:12.403',
      ModifyUserName: 'INAM TRADER-',
      ModifyUser: 2,
      ModifyDate: '2023-05-23T13:07:28.953',
      EntryUserProfileImage: null,
      MoidifyUserProfileImage: null,
      NoOfAttachments: 0,
      ...data,
    };
  }
  return requestManager.post('/api/Item/Save', dataToSubmit);
};
// export type TItemCategoryDataOnAdd = {};
