import React, {lazy, Suspense} from 'react';
import Preloader from "../Preloader/Preloader";

const LazySignUpScreen = lazy(() => import('./SignUpScreen'));

const SignUpScreen = props => (
    <Suspense fallback={<Preloader/>}>
        <LazySignUpScreen {...props} />
    </Suspense>
);

export default SignUpScreen;
