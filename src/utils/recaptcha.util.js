// utility functions
export const generate_recaptcha = (char_limit) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters?.length;
    let generated_recaptcha = '';
    for (let i = 1; i <= char_limit; i++) {
        generated_recaptcha += characters?.charAt(Math?.floor(Math?.random() * charactersLength));
    }
    return generated_recaptcha;
};

export const is_valid_recaptcha = (original_recaptcha = '', input_recaptcha = '') =>
    original_recaptcha === input_recaptcha ? true : false;

// // Adding Event Listeners
// reload_recaptcha?.addEventListener('click', (event) => {
//     event?.preventDefault();
//     set_recaptcha();
// });

// recaptcha_input?.addEventListener('change', (event) => {
//     console.log(
//         'recaptcha input validation => ',
//         !!is_valid_recaptcha(generated_recaptcha, event?.target?.value)
//     );
//     signup_button.disabled = !is_valid_recaptcha(generated_recaptcha, event?.target?.value);
// });
