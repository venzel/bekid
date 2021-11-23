const generateStatus = (error: boolean, code: number, message: string): any => {
    return { error, code, message };
};

export { generateStatus };
