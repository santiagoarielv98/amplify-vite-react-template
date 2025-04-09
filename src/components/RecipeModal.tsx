import {
  Badge,
  Button,
  Card,
  Divider,
  Flex,
  Grid,
  Heading,
  Icon,
  ScrollView,
  Text,
  useTheme,
  View,
} from "@aws-amplify/ui-react";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FiClock, FiX, FiUsers } from "react-icons/fi";
import { MdOutlineTimer } from "react-icons/md";
import { Schema } from "../../amplify/data/resource";

interface RecipeModalProps {
  recipe: Schema["Recipe"]["type"] | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeModal = ({ recipe, isOpen, onClose }: RecipeModalProps) => {
  const { tokens } = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; // Restore scrolling
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen || !recipe) return null;

  const modalContent = (
    <View
      className="modal-overlay"
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: tokens.space.medium.value,
      }}
    >
      <Card
        ref={modalRef}
        variation="elevated"
        width="100%"
        maxWidth="900px"
        maxHeight="90vh"
        padding="0"
        backgroundColor={tokens.colors.background.primary}
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Button
          onClick={onClose}
          variation="link"
          style={{
            position: "absolute",
            top: tokens.space.small.value,
            right: tokens.space.small.value,
            zIndex: 10,
          }}
        >
          <Icon ariaLabel="Close" viewBox={{ width: 24, height: 24 }}>
            <FiX size={24} />
          </Icon>
        </Button>

        <ScrollView height="90vh">
          <View padding={tokens.space.large}>
            <Flex direction="column" gap={tokens.space.medium}>
              <Flex direction="column" gap={tokens.space.small}>
                <Heading level={2}>{recipe.title}</Heading>
                <Text fontSize={tokens.fontSizes.large}>
                  {recipe.description}
                </Text>

                <Flex
                  gap={tokens.space.xs}
                  wrap="wrap"
                  marginTop={tokens.space.xxs}
                >
                  {recipe.tags?.map((tag, index) => (
                    <Badge key={index} size="small" variation="info">
                      {tag}
                    </Badge>
                  ))}
                  {recipe.restrictions?.map((restriction, index) => (
                    <Badge key={index} size="small" variation="warning">
                      {restriction}
                    </Badge>
                  ))}
                  {recipe.difficulty && (
                    <Badge
                      size="small"
                      variation={
                        recipe.difficulty === "easy"
                          ? "success"
                          : recipe.difficulty === "medium"
                            ? "warning"
                            : "error"
                      }
                    >
                      dificultad{" "}
                      {recipe.difficulty === "easy"
                        ? "fácil"
                        : recipe.difficulty === "medium"
                          ? "media"
                          : "difícil"}
                    </Badge>
                  )}
                </Flex>
              </Flex>

              <Grid
                templateColumns={{
                  base: "1fr",
                  medium: "1fr 2fr",
                }}
                gap={tokens.space.large}
              >
                <Flex direction="column" gap={tokens.space.medium}>
                  {recipe.image ? (
                    <StorageImage
                      alt={recipe.title}
                      path={({ identityId }) =>
                        `images/${identityId}/${recipe.title}.png`
                      }
                      width="100%"
                      objectFit="cover"
                      aspectRatio={"1 / 1"}
                    />
                  ) : (
                    <View
                      backgroundColor={tokens.colors.neutral[20]}
                      width="100%"
                      style={{ aspectRatio: "1 / 1" }}
                      display="flex"
                    >
                      <Text>No hay imagen disponible</Text>
                    </View>
                  )}

                  <Card variation="outlined">
                    <Flex direction="column" gap={tokens.space.medium}>
                      <Heading level={5}>Información</Heading>
                      <Flex direction="column" gap={tokens.space.small}>
                        {recipe.prepTime && (
                          <Flex alignItems="center" gap={tokens.space.small}>
                            <Icon
                              ariaLabel="Prep time"
                              viewBox={{ width: 20, height: 20 }}
                            >
                              <FiClock size={20} />
                            </Icon>
                            <Text>
                              Tiempo de preparación: {recipe.prepTime} minutos
                            </Text>
                          </Flex>
                        )}
                        {recipe.cookTime && (
                          <Flex alignItems="center" gap={tokens.space.small}>
                            <Icon
                              ariaLabel="Cook time"
                              viewBox={{ width: 20, height: 20 }}
                            >
                              <MdOutlineTimer size={20} />
                            </Icon>
                            <Text>
                              Tiempo de cocción: {recipe.cookTime} minutos
                            </Text>
                          </Flex>
                        )}
                        {recipe.servings && (
                          <Flex alignItems="center" gap={tokens.space.small}>
                            <Icon
                              ariaLabel="Servings"
                              viewBox={{ width: 20, height: 20 }}
                            >
                              <FiUsers size={20} />
                            </Icon>
                            <Text>Porciones: {recipe.servings}</Text>
                          </Flex>
                        )}
                      </Flex>
                    </Flex>
                  </Card>
                </Flex>

                <Flex direction="column" gap={tokens.space.large}>
                  <View>
                    <Heading level={4}>Ingredientes</Heading>
                    <Divider
                      marginTop={tokens.space.xxs}
                      marginBottom={tokens.space.small}
                    />
                    <Flex direction="column" gap={tokens.space.xs}>
                      {recipe.ingredients?.map((ingredient, index) => (
                        <Text key={index}>• {ingredient}</Text>
                      ))}
                    </Flex>
                  </View>

                  <View>
                    <Heading level={4}>Preparación</Heading>
                    <Divider
                      marginTop={tokens.space.xxs}
                      marginBottom={tokens.space.small}
                    />
                    <Flex direction="column" gap={tokens.space.medium}>
                      {recipe.steps?.map((step, index) => (
                        <Flex
                          key={index}
                          gap={tokens.space.small}
                          alignItems="flex-start"
                        >
                          <Text
                            fontWeight={tokens.fontWeights.bold.value}
                            color={tokens.colors.neutral[60].value}
                          >
                            {index + 1}.
                          </Text>
                          <Text>{step}</Text>
                        </Flex>
                      ))}
                    </Flex>
                  </View>
                </Flex>
              </Grid>
            </Flex>
          </View>
        </ScrollView>
      </Card>
    </View>
  );

  return createPortal(modalContent, document.body);
};
