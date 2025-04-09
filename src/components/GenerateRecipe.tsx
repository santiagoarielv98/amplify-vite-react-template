import {
  Badge,
  Button,
  Card,
  Flex,
  Heading,
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
    <View>
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
              />
            ) : (
              <TextAreaField
                label="Ingredientes"
                placeholder="Ingresa los ingredientes, separados por comas"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                rows={4}
                required
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
                  onClick={() => toggleRestriction(restriction)}
                  style={{
                    cursor: "pointer",
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
                    onClick={() => toggleRestriction(customR)}
                    style={{
                      cursor: "pointer",
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
              />
              <Button onClick={addCustomRestriction} type="button">
                Añadir
              </Button>
            </Flex>

            <Button type="submit" variation="primary" width="100%">
              Generar Receta
            </Button>
          </Flex>
        </form>
      </Card>
      {loading && <p>Cargando...</p>}
    </View>
  );
};
