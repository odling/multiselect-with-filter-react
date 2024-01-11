import { Character, PaginatedResponse } from "../../types/externalTypes.";
import { api } from "./api";

export const charactersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCharacters: builder.query<
      PaginatedResponse<Character[]>,
      { name: string; page: number }
    >({
      query: ({ name, page }) => ({
        url: `https://rickandmortyapi.com/api/character?page=${page}&name=${name}`,
        method: "GET",
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        return queryArgs.name;
      },
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      providesTags: (_results, _err, { name }) => [
        { type: "Characters", name },
      ],
    }),
  }),
});

export const { useGetCharactersQuery } = charactersApi;
