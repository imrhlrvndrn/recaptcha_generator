import { useEffect } from 'react';

// utilities
import { generate_recaptcha, is_valid_recaptcha } from '../../utils';

// icons
import { ReactComponent as ReloadIcon } from '../../icons/reload.svg';
import { ReactComponent as HintIcon } from '../../icons/hint.svg';

export const RecaptchaStep = ({ navigation, state, update_input_state, setSignupData }) => {
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const create_account = (event) => {
        event?.preventDefault();

        if (
            state?.full_name &&
            state?.email &&
            state?.password?.content &&
            is_valid_recaptcha(state?.recaptcha, state?.input_recaptcha)
        ) {
            localStorage.setItem(
                'accounts',
                JSON.stringify([
                    ...accounts,
                    {
                        full_name: state?.full_name,
                        email: state?.email,
                        password: state?.password?.content,
                    },
                ])
            );

            navigation?.nextStep();
        }
    };

    useEffect(() => {
        return () => generate_recaptcha(9);
    }, []);

    return (
        <form className='card' onSubmit={create_account}>
            <div class='recaptcha_container'>
                <p class='recaptcha'>{state?.recaptcha}</p>
                <button
                    tabIndex={0}
                    type='button'
                    class='reload_recaptcha'
                    onClick={() =>
                        setSignupData((prevState) => ({
                            ...prevState,
                            recaptcha: generate_recaptcha(9),
                            input_recaptcha: '',
                        }))
                    }
                >
                    <ReloadIcon />
                </button>
            </div>
            <div class='recaptcha_note'>
                <HintIcon />
                <p>The recaptcha is case-sensitive</p>
            </div>
            <input
                autoFocus
                type='text'
                name='input_recaptcha'
                id='input_recaptcha'
                value={state?.input_recaptcha}
                onChange={update_input_state}
                placeholder='Type above recaptcha here (case sensitive)'
            />
            <div className='step_action_buttons'>
                <button
                    type='button'
                    className='secondary_button'
                    onClick={() => navigation?.previousStep()}
                >
                    Back
                </button>
                <button
                    disabled={!is_valid_recaptcha(state?.recaptcha, state?.input_recaptcha)}
                    className='primary_button'
                    type='submit'
                >
                    Create new account
                </button>
            </div>
        </form>
    );
};
