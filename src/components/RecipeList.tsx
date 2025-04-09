import {
  Collection,
  Heading,
  Text,
  useTheme,
  View,
} from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";
import { Schema } from "../../amplify/data/resource";
import { RecipeCard } from "./RecipeCard";

const client = generateClient<Schema>();

export const RecipeList = () => {
  const { tokens } = useTheme();
  const [recipes, setRecipes] = useState<Schema["Recipe"]["type"][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.models.Recipe.observeQuery().subscribe({
      next: (data) => setRecipes([...data.items]),
      complete: () => setLoading(false),
    });
  }, []);

  return (
    <View backgroundColor={tokens.colors.background.primary}>
      <Heading level={3} padding={tokens.space.medium} textAlign="center">
        Recetas Generadas
      </Heading>

      <Collection
        items={recipes}
        type="list"
        direction="column"
        gap="20px"
        wrap="nowrap"
        searchNoResultsFound={
          <Text textAlign="center">
            {loading ? "Cargando..." : "No hay recetas generadas."}
          </Text>
        }
      >
        {(item, index) => <RecipeCard key={index} {...item} />}
      </Collection>
    </View>
  );
};
