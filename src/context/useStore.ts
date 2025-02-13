import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

interface Trade {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  amount: number;
  price: number;
  date: Date;
  notes: string;
  emotion: string;
}

interface UserState {
  user: User | null;
  trades: Trade[];
  isLoading: boolean;
  setUser: (user: User | null) => void;
  addTrade: (trade: Trade) => void;
  removeTrade: (tradeId: string) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useStore = create<UserState>((set) => ({
  user: null,
  trades: [],
  isLoading: false,
  setUser: (user) => set({ user }),
  addTrade: (trade) => set((state) => ({ trades: [...state.trades, trade] })),
  removeTrade: (tradeId) =>
    set((state) => ({
      trades: state.trades.filter((trade) => trade.id !== tradeId),
    })),
  setIsLoading: (loading) => set({ isLoading: loading }),
})); 