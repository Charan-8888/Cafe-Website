import { createContext } from 'react';
import type { BookingContextType } from '../types';

export const BookingContext = createContext<BookingContextType | null>(null);
