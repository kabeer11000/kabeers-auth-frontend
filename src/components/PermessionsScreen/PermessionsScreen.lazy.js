import React, {lazy, Suspense} from 'react';

const LazyPermessionsScreen = lazy(() => import('./PermessionsScreen'));

const PermessionsScreen = props => (
    <Suspense fallback={null}>
        <LazyPermessionsScreen {...props} />
    </Suspense>
);

export default PermessionsScreen;
