import { Collection, Heading, useTheme, View } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";
import { Schema } from "../../amplify/data/resource";
import { RecipeCard } from "./RecipeCard";

const client = generateClient<Schema>();

export const RecipeList = () => {
  const { tokens } = useTheme();
  const [recipes, setRecipes] = useState<Schema["Recipe"]["type"][]>([]);

  useEffect(() => {
    client.models.Recipe.observeQuery().subscribe({
      next: (data) => setRecipes([...data.items]),
    });
  }, []);

  return (
    <View backgroundColor={tokens.colors.background.primary}>
      <Heading level={3} padding={tokens.space.medium} textAlign="center">
        Generate a Recipe
      </Heading>

      <Collection
        items={recipes}
        type="list"
        direction="column"
        gap="20px"
        wrap="nowrap"
      >
        {(item, index) => <RecipeCard key={index} {...item} />}
      </Collection>
    </View>
  );
};
