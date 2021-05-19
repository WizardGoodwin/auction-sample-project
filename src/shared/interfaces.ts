interface Company {
  name: string;
}

export interface CompanyBet extends Company {
  sum: number;
}

export interface CompanyWinRate extends Company {
  rate: number;
}
