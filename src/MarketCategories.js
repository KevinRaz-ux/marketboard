import XIVAPI from './XIVAPI';
import MarketCategoryStock from './MarketCategoryStock';

class MarketCategories
{
    constructor()
    {
        this.ui = $('.market-categories');
    }

    render()
    {
        XIVAPI.getSearchCategories(response => {
            // re-order by category number
            let categoryGroups = {
                1: [],
                2: [],
                3: [],
                4: [],
            };

            // append to category group by cat value and order number
            response.forEach((category, i) => {
                categoryGroups[category.Category][category.Order] = category;
            });

            // render groups
            categoryGroups.forEach((categories, groupId) => {
                let html = [];

                categories.forEach((category, i) => {
                     html.push(`<button id="${category.ID}">${category.Name}</button>`);
                });

                this.ui.append(
                    `<div>${html.join('')}</div><br>`
                );
            });

            // watch for selection
            this.watchForSelection()
        });
    }

    watchForSelection()
    {
        this.ui.on('click', 'button', event => {
            const categoryItem = $(event.currentTarget).attr('id');

            // load market stock for this category
            MarketCategoryStock.listCategoryStock(categoryItem);
        });
    }
}

export default new MarketCategories;