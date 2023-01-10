import { useEffect } from 'react';

// hooks
import { usePasswordStrength } from '../../hooks';

// styles
import './passwordstrengthchecker.css';

export const PasswordStrengthChecker = ({ password }) => {
    const { passwordStrength, color } = usePasswordStrength(password, {
        colors: ['red', 'orange', 'yellow', 'lightgreen'],
    });

    useEffect(() => {
        console.log('password strength => ', passwordStrength);
    }, [password]);

    return (
        <div className='password_strength_bars'>
            {[1, 2, 3, 4]?.map((value, index) => (
                <div
                    className='strength_bar'
                    key={value}
                    style={{ backgroundColor: `${index + 1 <= passwordStrength ? color : ''}` }}
                />
            ))}
        </div>
    );
};
