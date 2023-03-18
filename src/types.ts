export type Coin = {
  motifCountryName: string;
};

export type City = {
  x: number;
  y: number;
  coins: Coin[];
};

export type Country = {
  name: string;
  xl: number;
  yl: number;
  xh: number;
  yh: number;
  cities: City[];
};

export type Input = {
  countries: Omit<Country, 'cities'>[];
}[];
