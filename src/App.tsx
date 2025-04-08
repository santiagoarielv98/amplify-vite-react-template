import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";
import { RecipeList } from "./components/RecipeList";
const client = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();

  // useEffect(() => {
  //   client.models.Todo.observeQuery().subscribe({
  //     next: (data) => setTodos([...data.items]),
  //   });
  // }, []);

  return (
    <main>
      <h1>{user?.signInDetails?.loginId}</h1>
      <RecipeList />
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
