import { Context, useContext } from 'react';

import BranchListStore from '@store/BranchListStore';
import ReposListStore from '@store/ReposListStore';

import { GithubContextType } from '../../App';

const useBranchesContext = (
    context: Context<GithubContextType | null>
): BranchListStore | undefined => {
    const storeContext = useContext(context);
    return storeContext?.branchList;
};

export default useBranchesContext;
