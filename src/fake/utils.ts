export const sleep = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

export const randomBetween = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

export const maybeFail = (rate: number, error: string) => {
    if (Math.random() < rate) {
        throw new Error(error);
    }
};