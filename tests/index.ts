(() => {
    const name = 'consoello';

    // console.log(name.split('').reverse().join(''));

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
