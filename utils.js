const reg_initials = /^[a-z]|_[a-z]/g;
exports.toCamelCase = (v) => {
    return v.toLowerCase().replace(reg_initials, (e, r, t) => {
        return e.replace('_', '').toUpperCase()
    });
};

const reg_table_name = /^([^_]*).*$/;
exports.getPrefix = v => {
    let lower = v.toLowerCase();
    if(reg_table_name.test(lower))
    return lower.match(reg_table_name)[1];
    else return lower;
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
