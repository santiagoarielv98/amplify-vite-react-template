import { Flex, useTheme, View } from '@aws-amplify/ui-react';
import { GenerateRecipe } from './components/GenerateRecipe';
import { RecipeList } from "./components/RecipeList";

function App() {
  const { tokens } = useTheme();

  return (
    <View
      padding={{
        base: tokens.space.medium,
        large: tokens.space.xl
      }}
    >
      <Flex
        direction="column"
        maxWidth="1200px"
        margin="0 auto"
        gap={tokens.space.xl}
      >
        <GenerateRecipe />
        <RecipeList />
      </Flex>
    </View>
  );
}

export default App;
