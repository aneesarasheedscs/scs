export interface TWareHouseHistory {
  WareHouseCode: string;
  WareHouseName: string;
  IsActive: boolean;
  Id: number;
}

export interface TWareHouseSearchCriteria {
  WareHouseCode: string;
  WareHouseName: string;
  IsActive: boolean;
}

export interface TDefineWareHouseOnAdd {
  OrganizationId: number;
  CompanyId: number;
  WareHouseName: string;
  WareHouseCode: string;
  IsActive: boolean;
  EntryUser: number;
  EntryDate: string;
}
