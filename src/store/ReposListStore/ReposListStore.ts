import { urls } from '@config/urls';
import { ILocalStore } from '@shared/hooks/useLocalStore';
import RootStore from '@shared/store/RootStore';
import { HTTPMethod } from '@shared/store/RootStore/ApiStore/types';
import {
    GithubRepoItemApi,
    GithubRepoItemModel,
    normalizeGithubRepoItemModel
} from '@store/models/github/githubRepoItem';
import {
    GetOrganizationReposListParams,
    IGitHubStore
} from '@store/models/types';
import {
    CollectionT,
    getInitialCollectionModel,
    linearizeCollection,
    normalizeCollection
} from '@utils/collection';
import { Meta } from '@utils/meta';
import {
    action,
    computed,
    IReactionDisposer,
    makeObservable,
    observable,
    reaction,
    runInAction
} from 'mobx';

type PrivateFields = '_repos' | '_meta';

export default class ReposListStore implements IGitHubStore, ILocalStore {
    private _repos: CollectionT<number, GithubRepoItemModel> =
        getInitialCollectionModel();
    private _meta: Meta = Meta.initial;

    public page = 1;
    public searchName = '';

    constructor() {
        makeObservable<ReposListStore, PrivateFields>(this, {
            _repos: observable.ref,
            _meta: observable,
            repos: computed,
            meta: computed,
            getOrganizationReposList: action,
            nextRepos: action.bound,
            searchRepo: action.bound,
            setInputValue: action.bound,
            page: observable,
            searchName: observable
        });
    }

    get repos(): GithubRepoItemModel[] {
        return linearizeCollection(this._repos);
    }

    get meta(): Meta {
        return this._meta;
    }

    async nextRepos(): Promise<void> {
        await runInAction(async () => {
            this.page += 1;
            await this.getOrganizationReposList({
                organizationName: this.searchName,
                page: this.page
            });
        });
    }

    async searchRepo(): Promise<void> {
        await runInAction(async () => {
            this._repos = getInitialCollectionModel();
            this._meta = Meta.loading;
            this.page = 1;
            await this.getOrganizationReposList({
                organizationName: this.searchName,
                page: this.page
            });
            //RootStore.query.setParam('search', this.searchName);
        });
    }

    setInputValue(value: string): void {
        this.searchName = value;
    }

    async getOrganizationReposList(
        params: GetOrganizationReposListParams
    ): Promise<void> {
        const response = await RootStore.api.request<GithubRepoItemApi[]>({
            method: HTTPMethod.GET,
            data: {
                per_page: 7,
                page: params.page
            },
            headers: {},
            endpoint: urls.api.orgRepos(params.organizationName)
        });

        runInAction(() => {
            if (!response.success) {
                this._meta = Meta.error;
            }
            try {
                const repos: GithubRepoItemModel[] = [];
                for (const item of response.data) {
                    repos.push(normalizeGithubRepoItemModel(item));
                }
                const prev = linearizeCollection(this._repos);
                const all = prev.concat(repos);
                this._meta = Meta.success;
                this._repos = normalizeCollection(
                    all,
                    (RepoItem) => RepoItem.id
                );
                return;
            } catch (e) {
                this._meta = Meta.error;
                this._repos = getInitialCollectionModel();
            }
        });
    }

    // async getReposBranchesList(
    //     params: GetReposBranchesListParams
    // ): Promise<ApiResponse<RepoItem[], any>> {
    //     return await this.apiStore.request({
    //         method: HTTPMethod.GET,
    //         data: {},
    //         headers: {},
    //         endpoint: urls.api.repoBranches(params.ownerName, params.repoName)
    //     });
    // }

    destroy(): void {
        this._repos = getInitialCollectionModel();
        this._meta = Meta.initial;
        this.page = 1;
        this.searchName = '';
        this._qsReaction();
    }

    private readonly _qsReaction: IReactionDisposer = reaction(
        () => RootStore.query.getParam('search'),
        (search) => {
            if (search) {
                // этот участок кода работает странно
                this.getOrganizationReposList({
                    organizationName: search.toString(),
                    page: this.page
                });
            }
        }
    );
}
