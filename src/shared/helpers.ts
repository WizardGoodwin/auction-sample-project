import { CompanyBet, CompanyWinRate } from "./interfaces";

export const getWinner = (bets: CompanyBet[]): string => {
  const totalSum: number = bets.reduce((sum, current) => sum + current.sum, 0);

  const winRates: CompanyWinRate[] = bets.map((bet) => {
    return {
      name: bet.name,
      rate: bet.sum / totalSum,
    }
  })

  let winner = '', winnerRate = Math.random();

  for (let i = 0; i < winRates.length; i++) {
    winnerRate -= winRates[i].rate;
    if (winnerRate <= 0) {
      winner = winRates[i].name;
      break;
    }
  }

  return winner;
}
