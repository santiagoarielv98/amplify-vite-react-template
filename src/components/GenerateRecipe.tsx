import {
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  Loader,
  Radio,
  RadioGroupField,
  TextAreaField,
  TextField,
  View,
  useTheme,
} from "@aws-amplify/ui-react";
import React, { useState } from "react";
import { useRecipeGenerator } from "../hooks/useRecipeGenerator";

const predefinedRestrictions = [
  "Sin Gluten",
  "Vegetariano",
  "Vegano",
  "Sin Lácteos",
  "Sin Frutos Secos",
  "Bajo en Carbohidratos",
];

export const GenerateRecipe = () => {
  const { tokens } = useTheme();
  const {
    isLoading: loading,
    generationType,
    setGenerationType,
    idea,
    setIdea,
    ingredients,
    setIngredients,
    restrictions,
    setRestrictions,
    generateRecipe,
  } = useRecipeGenerator();
  const [customRestriction, setCustomRestriction] = useState("");

  const toggleRestriction = (restriction: string) => {
    if (restrictions.includes(restriction)) {
      setRestrictions(restrictions.filter((r) => r !== restriction));
    } else {
      setRestrictions([...restrictions, restriction]);
    }
  };

  const addCustomRestriction = () => {
    if (
      customRestriction.trim() !== "" &&
      !restrictions.includes(customRestriction.trim())
    ) {
      setRestrictions([...restrictions, customRestriction.trim()]);
      setCustomRestriction("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustomRestriction();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateRecipe();
  };

  return (
    <View position="relative">
      <Card variation="elevated">
        <Heading level={3} padding={tokens.space.medium} textAlign="center">
          Generar una Receta
        </Heading>

        <form onSubmit={handleSubmit}>
          <Flex
            direction="column"
            gap={tokens.space.medium}
            padding={tokens.space.medium}
          >
            <RadioGroupField
              legend="Método de Generación"
              name="generationType"
              value={generationType}
              onChange={(e) =>
                setGenerationType(e.target.value as "idea" | "ingredients")
              }
              isDisabled={loading}
            >
              <Radio value="idea">Por Idea</Radio>
              <Radio value="ingredients">Por Ingredientes</Radio>
            </RadioGroupField>

            {generationType === "idea" ? (
              <TextField
                label="Idea de Receta"
                placeholder="Ej. Una cena ligera de verano"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                required
                isDisabled={loading}
              />
            ) : (
              <TextAreaField
                label="Ingredientes"
                placeholder="Ingresa los ingredientes, separados por comas"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                rows={4}
                required
                isDisabled={loading}
              />
            )}

            <Heading level={5}>Restricciones Dietéticas</Heading>
            <Flex direction="row" wrap="wrap" gap={tokens.space.small}>
              {predefinedRestrictions.map((restriction) => (
                <Badge
                  key={restriction}
                  variation={
                    restrictions.includes(restriction) ? "success" : "warning"
                  }
                  onClick={() => !loading && toggleRestriction(restriction)}
                  style={{
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: restrictions.includes(restriction) ? 1 : 0.7,
                    padding: "8px 12px",
                  }}
                >
                  {restriction}
                </Badge>
              ))}

              {restrictions
                .filter((r) => !predefinedRestrictions.includes(r))
                .map((customR) => (
                  <Badge
                    key={customR}
                    variation="success"
                    onClick={() => !loading && toggleRestriction(customR)}
                    style={{
                      cursor: loading ? "not-allowed" : "pointer",
                      padding: "8px 12px",
                    }}
                  >
                    {customR}
                    <span
                      style={{
                        marginLeft: "8px",
                        fontWeight: "bold",
                      }}
                    >
                      ×
                    </span>
                  </Badge>
                ))}
            </Flex>

            <Flex
              direction="row"
              alignItems="flex-end"
              gap={tokens.space.small}
            >
              <TextField
                label="Añadir Restricción Personalizada"
                placeholder="Ej. Bajo en sodio"
                value={customRestriction}
                onChange={(e) => setCustomRestriction(e.target.value)}
                onKeyPress={handleKeyPress}
                flex="1"
                isDisabled={loading}
              />
              <Button
                onClick={addCustomRestriction}
                type="button"
                isDisabled={loading}
              >
                Añadir
              </Button>
            </Flex>

            <Button
              type="submit"
              variation="primary"
              width="100%"
              isLoading={loading}
              loadingText="Generando receta..."
              isDisabled={loading}
            >
              Generar Receta
            </Button>
          </Flex>
        </form>
      </Card>

      {loading && (
        <Flex
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          justifyContent="center"
          alignItems="center"
          backgroundColor="rgba(255, 255, 255, 0.7)"
          style={{ backdropFilter: "blur(2px)" }}
        >
          <Flex direction="column" alignItems="center" gap={tokens.space.small}>
            <Loader size="large" />
            <Heading level={6}>Generando Receta...</Heading>
          </Flex>
        </Flex>
      )}
    </View>
  );
};
