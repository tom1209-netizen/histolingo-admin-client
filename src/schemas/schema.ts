import { PaginationQuery } from './common.schema';

export interface SearchQuery {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: any;
}
