import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Recipe: a.model({
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