import React from 'react';

import GitHubStore from '@store/GitHubStore';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import RepoSearchPage from './pages/RepoSearchPage';

export type GithubContextType = {
    store: GitHubStore;
};

export const StoreContext = React.createContext<GithubContextType | null>(null);
const Provider = StoreContext.Provider;
export const useStoreContext = () => React.useContext(StoreContext);

function App() {
    return (
        <Provider value={{ store: new GitHubStore() }}>
            <BrowserRouter>
                <Switch>
                    <Route path='/repos' component={RepoSearchPage} />
                    <Redirect from='*' to='/repos' />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
