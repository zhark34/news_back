import generator from 'generate-password';

export const generatePassword = () => {

    const password = generator.generate({
        length: 12,
        numbers: true
    });

    return password;

}