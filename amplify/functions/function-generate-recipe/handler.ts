import { Schema } from "../../data/resource";

export const handler: Schema["generateRecipeFunc"]["functionHandler"] = async (
  event,
) => {
  const { generateType, idea, ingredients, restrictions } = event.arguments;

  if (generateType === "idea" && !idea) {
    return null;
  }

  if (
    generateType === "ingredients" &&
    (!ingredients || ingredients.length === 0)
  ) {
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
  return null;
};
