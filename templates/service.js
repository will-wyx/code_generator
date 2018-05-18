const {toCamelCase} = require('../utils');
exports.createService = (data, parent_package) => {
    let package_name = 'service';
    let table_name = data.table;
    table_name = table_name.split('_').slice('2').join('_');
    let model_class_name = toCamelCase(table_name);
    let class_name = `${model_class_name}Service`;

    let template = `package ${parent_package}.${package_name};
import com.sunvua.baseinterface.BaseService;
import ${parent_package}.model.${model_class_name};

@Service
public interface ${class_name} extends BaseService<Customer> {
}`;
    return {file_name: `${class_name}.java`, content: template};
};
