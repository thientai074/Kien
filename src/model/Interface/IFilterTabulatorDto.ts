export interface PageTabulatorDto{
    page: number,
    size: number,
    sorters: [],
    filters: FilterTabulator[],
}

export interface FilterTabulator {
    field: string,
    type: string,
    value: any,
}
