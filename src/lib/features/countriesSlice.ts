import { apiSlice } from "../services/apiSlice";

export const countriesSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCountries: builder.query({
            query: () => '/all',
            providesTags: ['Countries']
        }),
        getCountryDetails: builder.query({
            query: (countryName) => `/name/${countryName}`,
            providesTags: ['CountryDetails']
        }),
    })
})


export const { useGetCountriesQuery, useGetCountryDetailsQuery } = countriesSlice