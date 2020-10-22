import React, {lazy, Suspense} from 'react';
import Preloader from "../Preloader/Preloader";

const LazyAccountChooser = lazy(() => import('./AccountChooser'));

const AccountChooser = props => (
    <Suspense fallback={<Preloader/>}>
        <LazyAccountChooser {...props} />
    </Suspense>
);

export default AccountChooser;
