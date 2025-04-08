import { Collection } from '@aws-amplify/ui-react';
import { RecipeCard } from './RecipeCard';


export const RecipeList = () => {

    const items = [
        {
            title: 'Milford - Room #1',
            badges: ['Waterfront', 'Verified'],
        },
        {
            title: 'Milford - Room #2',
            badges: ['Mountain', 'Verified'],
        },
    ];

    return <Collection
        items={items}
        type="list"
        direction="column"
        gap="20px"
        wrap="nowrap"
    >
        {(_item, index) => (
            <RecipeCard key={index} />
        )}
    </Collection>
}
