import React from 'react';
import { render } from '@testing-library/react';
import { Article } from './Article';

describe('Article', () => {
    it('uses correct image src', () => {
        const { container } = render(
            <Article data={{ cover: '/foo', title: 'test-title', authors: 'test-authors' }} />
        );

        const image = container.querySelector('img')!;
        expect(image.src).toBe('https://cdn.pixabay.com/photo/foo');
    });
});
