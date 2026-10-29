import News from './news/news';
import Sources from './sources/sources';
import {
    NewsApiArticle,
    NewsApiEverythingSuccessResponse,
    NewsApiSource,
    NewsApiSourcesSuccessResponse,
} from '../../types/news-api';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: NewsApiEverythingSuccessResponse): void {
        const values: ReadonlyArray<NewsApiArticle> = data.articles ?? [];
        this.news.draw(values);
    }

    public drawSources(data: NewsApiSourcesSuccessResponse): void {
        const values: ReadonlyArray<NewsApiSource> = data.sources ?? [];
        this.sources.draw(values);
    }
}

export default AppView;
