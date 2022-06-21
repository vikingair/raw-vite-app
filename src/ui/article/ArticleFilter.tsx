import React, { useState, useCallback, ChangeEventHandler } from 'react';
import { IconSearch } from '../../icons/icon';
import { StoreState } from '../Store';

type InputOnChangeHandler = ChangeEventHandler<HTMLInputElement>;
type FormSubmitHandler = ChangeEventHandler<HTMLFormElement>;

export const useArticleFilter = (): [string, InputOnChangeHandler, FormSubmitHandler] => {
    const [value, setValue] = useState<string>('');

    const onChange = useCallback<InputOnChangeHandler>((event) => {
        setValue(event.target.value);
    }, []);

    const onSubmit = useCallback<FormSubmitHandler>(
        (event) => {
            event.preventDefault();
            StoreState.set({ filter: value });
        },
        [value]
    );

    return [value, onChange, onSubmit];
};

export const ArticleFilter: React.FC = () => {
    const [value, onChange, onSubmit] = useArticleFilter();

    return (
        <div className="article-filter">
            <form onSubmit={onSubmit}>
                <input type="text" value={value} onChange={onChange} placeholder="Filter for..." />
                <button>
                    <IconSearch />
                </button>
            </form>
        </div>
    );
};
