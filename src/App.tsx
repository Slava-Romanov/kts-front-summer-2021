import React from 'react';

import useQueryStore from '@shared/hooks/useQueryStore';
import BranchListStore from '@store/BranchListStore';
import ReposListStore from '@store/ReposListStore';
import { useLocalObservable } from 'mobx-react-lite';
import { Route, Switch, Redirect } from 'react-router-dom';

import RepoSearchPage from './pages/RepoSearchPage';

export type GithubContextType = {
    repoList: ReposListStore;
    branchList: BranchListStore;
};

export const StoreContext = React.createContext<GithubContextType | null>(null);
const Provider = StoreContext.Provider;
//export const useStoreContext = () => React.useContext(StoreContext);

function App() {
    useQueryStore();
    const repoList = useLocalObservable(() => new ReposListStore());
    const branchList = useLocalObservable(() => new BranchListStore());
    return (
        <Provider
            value={{
                repoList,
                branchList
            }}
        >
            <Switch>
                <Route path='/repos' component={RepoSearchPage} />
                <Redirect from='*' to='/repos' />
            </Switch>
        </Provider>
    );
}

export default App;
