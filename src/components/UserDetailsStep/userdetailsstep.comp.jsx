// icons
import { ReactComponent as HiddenIcon } from '../../icons/hidden.svg';
import { ReactComponent as UnhiddenIcon } from '../../icons/unhidden.svg';

export const UserDetailsStep = ({ navigation, state, update_input_state, setSignupData }) => {
    return (
        <>
            <h1>📝 User Details</h1>
            <form className='form_card'>
                <label for='full_name'>Full Name</label>
                <input
                    type='text'
                    name='full_name'
                    value={state?.full_name}
                    placeholder='full name'
                    onChange={update_input_state}
                />
                <label for='email'>Email</label>
                <input
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
                <div className='step_action_buttons'>
                    <button
                        className='primary_button'
                        style={{ flex: '1' }}
                        type='submit'
                        onClick={() => navigation?.nextStep()}
                    >
                        Next step
                    </button>
                </div>
            </form>
        </>
    );
};
