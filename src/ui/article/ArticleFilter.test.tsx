import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { ArticleFilter, useArticleFilter } from './ArticleFilter';
import { Spy } from 'spy4js';
import { StoreState } from '../Store';

describe('<ArticleFilter />', () => {
    it('changing the input will be displayed', () => {
        const { container } = render(<ArticleFilter />);

        const input = container.querySelector('input')!;
        expect(input.value).toBe('');

        fireEvent.change(input, { target: { value: 'foo' } });

        expect(input.value).toBe('foo');
    });
});

describe('useArticleFilter', () => {
    const Mock_StoreState = Spy.mock(StoreState, 'set');

    it('changing the input will be displayed', () => {
        // given
        const preventDefault = Spy('preventDefault');
        const dummyCb = null as any;
        let [value, onChange, onSubmit] = ['foo', dummyCb, dummyCb];
        const DummyComponent = () => {
            [value, onChange, onSubmit] = useArticleFilter();
            return null;
        };

        // when
        render(<DummyComponent />);

        // then - initial value
        expect(value).toBe('');

        // when - calling onChange
        act(() => {
            onChange({ preventDefault, target: { value: 'bar' } });
        });

        // then
        expect(value).toBe('bar');
        preventDefault.wasNotCalled();

        // when - submitting the current value
        onSubmit({ preventDefault });

        // then
        preventDefault.wasCalled(1);
        Mock_StoreState.set.wasCalledWith({ filter: 'bar' });
    });
});
