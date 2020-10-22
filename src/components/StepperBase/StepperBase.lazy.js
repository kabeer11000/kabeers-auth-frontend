import React, {lazy, Suspense} from 'react';
import Preloader from "../Preloader/Preloader";

const LazyStepperBase = lazy(() => import('./StepperBase'));

const StepperBase = props => (
    <Suspense fallback={<Preloader/>}>
        <LazyStepperBase {...props} />
    </Suspense>
);

export default StepperBase;
