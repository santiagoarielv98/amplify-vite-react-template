import {
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  Icon,
  Image,
  Loader,
  Text,
  useBreakpointValue,
  useTheme,
  View,
} from "@aws-amplify/ui-react";
import { Schema } from "../../amplify/data/resource";
import { FiClock, FiBook, FiUsers } from "react-icons/fi";
import { MdOutlineTimer } from "react-icons/md";
import { BsImage } from "react-icons/bs";
import { useImageGenerator } from "../hooks/useImageGenerator";

export const RecipeCard = ({
  id,
  title,
  description,
  prepTime,
  cookTime,
  servings,
  difficulty,
  restrictions,
  tags,
  image,
}: Schema["Recipe"]["type"]) => {
  const { tokens } = useTheme();
  const { error, generateImage, isLoading } = useImageGenerator(id);

  const handleGenerateImage = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event from firing

    try {
      await generateImage({
        title,
        description: description ?? "-",
      });
    } catch (err) {
      console.error("Error generating image:", err);
    }
  };

  return (
    <View padding={tokens.space.medium}>
      <Card onClick={() => console.log("Card clicked", id)}>
        <Flex
          direction={{
            base: "column",
            medium: "row",
          }}
          alignItems="flex-start"
        >
          {image ? (
            <Image
              alt={title}
              src={image}
              width={{
                base: "100%",
                medium: "33%",
              }}
              height={{
                base: "200px",
                medium: "auto",
              }}
              objectFit="cover"
            />
          ) : (
            <Flex
              width={{
                base: "100%",
                medium: "33%",
              }}
              height={{
                base: "200px",
                medium: "auto",
              }}
              backgroundColor={tokens.colors.neutral[20]}
              justifyContent="center"
              alignItems="center"
              direction="column"
              gap={tokens.space.small}
              style={{
                aspectRatio: "1 / 1",
              }}
            >
              {isLoading ? (
                <Loader size="large" />
              ) : (
                <>
                  <Icon
                    ariaLabel="No image"
                    viewBox={{ width: 24, height: 24 }}
                  >
                    <BsImage size={24} />
                  </Icon>
                  <Text>No hay imagen disponible</Text>
                  <Button
                    size="small"
                    variation="link"
                    onClick={handleGenerateImage}
                    isLoading={isLoading}
                    loadingText="Generando..."
                  >
                    Generar Imagen
                  </Button>
                  {error && (
                    <Text
                      color={tokens.colors.red["60"]}
                      fontSize={tokens.fontSizes.small}
                    >
                      Error: {error.message}
                    </Text>
                  )}
                </>
              )}
            </Flex>
          )}

          <Flex
            direction="column"
            alignItems="flex-start"
            gap={tokens.space.xs}
            padding={{
              base: tokens.space.small,
              medium: tokens.space.medium,
            }}
            flex="1"
            width={{
              base: "100%",
              medium: "auto",
            }}
          >
            <Flex
              width="100%"
              justifyContent="space-between"
              alignItems={{
                base: "flex-start",
                small: "center",
              }}
              direction={{
                base: "column",
                small: "row",
              }}
              gap={tokens.space.xxs}
            >
              <Heading
                level={5}
                fontSize={{
                  base: tokens.fontSizes.large,
                  medium: tokens.fontSizes.xl,
                }}
              >
                {title}
              </Heading>
              {difficulty && (
                <Badge
                  size="small"
                  variation={
                    difficulty === "easy"
                      ? "success"
                      : difficulty === "medium"
                        ? "warning"
                        : "error"
                  }
                >
                  dificultad{" "}
                  {difficulty === "easy"
                    ? "fácil"
                    : difficulty === "medium"
                      ? "media"
                      : "difícil"}
                </Badge>
              )}
            </Flex>

            <Flex
              gap={tokens.space.xs}
              wrap="wrap"
              marginTop={tokens.space.xxs}
            >
              {tags?.map((tag, index) => (
                <Badge key={index} size="small" variation="info">
                  {tag}
                </Badge>
              ))}
              {restrictions?.map((restriction, index) => (
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
                medium: tokens.fontSizes.medium,
              }}
            >
              {description}
            </Text>

            <Flex
              gap={{
                base: tokens.space.xs,
                small: tokens.space.large,
              }}
              marginTop={tokens.space.medium}
              width="100%"
              direction={{
                base: "column",
                small: "row",
              }}
              wrap="wrap"
            >
              {prepTime && (
                <Flex alignItems="center" gap={tokens.space.xxs}>
                  <Icon
                    ariaLabel="Prep time"
                    viewBox={{ width: 20, height: 20 }}
                  >
                    <FiClock size={20} />
                  </Icon>
                  <Text as="span">Preparación: {prepTime} min</Text>
                </Flex>
              )}

              {cookTime && (
                <Flex alignItems="center" gap={tokens.space.xxs}>
                  <Icon
                    ariaLabel="Cook time"
                    viewBox={{ width: 20, height: 20 }}
                  >
                    <MdOutlineTimer size={20} />
                  </Icon>
                  <Text as="span">Cocción: {cookTime} min</Text>
                </Flex>
              )}

              {servings && (
                <Flex alignItems="center" gap={tokens.space.xxs}>
                  <Icon
                    ariaLabel="Servings"
                    viewBox={{ width: 20, height: 20 }}
                  >
                    <FiUsers size={20} />
                  </Icon>
                  <Text as="span">Porciones: {servings}</Text>
                </Flex>
              )}
            </Flex>

            <Button
              variation="primary"
              marginTop={tokens.space.medium}
              isFullWidth={
                useBreakpointValue({
                  base: true,
                  small: false,
                }) as boolean
              }
            >
              <Flex alignItems="center" gap={tokens.space.xs}>
                <Icon
                  ariaLabel="View recipe"
                  viewBox={{ width: 20, height: 20 }}
                >
                  <FiBook size={20} />
                </Icon>
                Ver Receta
              </Flex>
            </Button>
          </Flex>
        </Flex>
      </Card>
    </View>
  );
};
