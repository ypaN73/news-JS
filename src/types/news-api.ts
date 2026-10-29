export enum NewsCategory {
    Business = 'business',
    Entertainment = 'entertainment',
    General = 'general',
    Health = 'health',
    Science = 'science',
    Sports = 'sports',
    Technology = 'technology',
}

export enum NewsLanguage {
    Arabic = 'ar',
    German = 'de',
    English = 'en',
    Spanish = 'es',
    French = 'fr',
    Hebrew = 'he',
    Italian = 'it',
    Dutch = 'nl',
    Norwegian = 'no',
    Portuguese = 'pt',
    Russian = 'ru',
    Swedish = 'sv',
    Urdu = 'ud',
    Chinese = 'zh',
}

export type NewsApiStatus = 'ok' | 'error';

export interface NewsApiSource {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly url: string;
    readonly category: NewsCategory;
    readonly language: NewsLanguage;
    readonly country: string;
}

export type NewsApiArticleSource = Readonly<
    Pick<NewsApiSource, 'name'> & {
        id: string | null;
    }
>;

export interface NewsApiArticle {
    readonly source: NewsApiArticleSource;
    readonly author: string | null;
    readonly title: string;
    readonly description: string | null;
    readonly url: string;
    readonly urlToImage: string | null;
    readonly publishedAt: string;
    readonly content: string | null;
}

export interface NewsApiSourcesSuccessResponse {
    readonly status: 'ok';
    readonly sources: ReadonlyArray<NewsApiSource>;
}

export interface NewsApiEverythingSuccessResponse {
    readonly status: 'ok';
    readonly totalResults: number;
    readonly articles: ReadonlyArray<NewsApiArticle>;
}

export interface NewsApiErrorResponse {
    readonly status: 'error';
    readonly code: string;
    readonly message: string;
}

export type NewsApiResponse = NewsApiSourcesSuccessResponse | NewsApiEverythingSuccessResponse | NewsApiErrorResponse;

export enum NewsEndpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export type NewsSortBy = 'relevancy' | 'popularity' | 'publishedAt';

export interface NewsEverythingParams {
    readonly sources?: string;
    readonly q?: string;
    readonly searchIn?: 'title' | 'description' | 'content' | string;
    readonly domains?: string;
    readonly excludeDomains?: string;
    readonly from?: string;
    readonly to?: string;
    readonly language?: NewsLanguage;
    readonly sortBy?: NewsSortBy;
    readonly pageSize?: number;
    readonly page?: number;
}

export interface NewsSourcesParams {
    readonly category?: NewsCategory;
    readonly language?: NewsLanguage;
    readonly country?: string;
}

export type NewsRequestParams =
    | { readonly endpoint: NewsEndpoint.Sources; readonly options?: NewsSourcesParams }
    | { readonly endpoint: NewsEndpoint.Everything; readonly options?: NewsEverythingParams };

export type NewsRequestOptions = Record<string, string | undefined>;
