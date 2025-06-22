export type TApiResponse<T> = {
    data: T;
    message: string | null;
    success: true;
    timeStamp: string
}

export type TPage<T> = {
    content: T[];
    pageable: {
            pageNumber: number,
            pageSize: number,
            sort: {
                sorted: boolean,
                empty: boolean,
                unsorted: boolean
            },
            offset: number,
            paged: boolean,
            unpaged: boolean
        },
        last: boolean,
        totalPages: number,
        totalElements: number,
        first: boolean,
        size: number,
        number: number,
        sort: {
            sorted: boolean,
            empty: boolean,
            unsorted: boolean
        },
        numberOfElements: number,
        empty: boolean
}

export interface TPaginatedApiResponse<T> extends TApiResponse<TPage<T>> {}

export type TValidationErrorField = {
    field: string;
    invalidValue: string;
    message: string;
}

export type TError = {
    message: string;
    errorCode: string;
    path: string;
    success: false
    timeStamp: string
}

export interface TValidationError extends TError {
    validationErrors: TValidationErrorField[]
}

export type TApiError = TError | TValidationError