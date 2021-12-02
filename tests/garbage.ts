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
