import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    // sign out
    try {
      const response = await projectAuth.signInWithEmailAndPassword(email, password);

      // dispatch logout action
      dispatch({ type: 'LOGIN', payload: response.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  }

  // cleanup function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, error, isPending };
}

export { useLogin };