//////////////////////////////////////////////////
// typeof guards

// This function can take a vlue that is a number or string. Inside our function we
// use typeof gaurds in order to perform certain actions based on whether the argument
// is a string or number
function triple(value: number | string): string | number | undefined {
    if (typeof value === "string") {
        // .repeat() is just a regular string method that repeats a string however
        // many times in a row to create a new string
        return value.repeat(3);
    } else if (typeof value === "number") {
        return value * 3;
    };
};

//////////////////////////////////////////////////
// truthiness guards

const printLetters = (word: string | null): void => {
    // Truthiness check to check if word is not undefined here, if it is not then 
    // TypeScript assumes word is a string and runs the code within 
    if (word) {
        for (let character of word) {
            console.log(character);
        };
    } else {
        console.log("YOU DID NOT PASS IN A WORD!");
    };
};

//////////////////////////////////////////////////
// equality narrowing

function someDemo(x: string | number, y: string | boolean) {
    // if x === y, the only possibility is that they are both strings
    if (x === y) {
        x.toUpperCase();
    };
};

//////////////////////////////////////////////////
// using the "In" operator to narrow

interface Movie {
    title: string,
    duration: number
};

interface TVShow {
    title: string,
    numEpisodes: number,
    episodeDuration: number
};

function getRunTime(media: Movie | TVShow) {
    // Using TypeScript to determine whether or not the media argument has
    //  a "numEpidsodes" property, that way we know it is a TVShow
    if ("numEpisodes" in media) {
        return media.numEpisodes * media.episodeDuration;
        // Otherwise media has to be a movie
    } else {
        return media.duration;
    };
};

// Movie
console.log(getRunTime({ title: "The Happening", duration: 160 }));
// TV show
console.log(getRunTime({ title: "Spongebob", numEpisodes: 34, episodeDuration: 30 }));

//////////////////////////////////////////////////
// using instanceof to narrow type

class User {
    constructor(public userName: string) {
    };
};

class Company {
    constructor(public companyName: string) {
    };
};

function printName(entity: User | Company): void {
    // Using instance of to determine which class entity is an instance of and then
    // printing the appropriate name
    if (entity instanceof User) {
        console.log(entity.userName);
    } else {
        console.log(entity.companyName);
    };
};

//////////////////////////////////////////////////
// narrowing using type predicates

interface Cat {
    name: string,
    numLives: number
};

interface Dog {
    name: string,
    breed: string
};

// This function takes an animal as an argument and  then returns a boolean
// by asserting that the animal is a cat and checks numLives on the animal. If
// numLives is undefined we know it is a dog and return false, otherwise true
function isCat(animal: Cat | Dog): animal is Cat { // <-- type predicate
    return (animal as Cat).numLives !== undefined;
};

function makeNoise(animal: Cat | Dog): string {
    if (isCat(animal)) {
        return "Meow!";
    } else {
        return "Woof!";
    };
};

//////////////////////////////////////////////////
// narrowing using discriminated unions

// All properties on these interfaces are the same, except for the discriminant 
interface Rooster {
    name: string,
    weight: number,
    age: number,
    kind: "rooster" // <-- discriminant that sets the interface apart
};

interface Cow {
    name: string,
    weight: number,
    age: number,
    kind: "cow"
};

interface Pig {
    name: string,
    weight: number,
    age: number,
    kind: "pig"
};

type FarmAnimal = Pig | Rooster | Cow;

function getFarmAnimalSound(animal: FarmAnimal) {
    switch (animal.kind) {
        case ("pig"):
            return "Oink!";
        case ("cow"):
            return "Moo!";
        case ("rooster"):
            return "Rooster noise.";
        default:
            // We should never make it here if we've handled all cases correctly, this
            // will throw an error is we do
            const shouldNeverGetHere: never = animal
            return shouldNeverGetHere;
    };
};

const stevie: Rooster = {
    name: "Stevie Chicks",
    weight: 11,
    age: 3,
    kind: "rooster"
};

console.log(getFarmAnimalSound(stevie));