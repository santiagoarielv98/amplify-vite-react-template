import { useAuthenticator, Button } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";
import { RecipeList } from "./components/RecipeList";
import { GenerateRecipe } from './components/GenerateRecipe';
import './App.css';

const client = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();

  return (
    <main>
      <h1>Welcome, {user?.signInDetails?.loginId}</h1>
      <GenerateRecipe />
      <RecipeList />
      <div className="sign-out-button">
        <Button onClick={signOut} variation="destructive">Sign out</Button>
      </div>
    </main>
  );
}

export default App;
