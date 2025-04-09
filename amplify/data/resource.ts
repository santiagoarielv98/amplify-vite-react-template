import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
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
  generateRecipe: a
    .generation({
      aiModel: a.ai.model("Claude 3 Haiku"),
      systemPrompt: `
        Generate a recipe based on the following details:
        - Generation Type: {generationType}
        - Idea: {idea}
        - Ingredients: {ingredients}
        - Restrictions: {restrictions}
        - Format the response as JSON`,
    })
    .arguments({
      generationType: a.enum(["idea", "ingredients"]),
      idea: a.string(),
      ingredients: a.string(),
      restrictions: a.string().array(),
    })
    .returns(
      a.customType({
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
      }),
    )
    .authorization((allow) => [allow.authenticated()]),
  generateImage: a
    .generation({
      aiModel: a.ai.model("Claude 3 Haiku"),
      systemPrompt: `Generate an image of a recipe card with the following details:`,
    })
    .arguments({
      title: a.string(),
      description: a.string(),
    })
    .returns(
      a.customType({
        imageUrl: a.string(),
      }),
    )
    .authorization((allow) => [allow.authenticated()]),
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
