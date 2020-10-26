import React, {lazy, Suspense} from 'react';

const LazyEmbeddedAccountSystem = lazy(() => import('./EmbeddedAccountSystem'));

const EmbeddedAccountSystem = props => (
    <Suspense fallback={null}>
        <LazyEmbeddedAccountSystem {...props} />
    </Suspense>
);

export default EmbeddedAccountSystem;
