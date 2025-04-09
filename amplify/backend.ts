import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { storage } from "./storage/resource";
// import { functionGenerateRecipe } from "./functions/function-generate-recipe/resource";

defineBackend({
  auth,
  data,
  storage,
  // functionGenerateRecipe,
});
