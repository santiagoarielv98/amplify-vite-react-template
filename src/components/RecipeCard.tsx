import {
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
  useBreakpointValue,
  useTheme,
  View,
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
  image,
}: RecipeProps) => {
  const { tokens } = useTheme();

  return (
    <View
      backgroundColor={tokens.colors.background.secondary}
      padding={tokens.space.medium}
    >
      <Card>
        <Flex
          direction={{
            base: 'column',
            medium: 'row'
          }}
          alignItems="flex-start"
        >
          {image ? (
            <Image
              alt={title}
              src={image}
              width={{
                base: '100%',
                medium: '33%'
              }}
              height={
                {
                  base: '200px',
                  medium: 'auto'
                }
              }
              objectFit="cover"
            />
          ) : (
            <Flex
              width={{
                base: '100%',
                medium: '33%'
              }}
              height={
                {
                  base: '200px',
                  medium: 'auto'
                }
              }
              backgroundColor={tokens.colors.neutral[20]}
              justifyContent="center"
              alignItems="center"
              direction="column"
              gap={tokens.space.small}
              style={{
                aspectRatio: '1 / 1',
              }}
            >
              <Icon
                ariaLabel="No image"
                viewBox={{ width: 24, height: 24 }}
              >
                <span>image</span>
              </Icon>
              <Text>No Image Available</Text>
              <Button size="small" variation="link">Generate Image</Button>
            </Flex>
          )}

          <Flex
            direction="column"
            alignItems="flex-start"
            gap={tokens.space.xs}
            padding={
              {
                base: tokens.space.small,
                medium: tokens.space.medium
              }
            }
            flex="1"
            width={{
              base: '100%',
              medium: 'auto'
            }}
          >
            <Flex
              width="100%"
              justifyContent="space-between"
              alignItems={{
                base: 'flex-start',
                small: 'center'
              }}
              direction={{
                base: 'column',
                small: 'row'
              }}
              gap={tokens.space.xxs}
            >
              <Heading
                level={5}
                fontSize={{
                  base: tokens.fontSizes.large,
                  medium: tokens.fontSizes.xl
                }}
              >
                {title}
              </Heading>
              {difficulty && (
                <Badge size="small" variation={
                  difficulty === 'easy' ? 'success' :
                    difficulty === 'medium' ? 'warning' : 'error'
                }>
                  {difficulty} difficulty
                </Badge>
              )}
            </Flex>

            <Flex gap={tokens.space.xs} wrap="wrap" marginTop={tokens.space.xxs}>
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
            </Flex>

            <Text
              as="span"
              marginTop={tokens.space.small}
              fontSize={{
                base: tokens.fontSizes.small,
                medium: tokens.fontSizes.medium
              }}
            >
              {description}
            </Text>

            <Flex
              gap={
                {
                  base: tokens.space.xs,
                  small: tokens.space.large
                }
              }
              marginTop={tokens.space.medium}
              width="100%"
              direction={
                {
                  base: 'column',
                  small: 'row'
                }
              }
              wrap="wrap"
            >
              {prepTime && (
                <Flex alignItems="center" gap={tokens.space.xxs}>
                  <Icon
                    ariaLabel="Prep time"
                    viewBox={{ width: 20, height: 20 }}
                  >
                    <span>clock</span>
                  </Icon>
                  <Text as="span">Prep: {prepTime} min</Text>
                </Flex>
              )}

              {cookTime && (
                <Flex alignItems="center" gap={tokens.space.xxs}>
                  <Icon
                    ariaLabel="Cook time"
                    viewBox={{ width: 20, height: 20 }}
                  >
                    <span>timer</span>
                  </Icon>
                  <Text as="span">Cook: {cookTime} min</Text>
                </Flex>
              )}

              {servings && (
                <Flex alignItems="center" gap={tokens.space.xxs}>
                  <Icon
                    ariaLabel="Servings"
                    viewBox={{ width: 20, height: 20 }}
                  >
                    <span>people</span>
                  </Icon>
                  <Text as="span">Serves: {servings}</Text>
                </Flex>
              )}
            </Flex>

            <Button
              variation="primary"
              marginTop={tokens.space.medium}
              isFullWidth={useBreakpointValue({
                base: true,
                small: false
              }) as boolean}
            >
              <Flex alignItems="center" gap={tokens.space.xs}>
                <Icon
                  ariaLabel="View recipe"
                  viewBox={{ width: 20, height: 20 }}
                >
                  <span>book</span>
                </Icon>
                View Recipe
              </Flex>
            </Button>
          </Flex>
        </Flex >
      </Card >
    </View >
  );
};