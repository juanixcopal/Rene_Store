import { useFetch5ManProducts, useFetch5WomenProducts } from './fetch-data.js'

export const useFetchInitHome = () => {
    const fetch5ManProducts = useFetch5ManProducts()
    const fetch5WomenProducts = useFetch5WomenProducts()

    return {
        fetch5ManProducts,
        fetch5WomenProducts
    }
}