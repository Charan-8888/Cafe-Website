import { Navigate, useParams } from 'react-router-dom';
import BookingFormContainer from '../components/BookingFormContainer';
import type { BookingMode } from '../types';

export default function BookingPage() {
  const { mode = 'reserve' } = useParams();

  if (mode !== 'reserve') {
    return <Navigate to="/booking/reserve" replace />;
  }

  return <BookingFormContainer key={mode} mode={mode as BookingMode} />;
}
