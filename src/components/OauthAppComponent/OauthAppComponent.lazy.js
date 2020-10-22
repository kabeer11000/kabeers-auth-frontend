import React, {lazy, Suspense} from 'react';

const LazyOauthAppComponent = lazy(() => import('./OauthAppComponent'));

const OauthAppComponent = props => (
    <Suspense fallback={null}>
        <LazyOauthAppComponent {...props} />
    </Suspense>
);

export default OauthAppComponent;
