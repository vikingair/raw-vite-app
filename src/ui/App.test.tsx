import React from 'react';
import { App } from './App';
import { render } from '@testing-library/react';
import { Spy } from 'spy4js';

const mockReactComponents_Main = Spy.mockReactComponents('./Main', 'Main');
const mockReactComponents_ArticleFilter = Spy.mockReactComponents('./article/ArticleFilter', 'ArticleFilter');

describe('App', () => {
    beforeEach(() => {
        mockReactComponents_Main.Main.returns('Main');
        mockReactComponents_ArticleFilter.ArticleFilter.returns('ArticleFilter');
    });

    it('renders the content', () => {
        expect(render(<App />).container).toMatchInlineSnapshot(`
            <div>
              <div
                class="App"
              >
                <header>
                  <img
                    alt="logo"
                    src="logo.svg"
                  />
                  ArticleFilter
                </header>
                Main
              </div>
            </div>
        `);
    });
});
