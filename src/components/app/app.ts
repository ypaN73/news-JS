import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsApiEverythingSuccessResponse, NewsApiSourcesSuccessResponse } from '../../types/news-api';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesContainer = document.querySelector('.sources');
        if (!sourcesContainer) {
            throw new Error('Sources container not found');
        }

        sourcesContainer.addEventListener('click', (e: Event) =>
            this.controller.getNews(e as MouseEvent, (data: NewsApiEverythingSuccessResponse) =>
                this.view.drawNews(data)
            )
        );

        this.controller.getSources((data: NewsApiSourcesSuccessResponse) => this.view.drawSources(data));
    }
}

export default App;
