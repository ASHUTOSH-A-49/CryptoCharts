import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  'x-rapidapi-key': 'f6c82afdf7msh259bac945ec0741p155f1bjsn272c9f2e5f91',
  'x-rapidapi-host': 'news-api14.p.rapidapi.com',
};

const baseUrl = 'https://news-api14.p.rapidapi.com/v2';


const createRequest = (url) => ({
  url,
  headers: cryptoNewsHeaders,
});

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory = 'crypto', count = 10 }) =>
        createRequest(`/search/articles?query=${newsCategory}&language=en`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
