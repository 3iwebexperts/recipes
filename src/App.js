import Filter from './Components/Filters';

function App(config) {
  return [
    <Filter config={config.config} />,
  ]
}

export default App;