import RootStore from '@shared/store/RootStore';
import { useHistory, useLocation } from 'react-router-dom';

const useQueryStore = (): void => {
    const location = useLocation();
    const history = useHistory();

    RootStore.query.setHistory(history, location);
};

export default useQueryStore;
