export type TDivisionList = {
   ProvinceName: string;
   DivisionCode: number;
   DivisionName: string;
   DivisionId: number;
  };

  export type  TDistrictList = {
    DivisionName: string;
    DistrictCode: number;
    DistrictName: string;
    DistrictId:number;
   };

   export type TTehsilList = {
    TehsilId: number;
    DistrictName: string;
    TehsilCode:number;
    TehsilName:string;
   }

   export type TTownList = {
    TownId: number;
    TehsilName:string;
    TownCode:number;
    TownName:string;
   }
 
  