import { NewsApiResponse, NewsEndpoint, NewsRequestOptions } from '../../types/news-api';

export enum HttpMethod {
    Get = 'GET',
}

type LoaderOptions = Record<string, string | undefined>;

type ResponseCallback<T extends NewsApiResponse> = (data: T) => void;

class Loader {
    private readonly baseLink: string;
    private readonly options: LoaderOptions;

    constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T extends NewsApiResponse>(
        { endpoint, options = {} }: { endpoint: NewsEndpoint; options?: NewsRequestOptions },
        callback: ResponseCallback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>(HttpMethod.Get, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: NewsRequestOptions, endpoint: NewsEndpoint): string {
        const urlOptions: LoaderOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T extends NewsApiResponse>(
        method: HttpMethod,
        endpoint: NewsEndpoint,
        callback: ResponseCallback<T>,
        options: NewsRequestOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json() as Promise<T>)
            .then((data) => callback(data))
            .catch((err: unknown) => console.error(err));
    }
}

export default Loader;
