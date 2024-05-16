import { Gutter } from 'antd/es/grid/row';
import { atomWithStorage } from 'jotai/utils';

export const colorPrimaryAtom = atomWithStorage('colorPrimary', '#25A7DF'); //#5A54F9

export  const FormRowGutter: Gutter | [Gutter, Gutter]= [0,5]
export  const CriteriaRowGutter: Gutter | [Gutter,Gutter]= [0,4]