import React, { FC, useCallback, useEffect, useState } from 'react';

import { Button, CircularProgress, Grid, Typography } from "@material-ui/core";

import { mockApiCall } from "../shared/api";
import { getWinner } from "../shared/helpers";

const App:FC = () => {

 const [winner, setWinner] = useState<string | null>(null);
 const [isLoading, setIsLoading] = useState<boolean>(false);
 const [error, setError] = useState<string | null>(null);
 const [errorsCount, setErrorsCount] = useState<number>(0);

 const makeApiCall = useCallback(() => {
   mockApiCall()
     .then((res) => {
       setWinner(getWinner(res))
       setIsLoading(false);
     })
     .catch((err: string) => {
       if (errorsCount < 5) {
         setErrorsCount((prevErrorsCount) => prevErrorsCount + 1)
       } else {
         setError(err)
         setIsLoading(false);
       }
     })
  }, [errorsCount])

  useEffect(() => {
    setIsLoading(true);
    let timerId: ReturnType<typeof setTimeout>;

    if (errorsCount === 0) {
      makeApiCall();
    } else {
      timerId = setTimeout(makeApiCall, 1000)
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    }
  }, [errorsCount, makeApiCall])

  return (
    <Grid container
          direction="column"
          justify="center"
          alignItems="center"
    >
      {isLoading && (
        <Grid direction="column"
              justify="center"
              alignItems="center"
              style={{ textAlign: 'center'}}
        >
          <Typography>Получаем данные с сервера...</Typography>
          <CircularProgress style={{ marginTop: 20, marginBottom: 20 }} />
          <Typography>{`Количество оставшихся попыток: ${errorsCount}/5`}</Typography>
        </Grid>
      )}
      {winner && <Typography>Победитель аукциона: {winner}</Typography>}
      {error && <Typography>{error}</Typography>}
      <Button>Повторить</Button>
    </Grid>
  );
};

export default App;
