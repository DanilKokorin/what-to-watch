import MainScreen from '../main/main-screen';

type AppScreenProps = {
  title: string;
  genre: string;
  date: string;
};

function App({ title, genre, date }: AppScreenProps): JSX.Element {
  return (
    <MainScreen title={title} genre={genre} date={date} />
  );
}

export default App;
