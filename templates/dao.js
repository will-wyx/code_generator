const {toCamelCase} = require('../utils');
exports.createDao = (data, parent_package) => {
    let package_name = 'dao';
    let table_name = data.table;
    let model_class_name = toCamelCase(table_name);
    let class_name = `${model_class_name}DaoImpl`;
    let type_map = 'Map<String, Object>';

    let method_add = `
        /**
         * 新增
         */
        public int add(${model_class_name} model) throws Exception {
            String code = this.getGuid("${table_name}");
            model.setCode(code);
            model.setCreatedDate(new Date());
            return this.addBase(model);
        }`;
    let method_modify = `
        /**
         * 修改
         */
        public int modify(${model_class_name} model) throws Exception {
            return this.modifyBase(model);
        }`;
    let method_delete = `
        /**
         * 删除
         */
        public int delete(String[] args, String userCode) throws Exception {
            int i = 0;
            for (String arg: args) {
                i += this.deleteBase(${model_class_name}.class, arg, userCode);
            }
            return i;
        }`;
    let method_queryByCode = `
        /**
         * 通过主键查询
         */
        public ${type_map} queryByCode(String code) throws Exception {
            Object[] args = {code};
            String sql = "SELECT * FROM ${table_name} WHERE CODE=? AND FLAG_DEL<>1";
            return this.queryMap(sql, args);
        }`;

    let method_queryManage = `
        /**
         * 分页查询
         */
        public ${type_map} queryManage(String sortname, int psize, int page, String sortorder, String[] args) {
            String sql = "(SELECT * FROM ${table_name} WHERE FLAG_DEL<>1)";
            return this.queryPage(str, sortname, psize, page, sortorder, args);
        }`;

    let template = `package ${parent_package}.${package_name};
import java.util.Date;
import java.util.Map;
import ${parent_package}.${package_name}.BaseDao;
import ${parent_package}.model.${model_class_name};

public class ${class_name} extends BaseDao {
    ${method_add}
    ${method_modify}
    ${method_delete}
    ${method_queryByCode}
    ${method_queryManage}
}`;
    return template;
};
