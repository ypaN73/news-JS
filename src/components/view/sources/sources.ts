import './sources.css';
import { NewsApiSource } from '../../../types/news-api';

class Sources {
    public draw(data: ReadonlyArray<NewsApiSource>): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) {
            throw new Error('Source item template not found');
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const nameEl = sourceClone.querySelector('.source__item-name');
            if (nameEl) {
                nameEl.textContent = item.name;
            }

            const itemEl = sourceClone.querySelector('.source__item');
            if (itemEl) {
                itemEl.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer) {
            sourcesContainer.appendChild(fragment);
        }
    }
}

export default Sources;
