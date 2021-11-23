const isNameValid = (name: string): boolean => {
    if (!name) {
        return false;
    }

    if (name.length < 8) {
        return false;
    }

    if (name.length > 16) {
        return false;
    }

    const tester = /^[a-zA-Z\u00C0-\u017F´]+\s+[a-zA-Z\u00C0-\u017F´]{0,}$/;

    if (!tester.test(name)) {
        return false;
    }

    return true;
};

export { isNameValid };
