import { City, Country, State } from "country-state-city"

const toOption = (item) => ({
    label: item.name,
    value: item.isoCode,
})

export const getCountryOptions = () =>
    Country.getAllCountries().map(toOption)

export const getStateOptions = (country_code) => {
    if (!country_code) return []
    return State.getStatesOfCountry(country_code).map(toOption)
}

export const getCityOptions = (country_code, state_code) => {
    if (!country_code) return []

    const cities = state_code
        ? City.getCitiesOfState(country_code, state_code)
        : City.getCitiesOfCountry(country_code)

    return (cities ?? []).map((city) => ({
        label: city.name,
        value: city.name,
    }))
}

export const getCountryName = (country_code) =>
    Country.getCountryByCode(country_code)?.name ?? ""

export const getStateName = (country_code, state_code) =>
    State.getStateByCodeAndCountry(state_code, country_code)?.name ?? ""
