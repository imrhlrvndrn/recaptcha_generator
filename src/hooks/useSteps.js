import { useState } from 'react';

export const useSteps = (steps = [], initialStep = 1) => {
    const processedSteps = steps?.reduce(
        (acc, curValue, curIndex) => [
            ...acc,
            { ...curValue, step: curIndex + 1, component: curValue?.component, Props: null },
        ],
        []
    );
    const [totalSteps, setTotalSteps] = useState(processedSteps);
    const [currentStep, setCurrentStep] = useState(initialStep);

    const jumpTo = (step) => {
        if (typeof step !== 'number' || !step) return;

        if (!!totalSteps[step]) return setCurrentStep(step);
    };

    const nextStep = (event, props = null) => {
        console.log('nextStep triggered');
        let nextStep = currentStep + 1;

        if (nextStep > totalSteps?.length) return setCurrentStep(initialStep);
        else {
            if (props)
                setTotalSteps((prevState) => prevState?.map((step) => ({ ...step, Props: props })));
            return setCurrentStep(nextStep);
        }
    };

    const previousStep = (event, props = null) => {
        let previousStep = currentStep - 1;

        if (previousStep <= 0) return;
        else {
            if (props)
                setTotalSteps((prevState) => prevState?.map((step) => ({ ...step, Props: props })));
            return setCurrentStep(previousStep);
        }
    };

    return [
        currentStep,
        {
            title: totalSteps[currentStep - 1]?.title,
            ActiveStep: totalSteps[currentStep - 1]?.component,
            Props: totalSteps[currentStep - 1]?.Props,
        },
        {
            jumpTo,
            nextStep,
            previousStep,
        },
    ];
};
