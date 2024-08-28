
export interface PaginatedResponseSchema {
  items: {
    $id: number;
    $values: any[];
  };
  pageIndex: number;
  totalPages: number;
  length:number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
