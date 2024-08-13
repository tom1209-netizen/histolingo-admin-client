import { PaginationQuery } from './common.schema';

export interface SearchQuery extends PaginationQuery {
    search?: string;
    status?: any;
}
