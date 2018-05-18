const {toCamelCase} = require('../utils');
exports.createDao = (data, parent_package) => {
    let table_name = data.table;
    table_name = table_name.split('_').slice('2').join('_');
    let model_class_name = toCamelCase(table_name);
    let class_name = `${model_class_name}Mapper`;

    let template = `package ${parent_package}.mapper;
import com.sunvua.baseinterface.BaseMapper;
import ${parent_package}.model.${model_class_name};
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface ${class_name} extends BaseMapper<${model_class_name}> {
}`;
    return {file_name: `${class_name}.java`, content: template};
};
