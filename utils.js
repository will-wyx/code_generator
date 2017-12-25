exports.toCamelCase = (v) => {
    return v.toLowerCase().replace(/^[a-z]|_[a-z]/g, (e, r, t) => {
        return e.replace('_', '').toUpperCase()
    });
};
