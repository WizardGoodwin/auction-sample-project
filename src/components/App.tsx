import React, {useCallback, useEffect, useState} from 'react';

import { CircularProgress } from "@material-ui/core";

import { mockApiCall } from "../api";
import { getWinner } from "../shared/helpers";

const App = () => {
 const [winner, setWinner] = useState<string | null>(null);
 const [isLoading, setIsLoading] = useState<boolean>(false);
 const [error, setError] = useState<string | null>(null);
 const [errorsCount, setErrorsCount] = useState<number>(0);

 const makeApiCall = useCallback(() => {
   setIsLoading(true);
   mockApiCall()
     .then((res) => {
       setWinner(getWinner(res))
     })
     .catch((err: string) => {
       if (errorsCount < 5) {
         setErrorsCount((prevErrorsCount) => prevErrorsCount + 1)
       } else {
         setError(err)
       }
     })
     .finally(() => {
       setIsLoading(false)
     })
 }, [errorsCount])

  useEffect(() => {
    if (errorsCount === 0) {
      makeApiCall();
    } else {
      setTimeout(makeApiCall, 1000)
    }
  }, [errorsCount, makeApiCall])

  return (
    <div>
      {isLoading && <CircularProgress />}
      {winner && <p>Победитель аукциона: {winner}</p>}
      {error && <p>{error}</p>}
      {errorsCount > 0 && <p>{errorsCount}</p>}
    </div>
  );
};

export default App;
