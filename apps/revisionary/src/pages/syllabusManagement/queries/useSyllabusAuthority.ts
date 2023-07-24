import { useQuery } from 'react-query';
import { requestManager } from '@revisionary/configs/requestManager';

export const useGetSyllabusAuthority = () => useQuery('syllabus-authority', getSyllabusAuthority);

const getSyllabusAuthority = () => requestManager.get('/SyllabusAuthority/GetBySearch');
