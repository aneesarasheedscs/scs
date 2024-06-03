export type TItem = {
  ItemName: string;
  Qty: number;
  Weight: number;
  Amount: number;
};
export type TCustomer = {
  CustomerName: string;
  Qty: number;
  Weight: number;
  Amount: number;
};
export type TItemPacks = {
  PackUom: string;
  Qty: number;
  Weight: number;
  Amount: number;
};
export type TPackItem = {
  ItemName: string;
  Qty: number;
  Weight: number;
  Amount: number;
  PackUom: string;
};
export type TFilters = {
  FromDate: string;
  ToDate: string;
  ItemId: number;
};
