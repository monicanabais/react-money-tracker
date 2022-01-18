import { useState, useEffect } from "react"
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";


const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const response = await projectAuth.createUserWithEmailAndPassword(email, password);
      if (!response) {
        throw new Error('Couldn\'t complete sign up');
      }
      // add username to the user object
      await response.user.updateProfile({ displayName });

      // dispatch login action
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

  return { error, isPending, signup }
}

export { useSignup };