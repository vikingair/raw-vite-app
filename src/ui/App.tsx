import React from 'react';
import logo from '../assets/logo.svg';
import { Main } from './Main';
import { ArticleFilter } from './article/ArticleFilter';

export const App: React.FC = () => (
    <div className="App">
        <header>
            <img src={logo} alt="logo" />
            <ArticleFilter />
        </header>
        <Main />
    </div>
);
