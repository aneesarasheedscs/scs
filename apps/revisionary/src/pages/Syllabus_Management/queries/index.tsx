import { useQuery } from 'react-query';
import { requestManager } from '@revisionary/configs/requestManager';

export const useSyllabus = () => useQuery('cards', getSyllabus);

const getSyllabus = () => requestManager.get('/SyllabusAuthority/GetBySearch');
