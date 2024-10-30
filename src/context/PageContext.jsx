
import { createContext, useContext } from 'react'

export const PageContext = createContext({})
const usePage = () => useContext(PageContext)

export default usePage;