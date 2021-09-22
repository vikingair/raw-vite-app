import React, { useEffect, useContext } from 'react';
import { ArticleList } from './article/ArticleList';
import { Webservice } from '../services/Webservice';
import { Store, StoreState } from './Store';
import { IconSpinner } from '../icons/icon';

export const Main: React.VFC = () => {
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
            <ArticleList articles={articles.filter((article) => !filter || article.title.includes(filter))} />
        </main>
    );
};
