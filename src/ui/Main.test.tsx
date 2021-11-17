import React from 'react';
import { render, act } from '@testing-library/react';
import { Main } from './Main';
import { StoreProvider, StoreState } from './Store';
import { Spy } from 'spy4js';
import { Webservice } from '../services/Webservice';
import { Mock } from '../services/mocks';

const Mock$Webservice = Spy.mock(Webservice, 'getArticles');

describe('<Main />', () => {
    beforeEach(() => {
        Mock$Webservice.getArticles.resolves(Mock.articles);
    });

    it('REACT-TESTING_LIBRARY: displays a spinner while loading the articles', async () => {
        const { container } = render(
            <StoreProvider>
                <Main />
            </StoreProvider>
        );

        Mock$Webservice.getArticles.wasCalled(1);
        expect(container.querySelector('main')!.classList).toContain('loading');

        await act(__test__.nextTick);

        Mock$Webservice.getArticles.wasCalled(1);
        expect(container.querySelector('main')!.classList).not.toContain('loading');
        expect(container.querySelectorAll('.article-list > div').length).toBe(Mock.articles.length);

        act(() => {
            StoreState.set({ filter: 'Morde' });
        });

        expect(container.querySelectorAll('.article-list > div').length).toBe(1);
    });
});
