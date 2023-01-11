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
import { RecaptchaStep, SuccessStep, UserDetailsStep } from './components';

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
        { title: '📝 User details', component: UserDetailsStep },
        { title: '🧐 Are you a BOT?', component: RecaptchaStep },
        { title: '🎉 Account created!', component: SuccessStep },
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
        <div className='app'>
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
        </div>
    );
}

export default App;
