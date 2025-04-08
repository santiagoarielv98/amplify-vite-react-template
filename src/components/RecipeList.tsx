import { Collection, Heading, useTheme, View } from "@aws-amplify/ui-react";
import { RecipeCard, RecipeProps } from "./RecipeCard";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../amplify/data/resource";
import { useEffect, useState } from "react";

const client = generateClient<Schema>();

export const RecipeList = () => {
  const { tokens } = useTheme();
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);

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
