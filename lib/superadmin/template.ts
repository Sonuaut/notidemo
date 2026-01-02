import { paginationLimit } from '@/types';
import qs from 'query-string';
import { makeApiRequest } from '@/lib/common/api-utils';

interface TemplatesResponse {
  templates: Template[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    next: null;
    previous: null;
  };
}

export interface Template {
  id: number
  name: string
  type: "staff" | "parent"
  subject: string
  content: string
  color: string
  createdDate: string
  is_custom: boolean
  is_active?: boolean
  template_color: string
}

export interface TemplateFilterParams {
  template_type?: string;
  is_active?: string;
  is_custom?: string;
  user_id?: number;
  school_id?: number;
  name?: string;
  offset?: number;
  limit?: number;
  withPagination?: boolean; // New parameter to control pagination
}

export interface TemplatequeryParam {
  template_type?: string;
  is_active?: boolean;
  is_custom?: string;
  user_id?: number;
  school_id?: number;
  name?: string;
  offset?: number;
  limit?: number;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// New interface for response without pagination
export interface TemplatesResponseWithoutPagination {
  templates: Template[];
}

// Example usage:
// 1. With pagination (default behavior):
// const result = await fetchTemplates({ 
//   template_type: "email", 
//   withPagination: true, // or omit this parameter (defaults to true)
//   limit: paginationLimit.LIMIT_20 
// });
// // Returns: { templates: Template[], pagination: PaginationInfo }

// 2. Without pagination (get all templates):
// const result = await fetchTemplates({ 
//   template_type: "email", 
//   withPagination: false 
// });
// // Returns: { templates: Template[] }

export async function fetchTemplates(
  filters: TemplateFilterParams = {}
): Promise<TemplatesResponse | TemplatesResponseWithoutPagination> {
  try {
    const { withPagination = true, ...otherFilters } = filters;
    const queryParams = buildTemplateQueryString({
      ...otherFilters,
      withPagination
    });
    const result = await makeApiRequest(
      `${API_URL}/api/v1/templates/get-all-web?${queryParams}`,
      'GET'
    );

    if (!result.success) {
      throw new Error(result.error ?? "Failed to fetch templates");
    }
console.log("result",result);
    let templatesreponse = withPagination ? result.data.data.result : result.data.data.templates;
    const formattedTemplates: Template[] = templatesreponse.map((item: any) => ({
      ...item, 
      subject: item.subject ?? item.template_subject ?? "",
      is_custom: Boolean(item.is_custom),
      type: String(item.type || "staff").toLowerCase(),
      createdDate: new Date(item.created_at).toISOString().split("T")[0],
    }));


    if(withPagination){
    return {
      templates: formattedTemplates,
      pagination: {
        total: result.data.data.pagination.total_template,
        limit: paginationLimit.LIMIT_10,
        offset: result.data.data.pagination.offset,
        total_pages: Math.ceil(result.data.data.pagination.total_template / paginationLimit.LIMIT_10),
        next: null,
        previous: null
      }
    };
  }
  return {
    templates: formattedTemplates,
  };
  } catch (error) {
    console.error('Error fetching templates:', error);
    return {
      templates: [],
      pagination: {
        total: 0,
        limit: paginationLimit.LIMIT_10,
        offset: 0,
        total_pages: 0,
        next: null,
        previous: null
      }
    };



    return {
      templates: [],
      pagination: {
        total: 0,
        limit: paginationLimit.LIMIT_10,
        offset: 0,
        total_pages: 0,
        next: null,
        previous: null
      }
    };
  }
}

// Utility function to fetch all templates without pagination
export async function fetchAllTemplates(
  filters: Omit<TemplateFilterParams, 'withPagination' | 'limit' | 'offset'> = {}
): Promise<TemplatesResponseWithoutPagination> {
  return fetchTemplates({
    ...filters,
    withPagination: false
  });
}

export const buildTemplateQueryString = (params: TemplateFilterParams) => {
  const queryParams: TemplatequeryParam = {};
  queryParams["name"] = params.name;
  queryParams["template_type"] = params.template_type;

  // Extract nested ternary into independent statement
  if (params.is_active) {
    queryParams["is_active"] = params.is_active === "true";
  }

  queryParams["is_custom"] = params.is_custom;
  queryParams["user_id"] = params.user_id;
  queryParams["school_id"] = params.school_id;

  // Only include offset and limit if pagination is enabled
  if (params.withPagination !== false) {
    queryParams["offset"] = params.offset;
    if (params.limit) {
      queryParams["limit"] = params.limit;
    } else {
      // Default limit when pagination is enabled
      queryParams["limit"] = paginationLimit.LIMIT_10;
    }
  }

  return qs.stringify(queryParams, {
    arrayFormat: "comma",
    skipNull: true,
    skipEmptyString: true,
    encode: false,
  });
};