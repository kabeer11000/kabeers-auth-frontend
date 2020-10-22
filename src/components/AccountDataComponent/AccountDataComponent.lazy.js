import React, {lazy, Suspense} from 'react';

const LazyAccountDataComponent = lazy(() => import('./AccountDataComponent'));

const AccountDataComponent = props => (
    <Suspense fallback={null}>
        <LazyAccountDataComponent {...props} />
    </Suspense>
);

export default AccountDataComponent;
