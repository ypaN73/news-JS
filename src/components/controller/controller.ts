import AppLoader from './appLoader';
import { NewsApiEverythingSuccessResponse, NewsApiSourcesSuccessResponse, NewsEndpoint } from '../../types/news-api';

class AppController extends AppLoader {
    public getSources(callback: (data: NewsApiSourcesSuccessResponse) => void): void {
        super.getResp<NewsApiSourcesSuccessResponse>(
            {
                endpoint: NewsEndpoint.Sources,
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: (data: NewsApiEverythingSuccessResponse) => void): void {
        let target = e.target as HTMLElement | null;
        const newsContainer = e.currentTarget as HTMLElement | null;

        if (!newsContainer) {
            return;
        }

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<NewsApiEverythingSuccessResponse>(
                        {
                            endpoint: NewsEndpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;
