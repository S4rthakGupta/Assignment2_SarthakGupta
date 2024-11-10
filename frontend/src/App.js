// Importing content that is to be used in the application.
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Importing the EmployeeDirectory Parent component.
import EmployeeDirectory from './components/EmployeeDirectory';
 
// Setting up the Apollo Client to connect to the GraphQL server.
const client = new ApolloClient({
  // URL of the GraphQL server.
  uri: 'http://localhost:3001/graphql',

  // Cache to store GraphQL data locally.
  cache: new InMemoryCache(),
});
 
// Main App component.
function App() {
  return (    
    // ApolloProvider makes the client available to all child components
    <ApolloProvider client={client}>
      <div className="App">
        <EmployeeDirectory />
      </div>
    </ApolloProvider>
  );
}
 
// Exporting the App component to use in other files.
export default App;