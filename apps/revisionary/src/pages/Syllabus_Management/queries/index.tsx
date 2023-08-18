import { useQuery } from 'react-query';
import { requestManager } from '@revisionary/configs/requestManager';

export const useSyllabus = () => useQuery('cards', getSyllabus);

const getSyllabus = () => requestManager.get('/SyllabusAuthority/GetBySearch');






// import { useQuery } from 'react-query';
// import { requestManager } from '@revisionary/configs/requestManager';

// export const useGetSyllabusAuthority = () => useQuery('syllabus-authority', getSyllabusAuthority);

// const getSyllabusAuthority = () => requestManager.get('/SyllabusAuthority/GetBySearch');





// import { useQuery } from 'react-query';
// import { requestManager } from '@revisionary/configs/requestManager';

// const fetchSyllabusAuthority = async () => {
//   const response = await requestManager.get('/SyllabusAuthority/GetBySearch');
//   return response.data.apiData;
// };

// export const useGetSyllabus = () => {
//   return useQuery('syllabus-authority', fetchSyllabusAuthority, {
//     onError: (error) => {
//       console.error('Error fetching syllabus authority:', error);
//     },
//   });
// };