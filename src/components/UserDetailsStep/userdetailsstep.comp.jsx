// icons
import { ReactComponent as HiddenIcon } from '../../icons/hidden.svg';
import { ReactComponent as UnhiddenIcon } from '../../icons/unhidden.svg';

// components
import { PasswordStrengthChecker } from '../';

export const UserDetailsStep = ({ navigation, state, update_input_state, setSignupData }) => {
    return (
        <form className='card' onSubmit={() => navigation?.nextStep()}>
            <label for='full_name'>Full Name</label>
            <input
                required
                autoFocus
                type='text'
                name='full_name'
                value={state?.full_name}
                placeholder='full name'
                onChange={update_input_state}
            />
            <label for='email'>Email</label>
            <input
                required
                autocomplete='off'
                type='email'
                name='email'
                value={state?.email}
                onChange={update_input_state}
                placeholder='email'
            />
            <label for='password'>Password</label>
            <div className='password_group'>
                <input
                    required
                    type={state?.password?.is_hidden ? 'password' : 'text'}
                    name='password'
                    value={state?.password?.content}
                    onChange={update_input_state}
                    placeholder='password'
                />
                <button
                    type='button'
                    onClick={() =>
                        setSignupData((prevState) => ({
                            ...prevState,
                            password: {
                                ...state?.password,
                                is_hidden: !state?.password?.is_hidden,
                            },
                        }))
                    }
                >
                    {state?.password?.is_hidden ? <HiddenIcon /> : <UnhiddenIcon />}
                </button>
            </div>
            <PasswordStrengthChecker password={state?.password?.content} />
            <div className='step_action_buttons'>
                <button
                    disabled={!new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}').test(state?.email)}
                    className='primary_button'
                    style={{ flex: '1' }}
                    type='submit'
                >
                    Next step
                </button>
            </div>
        </form>
    );
};
