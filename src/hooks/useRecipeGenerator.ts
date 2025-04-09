import React from "react";
import { useAIGeneration } from "../client";

export const useRecipeGenerator = () => {
  const [generationType, setGenerationType] = React.useState<
    "idea" | "ingredients"
  >("idea");
  const [idea, setIdea] = React.useState("");
  const [ingredients, setIngredients] = React.useState("");
  const [restrictions, setRestrictions] = React.useState<string[]>([]);

  const [{ data, isLoading }, generateRecipe] =
    useAIGeneration("generateRecipe");

  const handleClick = async () => {
    if (generationType === "idea") {
      generateRecipe({
        generationType,
        idea,
        restrictions,
      });
    } else {
      generateRecipe({
        generationType,
        ingredients,
        restrictions,
      });
    }
  };

  return {
    generationType,
    setGenerationType,
    idea,
    setIdea,
    ingredients,
    setIngredients,
    restrictions,
    setRestrictions,
    generateRecipe: handleClick,
    data,
    isLoading,
  };
};
