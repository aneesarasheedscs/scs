

// import { requestManager } from "@scs/configs";
import { requestManager } from "@revisionary/configs/requestManager";
import { useQuery } from "react-query";


export const useGetClasses = () => useQuery("classes", getClass);

  // services
const getClass = () => {
    const appUser = JSON.parse(localStorage.getItem("app-user") || "{}");
  
    return requestManager.get("/Class/GetBySearch", {
      params: {
        CampusId: appUser?.campusId,
        InstituteId: appUser?.instituteId,
        OrganizationId: appUser?.organizationId,
      },
    });
  };

  export const useGetClassDivisions = () => useQuery("class-divisions", getClassDivision);
  
// services
const getClassDivisionId = (ClassSubDivisionId?: number) => {
    return requestManager.get("/ClassSubDivision/GetById", { params: { ClassSubDivisionId } });
  };
  
  const getClassDivision = () => {
    const appUser = JSON.parse(localStorage.getItem("app-user") || "{}");
  
    return requestManager.get("/ClassSubDivision/GetBySearch", {
      params: {
        CampusId: appUser?.campusId,
        InstituteId: appUser?.instituteId,
        OrganizationId: appUser?.organizationId,
      },
    });
  };
  