import { BETS } from "./shared/constants";
import { CompanyBet } from "./shared/interfaces";

export const mockApiCall = (): Promise<CompanyBet[]> => {
  return new Promise((resolve, reject) => {
    const randomNumber = Math.ceil(Math.random() * 10)
    console.log('mock call')

    setTimeout(() => {
      if (randomNumber > 1) {
        reject('There was error during getting bets');
      } else {
        resolve(BETS)
      }
    }, 2000)
  })
}
