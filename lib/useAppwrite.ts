import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { AppwriteException } from "react-native-appwrite/src";

export const useAppwrite = (fn: () => void) => {
  const [data, setData] = useState<any>([]);

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fn();
      setData(data);
    } catch (error: any) {
      if(error instanceof AppwriteException){
        Alert.alert('Error', error.message);
      }else{
        Alert.alert('Error', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
}