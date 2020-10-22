import React, {lazy, Suspense} from 'react';
import Preloader from "../Preloader/Preloader";

const LazyPasswordScreen = lazy(() => import('./PasswordScreen'));

const PasswordScreen = props => (
    <Suspense fallback={<Preloader/>}>
        <LazyPasswordScreen {...props} />
    </Suspense>
);

export default PasswordScreen;
