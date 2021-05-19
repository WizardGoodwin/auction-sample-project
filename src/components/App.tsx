import React, { FC, useCallback, useEffect, useState } from 'react';

import { Button, CircularProgress, Grid, makeStyles, Typography } from "@material-ui/core";

import { mockApiCall } from "../shared/api";
import { getWinner } from "../shared/helpers";

const useStyles = makeStyles({
  loaderContainer: {
    textAlign: 'center'
  },
  loaderIcon: {
    marginTop: 20,
    marginBottom: 20
  },
  refreshBtn: {
    marginTop: 20,
  }
});

const App:FC = () => {

 const classes = useStyles();
 const [winner, setWinner] = useState<string | null>(null);
 const [isLoading, setIsLoading] = useState<boolean>(false);
 const [error, setError] = useState<string | null>(null);
 const [errorsCount, setErrorsCount] = useState<number>(0);

 // METHODS

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
  }, [errorsCount]);

  const refresh = () => {
    setWinner(null);
    setError(null);
    setErrorsCount(0);
  }


  // HOOKS

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

  // RENDER

  return (
    <Grid container
          direction="column"
          justify="center"
          alignItems="center"
    >
      {isLoading && (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.loaderContainer}
        >
          <Typography>Получаем данные с сервера...</Typography>
          <CircularProgress className={classes.loaderIcon}/>
          <Typography>{`Количество оставшихся попыток: ${errorsCount}/5`}</Typography>
        </Grid>
      )}
      {winner && <Typography>Победитель аукциона: {winner}</Typography>}
      {error && <Typography>{error}</Typography>}
      {(winner || error) && (
        <Button
          variant="contained"
          color="primary"
          className={classes.refreshBtn}
          onClick={refresh}
        >
          Повторить
        </Button>
      )}
    </Grid>
  );
};

export default App;
