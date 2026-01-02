
import { getCookie } from "@/actions/cookie";
import { ICookiesKey } from "@/types";
import qs from "query-string";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
export const schoolRevalidateTag="school"


export async function getSchoolsBySuperadmin(params:IParams) {
  const token= await getCookie(ICookiesKey.AUTHTOKEN);
  const response = await fetch(
    `${apiUrl}/api/v1/admin/?${buildQueryString(params)}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
        // "ngrok-skip-browser-warning": "1",
      },  next: { tags:["schoolRevalidateTag"] },
      
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("API error response:", errorText);
    throw new Error(`API responded with status ${response.status}`);
  }

  const data = await response.json();
return data
}


export interface IParams {
  searchText: string;
  // sortColumn?: string;
  // sortOrder?: string;
  limit?: number;
  offset?: number;
  // priority?: string;
  // batchId?: string | number;
  // status?: string;
  // deliveryDateStart?: string;
  // deliveryDateEnd?: string;
}

type QueryParameters = Record<string, any>;

const buildQueryString = (params: IParams) => {
    const queryParams: QueryParameters = {};
    queryParams["name"] = params.searchText;
    queryParams["limit"]=params.limit||"5";
    queryParams["offset"]=params.offset||"0";
  //   if (params.limit !== undefined) queryParams["limit"] = params.limit.toString();
  // if (params.offset !== undefined) queryParams["offset"] = params.offset.toString();
    // queryParams["sort"] = `${params.sortColumn}:${params.sortOrder} `;
    // queryParams["pagination[pageSize]"] = params?.rowsPerPage?.toString();
    // queryParams["pagination[page]"] = params?.page?.toString();
    // queryParams["filters[priority][$eq]"] = params?.priority;
    //   queryParams["filters[batch_id][$eq]"] = params.batchId?.toString();
    // queryParams["filters[status][$eq]"] = params.status?.toString() || "";
  
    //   let deliveryDateEnd = params.deliveryDateEnd;
    //   if (!deliveryDateEnd) {
    //     deliveryDateEnd = params.deliveryDateStart;
    //   }
    //   if (params.deliveryDateStart) {
    //     queryParams["filters[updated_on][$between]"] =
    //       "dt" + params.deliveryDateStart + "," + deliveryDateEnd;
    //   }
  
    return qs.stringify(queryParams, {
      arrayFormat: "comma",
      skipNull: true,
      skipEmptyString: true,
      encode: false,
    });
  };