import React, { useContext, useEffect } from "react";
import { IconSpinner } from "../icons/icon";
import { Webservice } from "../services/Webservice";
import { ArticleList } from "./article/ArticleList";
import { Store, StoreState } from "./Store";

export const Main: React.FC = () => {
  const { articles, filter } = useContext(Store);

  useEffect(() => {
    Webservice.getArticles().then((articles) => {
      StoreState.set({ articles });
    });
  }, []);

  if (!articles) {
    return (
      <main className="loading">
        <IconSpinner className="big-spinner" />
      </main>
    );
  }

  return (
    <main>
      <ArticleList
        articles={articles.filter(
          (article) => !filter || article.title.includes(filter),
        )}
      />
    </main>
  );
};
