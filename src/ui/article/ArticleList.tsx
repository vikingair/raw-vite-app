import { ArticleData } from "../../services/Webservice";
import { Article } from "./Article";

type ArticleListProps = { articles: ArticleData[] };

export const ArticleList: React.FC<ArticleListProps> = ({ articles }) => (
  <div className="article-list">
    {articles.map((data) => (
      <Article data={data} key={data.id} />
    ))}
  </div>
);
