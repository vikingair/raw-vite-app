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

    it('displays a spinner while loading the articles', async () => {
        // given / when
        const { container } = render(
            <StoreProvider>
                <Main />
            </StoreProvider>
        );

        // then
        Mock$Webservice.getArticles.wasCalled(1);
        expect(container.querySelector('main')!.classList).toContain('loading');

        // when
        await act(__test__.nextTick);

        // then
        Mock$Webservice.getArticles.wasCalled(1);
        expect(container.querySelector('main')!.classList).not.toContain('loading');
        expect(container.querySelectorAll('.article-list > div').length).toBe(Mock.articles.length);

        // when
        act(() => {
            StoreState.set({ filter: 'Morde' });
        });

        // then
        expect(container.querySelectorAll('.article-list > div').length).toBe(1);
    });
});
