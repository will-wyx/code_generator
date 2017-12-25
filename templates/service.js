const {toCamelCase} = require('../utils');
exports.createService = (data, parent_package) => {
    let package_name = 'service';
    let table_name = data.table;
    let model_class_name = toCamelCase(table_name);
    let dao_class_name = `${model_class_name}DaoImpl`;
    let class_name = `${model_class_name}ServiceImpl`;
    let type_map = 'Map<String, Object>';

    let method_add = `
    /**
     * 新增
     */
    public int add(${model_class_name} model) throws Exception {
        return dao.add(model);
    }`;
    let method_modify = `
    /**
     * 修改
     */
    public int modify(${model_class_name} model) throws Exception {
        model.setModifyDate(new Date());
        return dao.modify(model);
    }`;
    let method_delete = `
    /**
     * 删除
     */
    public int delete(String[] args, String userCode) throws Exception {
        return dao.delete(args, userCode);
    }`;
    let method_queryByCode = `
    /**
     * 通过主键查询
     */
    public ${type_map} queryByCode(String code) throws Exception {
        return dao.queryByCode(code);
    }`;

    let method_queryManage = `
    /**
     * 分页查询
     */
    public ${type_map} queryManage(String sortname, int psize, int page, String sortorder, String[] args) {
        return dao.queryManage(sortname, psize, page, sortorder, args);
    }`;

    let template = `package ${parent_package}.${package_name};
import java.util.Date;
import java.util.Map;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import ${parent_package}.${package_name}.BaseService;
import ${parent_package}.dao.${dao_class_name};
import ${parent_package}.dao.${model_class_name};

@Service
public class ${class_name} extends BaseService {
    @Resource
    private ${dao_class_name} dao;
    ${method_add}
    ${method_modify}
    ${method_delete}
    ${method_queryByCode}
    ${method_queryManage}
}`;
    return template;
};
