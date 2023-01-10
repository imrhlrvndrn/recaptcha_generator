import { useEffect, useState } from 'react';

// utilities
import { generate_recaptcha } from './utils';

// styles
import './index.css';

// hooks
import { useSteps } from './hooks';

// icons
import { ReactComponent as DarkIcon } from './icons/dark.svg';
import { ReactComponent as LightIcon } from './icons/light.svg';

// components
import { RecaptchaStep, UserDetailsStep } from './components';

function App() {
    const [theme, setTheme] = useState('dark');
    const [signup_data, setSignupData] = useState({
        full_name: '',
        email: '',
        password: { content: '', is_hidden: true },
        recaptcha: generate_recaptcha(9),
        input_recaptcha: '',
    });
    const [currentStep, { title, ActiveStep }, navigation] = useSteps([
        { title: '📝 User Details', component: UserDetailsStep },
        { title: '🧐 Are you a BOT?', component: RecaptchaStep },
    ]);

    const update_signup_data = (event) =>
        setSignupData((prevState) => ({
            ...prevState,
            [event?.target?.name]:
                event?.target?.name === 'password'
                    ? { ...signup_data?.password, content: event?.target?.value }
                    : event?.target?.value,
        }));

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <div>
            <div className='card_heading'>
                <h1>{title}</h1>
                <button
                    className='theme_button'
                    onClick={() => setTheme(theme === 'dark' ? '' : 'dark')}
                >
                    {theme === 'dark' ? <LightIcon /> : <DarkIcon />}
                </button>
            </div>
            <ActiveStep
                navigation={navigation}
                state={signup_data}
                update_input_state={update_signup_data}
                setSignupData={setSignupData}
            />
            {/* <form class='form_card'>
                <label for='full_name'>Full Name</label>
                <input
                    type='text'
                    name='full_name'
                    value={signup_data?.full_name}
                    placeholder='full name'
                    onChange={update_signup_data}
                />
                <label for='email'>Email</label>
                <input
                    autocomplete='off'
                    type='email'
                    name='email'
                    value={signup_data?.email}
                    onChange={update_signup_data}
                    placeholder='email'
                />
                <label for='password'>Password</label>
                <div className='password_group'>
                    <input
                        type={signup_data?.password?.is_hidden ? 'password' : 'text'}
                        name='password'
                        value={signup_data?.password?.content}
                        onChange={update_signup_data}
                        placeholder='password'
                    />
                    <button
                        type='button'
                        onClick={() =>
                            setSignupData((prevState) => ({
                                ...prevState,
                                password: {
                                    ...signup_data?.password,
                                    is_hidden: !signup_data?.password?.is_hidden,
                                },
                            }))
                        }
                    >
                        {signup_data?.password?.is_hidden ? <HiddenIcon /> : <UnhiddenIcon />}
                    </button>
                </div>
                <div class='recaptcha_container'>
                    <p class='recaptcha'>{signup_data?.recaptcha}</p>
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
                    type='text'
                    name='input_recaptcha'
                    id='input_recaptcha'
                    value={signup_data?.input_recaptcha}
                    onChange={update_signup_data}
                    placeholder='Type above recaptcha here (case sensitive)'
                />
                <button
                    disabled={
                        !is_valid_recaptcha(signup_data?.recaptcha, signup_data?.input_recaptcha)
                    }
                    class='signup_button'
                    type='submit'
                >
                    Create new account
                </button>
            </form> */}
        </div>
    );
}

export default App;
