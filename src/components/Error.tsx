import { FC } from 'react';

interface IProps {
  errorMsg: string;
}

const ErrorView: FC<IProps> = ({ errorMsg }) => {
  return (
    <main className="error"><p>{errorMsg}</p></main>
  )
}

export default ErrorView;