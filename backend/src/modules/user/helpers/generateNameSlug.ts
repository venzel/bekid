const wordToLowerCase = (value: string) => value.toLowerCase();

const wordReplaceAccents = (value: string) => {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const wordToUpperCase = (word: string) => {
    const wordPart = word.split('');

    wordPart[0] = wordPart[0].toLocaleUpperCase();

    return wordPart.join('');
};

const wordReplaceFirstLetter = (value: string, callback: Function) => {
    const wordsParts = value.split(' ');

    let list = [...wordsParts];

    return list.map((word) => (word.length > 3 ? callback(word) : word)).join(' ');
};

const generateSlugs = (term: string) => {
    const terms = [];

    terms.push(wordToLowerCase(wordReplaceAccents(term)));

    terms.push(wordReplaceFirstLetter(wordReplaceAccents(term), wordToUpperCase));

    return terms.join(' ');
};

export { generateSlugs };
