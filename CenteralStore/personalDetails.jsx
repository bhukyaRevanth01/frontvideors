import { useContext,createContext,useState} from "react";

 const UserDetailsContext = createContext(null);


 export function UserDetailsProvider({children}) {

    const [userDetails,setUserDetails]=useState([])

     console.log("context checking",userDetails)
    return(
        <UserDetailsContext.Provider value={{userDetails,setUserDetails}}>
            {children}
        </UserDetailsContext.Provider>
    )
 }

 export const detailsUsers = ()=>useContext(UserDetailsContext)


