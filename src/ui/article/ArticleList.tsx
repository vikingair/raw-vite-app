import React from 'react';
import { ArticleData } from '../../services/Webservice';
import { Article } from './Article';

type ArticleListProps = { articles: ArticleData[] };

export const ArticleList: React.FC<ArticleListProps> = ({ articles }) => (
    <div className="article-list">
        {articles.map((data, index) => (
            <Article data={data} key={index} />
        ))}
    </div>
);
