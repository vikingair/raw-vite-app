import '../assets/Demo.scss';
import React, { useState } from 'react';
import { AllHooks } from './AllHooks';

export const Demo: React.VFC = () => {
    const [props, setProps] = useState<any>({});

    (window as any).setProps = setProps;

    return (
        <div className="demo">
            <AllHooks {...props} />
        </div>
    );
};
