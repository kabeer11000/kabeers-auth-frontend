import React, {lazy, Suspense} from 'react';

const LazySettings = lazy(() => import('./AppComponent'));

const AppComponent = props => (
    <Suspense fallback={null}>
        <LazySettings {...props} />
    </Suspense>
);

export default AppComponent;
