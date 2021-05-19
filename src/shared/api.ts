import  {BETS, WIN_PROBABILITY } from "./constants";
import { CompanyBet } from "./interfaces";

export const mockApiCall = (): Promise<CompanyBet[]> => {
  return new Promise((resolve, reject) => {
    const randomNumber = Math.ceil(Math.random() * 10)
    console.log('mock call')

    setTimeout(() => {
      if (randomNumber > WIN_PROBABILITY) {
        resolve(BETS);
      } else {
        reject('Не возможно получить данные с сервера, попробуйте еще раз');
      }
    }, 2000)
  })
}
