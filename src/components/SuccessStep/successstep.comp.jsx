// utilities
import { useEffect } from 'react';
import { generate_recaptcha } from '../../utils';

// styles
import './successstep.css';

export const SuccessStep = ({ navigation, state, setSignupData }) => {
    const submit_action = (event) => {
        event?.preventDefault();
        setSignupData({
            full_name: '',
            email: '',
            password: { content: '', is_hidden: true },
            input_recaptcha: '',
            recaptcha: generate_recaptcha(9),
        });
        navigation?.nextStep();
    };
    useEffect(() => {
        document.addEventListener('keypress', submit_action);

        return () => document.removeEventListener('keypress', submit_action);
    }, []);

    return (
        <form onSubmit={submit_action} className='card success'>
            <p>🥳</p>
            <h1>Congratulations, {state?.full_name}!</h1>
            <p>Your account is created. You may now enjoy the perks</p>
            <button type='submit' className='primary_button'>
                Create another account
            </button>
        </form>
    );
};
