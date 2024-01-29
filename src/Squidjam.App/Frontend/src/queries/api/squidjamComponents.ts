/**
 * Generated by @openapi-codegen
 *
 * @version 1.0
 */
import * as reactQuery from '@tanstack/react-query';
import { useSquidjamContext, SquidjamContext } from './squidjamContext';
import type * as Fetcher from './squidjamFetcher';
import { squidjamFetch } from './squidjamFetcher';
import type * as Schemas from './squidjamSchemas';

export type ListGamesError = Fetcher.ErrorWrapper<undefined>;

export type ListGamesResponse = {
    [key: string]: Schemas.Game;
};

export type ListGamesVariables = SquidjamContext['fetcherOptions'];

export const fetchListGames = (variables: ListGamesVariables, signal?: AbortSignal) =>
    squidjamFetch<ListGamesResponse, ListGamesError, undefined, {}, {}, {}>({
        url: '/api/games',
        method: 'get',
        ...variables,
        signal,
    });

export const useListGames = <TData = ListGamesResponse>(
    variables: ListGamesVariables,
    options?: Omit<
        reactQuery.UseQueryOptions<ListGamesResponse, ListGamesError, TData>,
        'queryKey' | 'queryFn' | 'initialData'
    >,
) => {
    const { fetcherOptions, queryOptions, queryKeyFn } = useSquidjamContext(options);
    return reactQuery.useQuery<ListGamesResponse, ListGamesError, TData>({
        queryKey: queryKeyFn({ path: '/api/games', operationId: 'listGames', variables }),
        queryFn: ({ signal }) => fetchListGames({ ...fetcherOptions, ...variables }, signal),
        ...options,
        ...queryOptions,
    });
};

export type CreateGameError = Fetcher.ErrorWrapper<undefined>;

export type CreateGameVariables = SquidjamContext['fetcherOptions'];

export const fetchCreateGame = (variables: CreateGameVariables, signal?: AbortSignal) =>
    squidjamFetch<Schemas.Game, CreateGameError, undefined, {}, {}, {}>({
        url: '/api/games',
        method: 'post',
        ...variables,
        signal,
    });

export const useCreateGame = (
    options?: Omit<reactQuery.UseMutationOptions<Schemas.Game, CreateGameError, CreateGameVariables>, 'mutationFn'>,
) => {
    const { fetcherOptions } = useSquidjamContext();
    return reactQuery.useMutation<Schemas.Game, CreateGameError, CreateGameVariables>({
        mutationFn: (variables: CreateGameVariables) => fetchCreateGame({ ...fetcherOptions, ...variables }),
        ...options,
    });
};

export type GetGamePathParams = {
    /**
     * @format uuid
     */
    gameId: string;
};

export type GetGameError = Fetcher.ErrorWrapper<{
    status: 404;
    payload: string;
}>;

export type GetGameVariables = {
    pathParams: GetGamePathParams;
} & SquidjamContext['fetcherOptions'];

export const fetchGetGame = (variables: GetGameVariables, signal?: AbortSignal) =>
    squidjamFetch<Schemas.Game, GetGameError, undefined, {}, {}, GetGamePathParams>({
        url: '/api/games/{gameId}',
        method: 'get',
        ...variables,
        signal,
    });

export const useGetGame = <TData = Schemas.Game>(
    variables: GetGameVariables,
    options?: Omit<
        reactQuery.UseQueryOptions<Schemas.Game, GetGameError, TData>,
        'queryKey' | 'queryFn' | 'initialData'
    >,
) => {
    const { fetcherOptions, queryOptions, queryKeyFn } = useSquidjamContext(options);
    return reactQuery.useQuery<Schemas.Game, GetGameError, TData>({
        queryKey: queryKeyFn({ path: '/api/games/{gameId}', operationId: 'getGame', variables }),
        queryFn: ({ signal }) => fetchGetGame({ ...fetcherOptions, ...variables }, signal),
        ...options,
        ...queryOptions,
    });
};

export type PerformActionPathParams = {
    /**
     * @format uuid
     */
    gameId: string;
};

export type PerformActionError = Fetcher.ErrorWrapper<
    | {
          status: 400;
          payload: string;
      }
    | {
          status: 404;
          payload: string;
      }
>;

export type PerformActionVariables = {
    body?:
        | Schemas.EndTurn
        | Schemas.AddPlayer
        | Schemas.RemovePlayer
        | Schemas.Ready
        | Schemas.SelectClass
        | Schemas.Attack;
    pathParams: PerformActionPathParams;
} & SquidjamContext['fetcherOptions'];

export const fetchPerformAction = (variables: PerformActionVariables, signal?: AbortSignal) =>
    squidjamFetch<
        Schemas.Game,
        PerformActionError,
        | Schemas.EndTurn
        | Schemas.AddPlayer
        | Schemas.RemovePlayer
        | Schemas.Ready
        | Schemas.SelectClass
        | Schemas.Attack,
        {},
        {},
        PerformActionPathParams
    >({ url: '/api/games/{gameId}/action', method: 'post', ...variables, signal });

export const usePerformAction = (
    options?: Omit<
        reactQuery.UseMutationOptions<Schemas.Game, PerformActionError, PerformActionVariables>,
        'mutationFn'
    >,
) => {
    const { fetcherOptions } = useSquidjamContext();
    return reactQuery.useMutation<Schemas.Game, PerformActionError, PerformActionVariables>({
        mutationFn: (variables: PerformActionVariables) => fetchPerformAction({ ...fetcherOptions, ...variables }),
        ...options,
    });
};

export type QueryOperation =
    | {
          path: '/api/games';
          operationId: 'listGames';
          variables: ListGamesVariables;
      }
    | {
          path: '/api/games/{gameId}';
          operationId: 'getGame';
          variables: GetGameVariables;
      };
