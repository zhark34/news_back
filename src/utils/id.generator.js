import generator from 'generate-password';

export const generateId = () => {

    const id = generator.generate({
        length: 12,
        numbers: true,
        lowercase: false,
        uppercase: false,
        symbols: false,
        strict: true
    });

    return id;
};
