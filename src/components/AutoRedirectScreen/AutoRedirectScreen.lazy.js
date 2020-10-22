import React, {lazy, Suspense} from 'react';

const LazyAutoRedirectScreen = lazy(() => import('./AutoRedirectScreen'));

const AutoRedirectScreen = props => (
    <Suspense fallback={null}>
        <LazyAutoRedirectScreen {...props} />
    </Suspense>
);

export default AutoRedirectScreen;
