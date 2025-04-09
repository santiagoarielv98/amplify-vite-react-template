import { env } from "$amplify/env/functionGenerateRecipe";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { Schema } from "../../data/resource";
import { z } from "zod";

const google = createGoogleGenerativeAI({
  apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
});

const recipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  prepTime: z.number(),
  cookTime: z.number(),
  servings: z.number(),
  difficulty: z.enum(["easy", "medium", "hard"]),
  ingredients: z.array(z.string()),
  steps: z.array(z.string()),
  restrictions: z.array(z.string()),
  tags: z.array(z.string()),
});

export const handler: Schema["generateRecipeFunc"]["functionHandler"] = async (
  event,
) => {
  try {
    const { generateType, idea, ingredients, restrictions } = event.arguments;
    console.log("args: ", event.arguments);
    console.log("credentials", env.GOOGLE_GENERATIVE_AI_API_KEY);

    if (generateType === "idea" && !idea) {
      console.log("Missing idea");
      return null;
    }

    if (
      generateType === "ingredients" &&
      (!ingredients || ingredients.length === 0)
    ) {
      console.log("Missing ingredients");
      return null;
    }

    let prompt = "";
    if (generateType === "idea") {
      prompt = `Create a detailed recipe based on this idea: ${idea}.${
        ingredients && ingredients.length > 0
          ? ` Using these ingredients: ${ingredients.join(", ")}.`
          : ""
      }${
        restrictions && restrictions.length > 0
          ? ` Consider these dietary restrictions: ${restrictions.join(", ")}.`
          : ""
      }`;
    } else {
      prompt = `Create a detailed recipe using these ingredients: ${ingredients!.join(", ")}.${
        restrictions && restrictions.length > 0
          ? ` Consider these dietary restrictions: ${restrictions.join(", ")}.`
          : ""
      }`;
    }
    prompt +=
      "The output should be in the same language as the input. Example ingredients: 'chicken, rice, broccoli'. -> english, ingredients: 'pollo, arroz, brócoli'. -> español.";

    console.log("Prompt:", prompt);

    const { object } = await generateObject({
      model: google("gemini-1.5-pro-latest"),
      schema: recipeSchema,
      prompt,
    });
    return object as Schema["generateRecipeFunc"]["returnType"];
  } catch (error) {
    console.error("Error generating recipe:", error);
    return null;
  }
  return null;
};
