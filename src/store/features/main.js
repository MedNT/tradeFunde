import { createSlice } from "@reduxjs/toolkit";
import { getNextDayTimeStamp } from "../../helpers";

const initial = {
  // last fund date is 7 days after today
  lastFundDate: getNextDayTimeStamp(7),
  // total balance
  balance: 10000,
  // history of trades: we don't delete from this table, 
  // instead we'll have a clear history button that makes it empty.
  trades: [],
  // owned coins
  coins: [],
  // news bookmarks
  newsBookmarks: [],
  // crypto bookmarks
  cryptoBookmarks: [],
};

export const appSlice = createSlice({
  name: "main",
  initialState: initial,
  reducers: {
    // balance reducers
    augmentBalance: (state, action) => {
      state.balance += Number(action.payload);
    },
    reduceBalance: (state, action) => {
      state.balance -= Number(action.payload);
    },
    // trade history reducers
    addTrade: (state, action) => {
      state.trades.unshift(action.payload);
    },
    clearTrades: (state) => {
      state.trades = initial.trades;
    },
    // owned coins reducers
    addCoin: (state, action) => {
      state.coins.unshift(action.payload);
    },
    updateCoins: (state, action) => {
      state.coins = action.payload;
    },
    // news bookmark
    addNewsBookmark: (state, action) => {
      state.newsBookmarks.unshift(action.payload);
    },
    updateNewsBookmark: (state, action) => {
      state.newsBookmarks = action.payload;
    },
    clearNewsBookmark: (state) => {
      state.newsBookmarks = initial.newsBookmarks;
    },
    // coins bookmark
    addCoinBookmark: (state, action) => {
      state.cryptoBookmarks.unshift(action.payload);
    },
    updateCoinBookmark: (state, action) => {
      state.cryptoBookmarks = action.payload;
    },
    clearCoinBookmark: (state) => {
      state.cryptoBookmarks = initial.cryptoBookmarks;
    },
    clearFundDate: (state) => {
      state.lastFundDate = initial.lastFundDate;
    },
  },
});

export const { 
  augmentBalance,
  reduceBalance,
  addTrade,
  clearTrades,
  addCoin,
  updateCoins,
  addNewsBookmark,
  updateNewsBookmark,
  clearNewsBookmark,
  addCoinBookmark,
  updateCoinBookmark,
  clearCoinBookmark,
  clearFundDate
} = appSlice.actions;