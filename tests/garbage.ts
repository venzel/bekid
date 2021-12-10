// CONTEXT 1

(() => {
    const name = 'consoelo';

    const letters = [...name.split('')].sort();

    const singlerLetter = [...new Set(letters)];

    interface LetterCount {
        [key: string]: number;
    }

    const letterCount: LetterCount = {};

    singlerLetter.forEach((letter) => {
        letterCount[letter] = letters.filter((e) => e === letter).length;
    });

    Object.keys(letterCount).forEach((e) => console.log(e, '=', letterCount[e]));
})();

// CONTEXT 2

(() => {
    const name = 'consoello';

    const vowels = ['a', 'e', 'i', 'o', 'u'];

    let letters = [...name.split('')].sort();

    letters = letters.filter((e) => vowels.includes(e));

    const singlerLetter = [...new Set(letters)];

    interface LetterCount {
        [key: string]: number;
    }

    const letterCount: LetterCount = {};

    singlerLetter.forEach((letter) => {
        letterCount[letter] = letters.filter((e) => e === letter).length;
    });

    Object.keys(letterCount).forEach((e) => console.log(e, '=', letterCount[e]));
})();

// CONTEXT 3

(() => {
    const data = {
        users: [],
        emotions: [],
        reasons: [],
    };

    const keys = Object.keys(data).reverse();

    for (const k of keys) {
        console.log(k);
    }

    console.log(keys);
})();

// CONTEXT 4

// const wordToLowerCase = (value: string) => value.toLowerCase();

// const wordReplaceAccents = (value: string) => {
//     return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
// };
//
// const wordToUpperCase = (word: string) => {
//     const wordPart = word.split('');

//     wordPart[0] = wordPart[0].toLocaleUpperCase();

//     return wordPart.join('');
// };

// const wordReplaceFirstLetter = (value: string, callback: Function) => {
//     const wordsParts = value.split(' ');

//     let list = [...wordsParts];

//     return list.map((word) => (word.length > 3 ? callback(word) : word)).join(' ');
// };

// const generateTerm = (term: string) => {
//     const terms = [];

//     terms.push(wordToLowerCase(wordReplaceAccents(term)));

//     return terms.join(' ');
// };

// console.log(generateTerm('Tiagô da costa Rizzo'));

// CONTEXT 5

(() => {
    class User {
        name: string;
        age: number;

        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }

        static create(name: string, age: number): User {
            return new User(name, age);
        }
    }

    const array = [3, 4, 1, 10, 20, 2, 8];

    console.log(array);

    const compare = (a: number, b: number) => a - b;

    const arraySorted = array.sort(compare);

    console.log(arraySorted);

    const arrayMultiplied = arraySorted.map((e) => e * 10);

    console.log(arrayMultiplied);

    const arrayReduced = arrayMultiplied.reduce((p, n) => p + n, 0);

    console.log(arrayReduced);

    const users = [];

    const bruna = User.create('Bruna', 20);
    const tiago = User.create('Tiago', 20);

    users.push(tiago);
    users.push(User.create('Marcos', 21));
    users.push(User.create('Amancio', 21));
    users.push(bruna);

    const compare_name = (a: User, b: User) => {
        if (a.name < b.name) return -1;

        if (a.name > b.name) return 1;

        return 0;
    };

    users.sort(compare_name);

    console.log(users);

    const exists = users.indexOf(tiago);

    console.log(exists);

    const usersFilters = users.filter((e) => e.age >= 21);

    console.log(usersFilters);
})();

// CONTEXT 6

(() => {
    let name = 'bolaDegude';

    const word = 'de';

    const result = name.search(new RegExp(word, 'i'));

    console.log(result);
})();

// CONTEXT 7

(() => {
    let name = 'bolaDegude';

    const searchIndex = name.search(new RegExp('de', 'i'));

    console.log(searchIndex);

    const stringReplaced = name.replace(new RegExp('De', 'g'), 'x');

    console.log(stringReplaced);
})();

// CONTEXT 8

(() => {
    const name = 'Felipe del toro';

    const splitedName = name.split(' ');

    const toUpper = (e: string) => {
        if (e.length > 2) {
            return e.charAt(0).toUpperCase() + e.slice(1);
        }

        return e;
    };

    const adjustedName = splitedName.map((e) => toUpper(e));

    console.log(adjustedName);

    const joinedName = adjustedName.join(' ');

    console.log(joinedName);
})();

// Context 9

(() => {
    interface TypeSplited {
        value: string;
        char: string;
        index: number;
    }

    const replaceAt = ({ value, char, index }: TypeSplited) => {
        const sizeValue = value.length - 1;

        if (index > sizeValue) {
            console.error('Index maior que a palavra');

            return value;
        }

        const valueSplited = value.split('');

        valueSplited[index] = char;

        const valueJoined = valueSplited.join('');

        return valueJoined;
    };

    const value = 'Felipe del toro';
    const char = 'G';
    const index = 2;

    const newName = replaceAt({ value, char, index });

    console.log(newName);
})();
