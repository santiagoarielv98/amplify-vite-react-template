import { Collection, Heading, useTheme, View } from '@aws-amplify/ui-react';
import { RecipeCard, RecipeProps } from './RecipeCard';

export const RecipeList = () => {
    const { tokens } = useTheme();

    const exampleRecipes: RecipeProps[] = [
        {
            title: 'Mediterranean Quinoa Bowl',
            description: 'A delicious and healthy quinoa bowl with roasted vegetables, chickpeas, and a lemon tahini dressing.',
            prepTime: 15,
            cookTime: 25,
            servings: 4,
            difficulty: 'easy',
            ingredients: [
                'Quinoa', 'Bell Peppers', 'Zucchini', 'Chickpeas', 'Cherry Tomatoes',
                'Cucumber', 'Red Onion', 'Feta Cheese', 'Tahini', 'Lemon Juice', 'Olive Oil'
            ],
            restrictions: ['Vegetarian', 'Gluten-Free'],
            tags: ['Healthy', 'Mediterranean'],
        },
        {
            title: 'Spicy Thai Basil Chicken',
            description: 'A flavorful and spicy Thai dish with minced chicken, basil leaves, and chili peppers.',
            prepTime: 10,
            cookTime: 20,
            servings: 2,
            difficulty: 'medium',
            ingredients: [
                'Chicken', 'Thai Basil', 'Thai Chili', 'Garlic', 'Soy Sauce',
                'Fish Sauce', 'Brown Sugar', 'Oyster Sauce', 'Vegetable Oil'
            ],
            restrictions: ['Dairy-Free'],
            tags: ['Thai', 'Spicy', 'Quick'],
        },
        {
            title: 'Vegan Chocolate Avocado Mousse',
            description: 'A rich and creamy chocolate mousse made with avocados instead of dairy.',
            prepTime: 15,
            cookTime: 0,
            servings: 4,
            difficulty: 'easy',
            ingredients: [
                'Avocados', 'Cocoa Powder', 'Maple Syrup', 'Vanilla Extract',
                'Almond Milk', 'Salt', 'Dark Chocolate'
            ],
            restrictions: ['Vegan', 'Gluten-Free', 'Dairy-Free'],
            tags: ['Dessert', 'Healthy'],
        }
    ];

    return (
        <View
            backgroundColor={tokens.colors.background.primary}
        >
            <Heading level={3} padding={tokens.space.medium} textAlign="center">Generate a Recipe</Heading>

            <Collection
                items={exampleRecipes}
                type="list"
                direction="column"
                gap="20px"
                wrap="nowrap"
            >
                {(item, index) => (
                    <RecipeCard key={index} {...item} />
                )}
            </Collection>
        </View>
    );
}
