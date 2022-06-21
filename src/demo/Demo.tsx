import '../assets/Demo.scss';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export const Demo: React.FC = () => {
    window.console.log('!! 1 !!');

    // useState: with static initialization
    const [count, setCount] = useState<number>(0);
    window.console.log('!! 2 !!', { count });

    // useState: with computed initialization
    const [charCount, setCharCount] = useState(() => {
        window.console.log('!! 3 !!', { count });
        return 0;
    });
    window.console.log('!! 4 !!', { count, charCount });

    useEffect(() => {
        window.console.log('!! 5 !!', { count, charCount });
        return () => {
            window.console.log('!! 6 !!', { count, charCount });
        };
    }, [count, charCount]);

    const [input, setInput] = useState('');

    const hits = useRef(0);

    // useCallback: without dependencies
    const increment = useCallback(() => setCount((c) => c + 1), []);

    // useCallback: with dependency
    const countChars = useCallback(() => setCharCount((c) => c + input.length + hits.current), [input]);

    window.console.log('!! 7 !!', { count, charCount, hits });

    return (
        <div className={'demo'}>
            <div onClick={increment}>count: {count}</div>
            <div onClick={countChars}>character count: {charCount}</div>
            <div
                onClick={() => {
                    ++hits.current;
                }}
            >
                Hit me! (hits on last render: {hits.current})
            </div>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
    );
};
