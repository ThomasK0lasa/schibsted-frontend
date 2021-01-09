import { FC } from 'react';
import "./ErrorComponent.css";

interface IProps {
  errorMsg: string;
}

const ErrorComponent: FC<IProps> = ({ errorMsg }) => {
  return (
    <main className="error"><p>{errorMsg}</p></main>
  )
}

export default ErrorComponent;