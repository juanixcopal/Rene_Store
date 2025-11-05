import { useEffect, useState } from 'react'
import { getProductsDetails } from '../../data/product-details/get.js'
import ExecutionPermit from '../../helpers/execution-permit-helper.js'

export const useFetchProductDetails = ({ idProduct }) => {
  const [productDetails, setProductDetails] = useState([])
  const [loadingProductDetails, setLoadingProductDetails] = useState(false)

  const _getProductDetails = async () => {
    try {
      if (idProduct) {
        await getProductsDetails({ idProduct })
          .then(({ data }) => {
            setProductDetails(data)
            setLoadingProductDetails(true)
          })
          .catch(({ response }) => {
            ExecutionPermit({ response })
            setLoadingProductDetails(false)
          })
      }
    } catch (error) {
      setLoadingProductDetails(false)
      console.log('Error en _getProductDetails', error)
    }
  }

  useEffect(() => {
    setLoadingProductDetails(false)
    _getProductDetails()
    // eslint-disable-next-line
  }, [idProduct])

  return { productDetails, loadingProductDetails }
}
