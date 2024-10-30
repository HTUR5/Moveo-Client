
import { createContext, useContext } from 'react'

export const UserContext = createContext({})
const useUser = () => useContext(UserContext)

export default useUser;