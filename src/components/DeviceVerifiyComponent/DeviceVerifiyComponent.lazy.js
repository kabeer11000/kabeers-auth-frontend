import React, {lazy, Suspense} from 'react';

const LazyDeviceVerifiyComponent = lazy(() => import('./DeviceVerifiyComponent'));

const DeviceVerifiyComponent = props => (
    <Suspense fallback={null}>
        <LazyDeviceVerifiyComponent {...props} />
    </Suspense>
);

export default DeviceVerifiyComponent;
