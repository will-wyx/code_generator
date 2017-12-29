const {toCamelCase, dataTypeToJava} = require('../utils');
exports.createModel = (data, parent_package) => {
    let content = [];
    let package_name = 'model';
    let table_name = data.table;
    let class_name = toCamelCase(table_name);
    content.push(`package ${parent_package}.${package_name};`);
    content.push('import java.util.Date;');
    content.push(`import ${parent_package}.util.StrUtils;`);
    content.push('');
    content.push(`@modelAttribute(name="${table_name}")`);
    content.push(`public class ${class_name} extends BaseModel {`);

    data.columns.map(e => {
        let field_name = toCamelCase(e.name);
        let type = dataTypeToJava(e.type);
        content.push(`    /**`);
        content.push(`     * ${e.comment}`);
        content.push(`     */`);
        let allow_update = e.allow_update ? '' : ', allowupdate=false';
        content.push(`    @fieldAttribute(name="${e.name}"${allow_update})`);
        content.push(`    private ${type} ${field_name};`);
        content.push(`    public void set${field_name}(${type} value) {`);
        let value = e.column_key === 'PRI' ? `StrUtils.padLeft(value, 8, '0')` : 'value';
        content.push(`        this.${field_name} = ${value};`);
        content.push(`    }`);
        content.push(`    public ${type} get${field_name}() {`);
        content.push(`        return this.${field_name};`);
        content.push(`    }`);
        content.push('');
    });

    content.push('}');
    return {file_name: `${class_name}.java`, content: content.join('\n')};
};