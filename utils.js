const path = require('path');
const url = require('url');
const reg_initials = /^[a-z]|_[a-z]/g;
const reg_initials_little = /_[a-z]/g;
exports.toCamelCase = (v, lettle) => {
    let reg = lettle ? reg_initials_little : reg_initials;
    return v.toLowerCase().replace(reg, (e, r, t) => {
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

exports.loadURL = (win, hash) => {
    // win.loadURL(url.format({
    //     pathname: path.join(__dirname, './build/index.html'),
    //     hash: `#/${hash}`,
    //     protocol: 'file:',
    //     slashes: true
    // }));
    win.loadURL(`http://localhost:3000#/${hash}`);
    return win;
};
