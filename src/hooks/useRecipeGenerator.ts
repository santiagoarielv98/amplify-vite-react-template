import React from "react";
import { client } from "../client";
import { Recipe } from "../types/api";
import { baseUrl } from "../config/api";

export const useRecipeGenerator = () => {
  const [generationType, setGenerationType] = React.useState<
    "idea" | "ingredients"
  >("idea");
  const [idea, setIdea] = React.useState("");
  const [ingredients, setIngredients] = React.useState("");
  const [restrictions, setRestrictions] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  const generateRecipe = async () => {
    if (loading) return;
    if (["idea", "ingredients"].includes(generationType)) {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}/recipes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            generationType,
            idea,
            ingredients: ingredients
              .split(",")
              .map((i) => i.trim())
              .filter(Boolean),
            restrictions,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = (await response.json()) as Recipe;
        client.models.Recipe.create({
          title: result.title,
          description: result.description,
          ingredients: result.ingredients,
          cookTime: result.cookTime,
          prepTime: result.prepTime,
          difficulty: result.difficulty,
          restrictions: result.restrictions,
          servings: result.servings,
          steps: result.steps,
          tags: result.tags,
        });
        setIdea("");
        setIngredients("");
        setRestrictions([]);
        setGenerationType("idea");
      } catch (error) {
        console.error("Error generating recipe:", error);
      } finally {
        setLoading(false);
      }
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
    generateRecipe,
    isLoading: loading,
  };
};
