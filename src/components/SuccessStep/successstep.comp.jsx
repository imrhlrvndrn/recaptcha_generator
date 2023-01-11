// utilities
import { generate_recaptcha } from '../../utils';

// styles
import './successstep.css';

export const SuccessStep = ({ navigation, state, setSignupData }) => {
    return (
        <div className='card success'>
            <p>🥳</p>
            <h1>Congratulations, {state?.full_name}!</h1>
            <p>Your account is created. You may now enjoy the perks</p>
            <button
                type='submit'
                className='primary_button'
                onClick={() => {
                    setSignupData({
                        full_name: '',
                        email: '',
                        password: { content: '', is_hidden: true },
                        input_recaptcha: '',
                        recaptcha: generate_recaptcha(9),
                    });
                    navigation?.nextStep();
                }}
            >
                Create another account
            </button>
        </div>
    );
};
