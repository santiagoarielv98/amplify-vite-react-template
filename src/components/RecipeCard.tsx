import {
  Card,
  Image,
  View,
  Heading,
  Flex,
  Badge,
  Text,
  Button,
  useTheme,
} from '@aws-amplify/ui-react';

export interface RecipeProps {
  title: string;
  description: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  ingredients: string[];
  restrictions: string[];
  tags: string[];
  image?: string;
  steps?: string[];
}

export const RecipeCard = ({
  title,
  description,
  prepTime,
  cookTime,
  servings,
  difficulty,
  ingredients,
  restrictions,
  tags,
  image = "/road-to-milford-new-zealand-800w.jpg", // default image if none provided
}: RecipeProps) => {
  const { tokens } = useTheme();
  return (
    <View
      backgroundColor={tokens.colors.background.secondary}
      padding={tokens.space.medium}
    >
      <Card>
        <Flex direction="row" alignItems="flex-start">
          <Image
            alt={title}
            src={image}
            width="33%"
          />
          <Flex
            direction="column"
            alignItems="flex-start"
            gap={tokens.space.xs}
            padding={tokens.space.medium}
          >
            <Flex gap={tokens.space.xs} wrap="wrap">
              {tags.map((tag, index) => (
                <Badge key={index} size="small" variation="info">
                  {tag}
                </Badge>
              ))}
              {restrictions.map((restriction, index) => (
                <Badge key={index} size="small" variation="warning">
                  {restriction}
                </Badge>
              ))}
              {difficulty && (
                <Badge size="small" variation={
                  difficulty === 'easy' ? 'success' : 
                  difficulty === 'medium' ? 'warning' : 'error'
                }>
                  {difficulty}
                </Badge>
              )}
            </Flex>

            <Heading level={5}>
              {title}
            </Heading>

            <Text as="span">
              {description}
            </Text>
            
            {(prepTime || cookTime || servings) && (
              <Flex gap={tokens.space.medium} marginTop={tokens.space.xs}>
                {prepTime && <Text as="span">Prep: {prepTime} min</Text>}
                {cookTime && <Text as="span">Cook: {cookTime} min</Text>}
                {servings && <Text as="span">Serves: {servings}</Text>}
              </Flex>
            )}

            <Button variation="primary" marginTop={tokens.space.small}>View Recipe</Button>
          </Flex>
        </Flex>
      </Card>
    </View>
  );
};