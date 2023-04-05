export type Coins = {
  count: Record<string /**name of country */, number>;
};

export type City = {
  x: number;
  y: number;
  coins: Coins;
  draftCoins: Coins;
  country: string;
};

export type Country = {
  name: string;
  xl: number;
  yl: number;
  xh: number;
  yh: number;
  cities: City[];
};
