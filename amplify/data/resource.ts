import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { functionGenerateRecipe } from "../functions/function-generate-recipe/resource";

const schema = a.schema({
  generateRecipeFunc: a
    .query()
    .arguments({
      generateType: a.enum(["idea", "ingredients"]),
      idea: a.string(),
      ingredients: a.string().array(),
      restrictions: a.string().array(),
    })
    .returns(a.ref("Recipe"))
    .authorization((allow) => [allow.authenticated()])
    .handler(a.handler.function(functionGenerateRecipe)),
  Recipe: a
    .model({
      title: a.string().required(),
      description: a.string(),
      prepTime: a.integer(),
      cookTime: a.integer(),
      servings: a.integer(),
      difficulty: a.enum(["easy", "medium", "hard"]),
      ingredients: a.string().array(),
      restrictions: a.string().array(),
      steps: a.string().array(),
      tags: a.string().array(),
      image: a.string(),
    })
    .authorization((allow) => [allow.authenticated()]),
  // generateImage: a
  //   .generation({
  //     aiModel: a.ai.model("Claude 3 Haiku"),
  //     systemPrompt: `Generate an image of a recipe card with the following details:`,
  //   })
  //   .arguments({
  //     title: a.string(),
  //     description: a.string(),
  //   })
  //   .returns(
  //     a.customType({
  //       imageUrl: a.string(),
  //     }),
  //   )
  //   .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
