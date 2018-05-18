const {toCamelCase, dataTypeToJava} = require('../utils');
exports.createModel = (data, parent_package) => {
    let content = [];
    let package_name = 'model';
    let table_name = data.table;
    table_name = table_name.split('_').slice('2').join('_');
    let class_name = toCamelCase(table_name);
    content.push(`package ${parent_package}.${package_name};`);
    content.push(`import com.sunvua.domain.Entity`);
    content.push('');
    content.push(`public class ${class_name} extends Entity {`);

    data.columns.map(e => {
        let field_name = toCamelCase(e.name, true);
        let type = dataTypeToJava(e.type);
        content.push(`    /**`);
        content.push(`     * ${e.comment}`);
        content.push(`     */`);
        content.push(`    private ${type} ${field_name};`);
        content.push(`    public void set${field_name}(${type} value) {`);
        let value = 'value';
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