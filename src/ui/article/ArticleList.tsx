import React from 'react';
import { Article } from './Article';
import { ArticleData } from '../../services/Webservice';

type ArticleListProps = { articles: ArticleData[] };

export const ArticleList: React.FC<ArticleListProps> = ({ articles }) => (
    <div className="article-list">
        {articles.map((data, index) => (
            <Article data={data} key={index} />
        ))}
    </div>
);
