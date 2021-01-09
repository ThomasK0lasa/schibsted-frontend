import { FC } from 'react';
import "./Error.css"

interface IProps {
  errorMsg: string;
}

const ErrorView: FC<IProps> = ({ errorMsg }) => {
  return (
    <main className="error"><p>{errorMsg}</p></main>
  )
}

export default ErrorView;