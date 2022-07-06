import { privateAxiosInstance } from "../Instance/axiosInstance";
import { useEffect } from "react";
import { useSelector } from "react-redux";


const useAxiosPrivate = ()=>{
    const user = useSelector((state)=> state.user.user)

    useEffect(() => {
    
      const requestIntercept = privateAxiosInstance.interceptors.request.use(
          config => {
              if (!config.headers['authorization']) {
                  config.headers['authorization'] = `Bearer ${user?.accessToken}`;
 
              }
              return config;
          }, (error) => Promise.reject(error)
      );

      return () => {
          privateAxiosInstance.interceptors.request.eject(requestIntercept);
       
      }
  }, [user])

    return privateAxiosInstance;
}
export default useAxiosPrivate