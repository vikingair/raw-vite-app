import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';

export type AllHooksProps = any;

export const AllHooks: React.VFC<AllHooksProps> = (props) => {
    window.console.log('!! 1 !!', props);

    // useState: with static initialization
    const [count, setCount] = useState<number>(0);
    window.console.log('!! 2 !!', props, { count });

    // useState: with computed initialization
    const [name, setName] = useState<string>(() => {
        window.console.log('!! 3 !!', props, { count });
        return 'Bob';
    });
    window.console.log('!! 4 !!', props, { count, name });

    // useCallback: without dependencies
    const increment = useCallback(() => setCount((c) => c + 1), []);

    // useCallback: with dependency
    const changeName = useCallback(() => setName((n) => n + (props.foo || '')), [props.foo]);

    // useEffect
    useEffect(() => {
        window.console.log('!! 5 !!', props, { count, name });
        return () => {
            window.console.log('!! 6 !!', props, { count, name });
        };
    }, [props, count, name]);

    // useLayoutEffect
    useLayoutEffect(() => {
        window.console.log('!! 7 !!', props, { count, name });
        return () => {
            window.console.log('!! 8 !!', props, { count, name });
        };
    }, [props, count, name]);

    window.console.log('!! 9 !!', props, { count, name });

    return (
        <>
            <div>props: {JSON.stringify(props)}</div>
            <div onClick={increment}>count: {count}</div>
            <div onClick={changeName}>name: {name}</div>
        </>
    );
};
