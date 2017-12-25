exports.toCamelCase = (v) => {
    return v.toLowerCase().replace(/^[a-z]|_[a-z]/g, (e, r, t) => {
        return e.replace('_', '').toUpperCase()
    });
};

exports.dataTypeToJava = (dataType) => {
    let type;
    switch (dataType) {
        case 'int':
            type = 'int';
            break;
        case 'varchar':
        case 'text':
        default:
            type = 'String';
            break;
    }
    return type;
};
