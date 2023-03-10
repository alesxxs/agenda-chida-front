import Routes from "./routes/routes";
import "./App.css";
import { AppContextProvider } from "../src/components/AppContext/appContext";

function App() {
  return (
    <div
      className={"container"}
      style={{
        background:
          "linear-gradient(107deg, rgba(123, 107, 145, 1) 26%, rgba(0, 0, 0, 1) 95%)",
      }}
    >
      <AppContextProvider>
        <Routes />
      </AppContextProvider>
    </div>
  );
}

export default App;
