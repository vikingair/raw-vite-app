import logo from "../assets/logo.svg";
import { ArticleFilter } from "./article/ArticleFilter";
import { Main } from "./Main";

export const App: React.FC = () => (
  <div className="App">
    <header>
      <img src={logo} alt="logo" />
      <ArticleFilter />
    </header>
    <Main />
  </div>
);
