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
  "Gluten-Free",
  "Vegetarian",
  "Vegan",
  "Dairy-Free",
  "Nut-Free",
  "Low-Carb",
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
          Generate a Recipe
        </Heading>

        <form onSubmit={handleSubmit}>
          <Flex
            direction="column"
            gap={tokens.space.medium}
            padding={tokens.space.medium}
          >
            <RadioGroupField
              legend="Generation Method"
              name="generationType"
              value={generationType}
              onChange={(e) =>
                setGenerationType(e.target.value as "idea" | "ingredients")
              }
            >
              <Radio value="idea">By Idea</Radio>
              <Radio value="ingredients">By Ingredients</Radio>
            </RadioGroupField>

            {generationType === "idea" ? (
              <TextField
                label="Recipe Idea"
                placeholder="E.g. A light summer dinner"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                required
              />
            ) : (
              <TextAreaField
                label="Ingredients"
                placeholder="Enter ingredients, one per line"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                rows={4}
                required
              />
            )}

            <Heading level={5}>Dietary Restrictions</Heading>
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
                label="Add Custom Restriction"
                placeholder="E.g. Low-sodium"
                value={customRestriction}
                onChange={(e) => setCustomRestriction(e.target.value)}
                onKeyPress={handleKeyPress}
                flex="1"
              />
              <Button onClick={addCustomRestriction} type="button">
                Add
              </Button>
            </Flex>

            <Button type="submit" variation="primary" width="100%">
              Generate Recipe
            </Button>
          </Flex>
        </form>
      </Card>
      {loading && <p>Loading...</p>}
    </View>
  );
};
