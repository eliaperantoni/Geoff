export default class Search {
    static search(items, text, category, sort) {
        const doesItemMatchText = item => {
            const doesStringResemble = str => {
                return str.toLowerCase().includes(text.toLowerCase());
            }

            return doesStringResemble(item.name) ||
                doesStringResemble(item.brand) ||
                item.tags.reduce((acc, tag) => acc || doesStringResemble(tag), false);
        }

        const doesItemMatchCategory = item => item.category === category;

        const filters = [];

        if (text !== "") filters.push(doesItemMatchText);
        if (category !== "") filters.push(doesItemMatchCategory);

        items = JSON.parse(JSON.stringify(items)).filter(item => {
            for (const filter of filters) if (!filter(item)) return false;
            return true;
        });

        const sortFunctions = {
            name: (a, b) => a.name.localeCompare(b.name),
            brand: (a, b) => a.brand.localeCompare(b.brand),
            price: (a, b) => a.price - b.price,
        }

        items = items.sort(sortFunctions[sort.target]);

        if (sort.order === "desc") items.reverse();

        return items;
    }
}