export interface IFilterRequest {
    skip?: number;
    q?: string;
    limit?: number;
    category?: string;
    brand?: string;
    select?: string; 
}

export interface IFilter {
    category?: string;
    isSearch?: boolean;
    skip?: number;
    limit?: number;
    brand?: string;
    select?: string; 
}

export interface ISelectOption {
    id: string;
    title: string;
}

export enum Sort {
    'asc' = 'asc',
    'desc' = 'desc',
    'price_asc' = 'price_asc',
    'price_desc' = 'price_desc',
}

export enum SortRussian {
    'asc' = 'По алфавиту',
    'desc' = 'По алфавиту в обратном порядке',
    'price_asc' = 'По возрастанию цены',
    'price_desc' = 'По убыванию цены',
}

export function getSortingRussianAsArray(): ISelectOption[] {
    const sort: ISelectOption[] = [];
    Object.values(SortRussian).map((value, i) => sort.push({ title: value, id: Object.values(Sort)[i] }));

    return sort;
}