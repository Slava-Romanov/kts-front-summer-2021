import { urls } from '@config/urls';

import ApiStore from './ApiStore';
import QueryStore from './QueryStore';

export default class RootStore {
    readonly api: ApiStore = new ApiStore(urls.BASE_URL);
    readonly query: QueryStore = new QueryStore();
}
