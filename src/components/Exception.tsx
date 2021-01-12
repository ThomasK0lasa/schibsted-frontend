import { FC } from 'react';
import './Exception.css';
import { IState } from '../interfaces/State';

const ErrorComponent: FC<IState> = ({ message, type}) => {
  return (
    <main className='exception'><p className={type}>{message}</p></main>
  )
}

export default ErrorComponent;