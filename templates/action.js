const {toCamelCase, getPrefix} = require('../utils');
exports.createAction = (data, parent_package) => {
    let table_name = data.table;
    table_name = table_name.split('_').slice('2').join('_');
    let model_class_name = toCamelCase(table_name) || '';
    let service_class_name = `${model_class_name}Service`;
    let class_name = `${model_class_name}Controller`;
    let type_map = 'Map<String, Object>';
    let type_list_map = 'List<Map<String, String>>';
    let type_list = `List<${model_class_name}>`;

    let prefix = 'amili';
    let path = model_class_name.toLowerCase();
    let url = `/${prefix}/${path}`;

    let methods = `
    @RequestMapping(value="/list")
    @ActionDescription(name = "", permission = "read")
    public JsonResult list(HttpServletRequest request) {
        ${type_list_map} filters = parsePageRequest(request);
        type_list list = service.baseFindAllByFilter(filters);
        PageInfo pageInfo = new PageInfo(list);
        long total = pageInfo.getTotal();
        JsonResult result = this.JsonResult(true, null, pageInfo.getList(), total);
        return result;
    }
    
    @RequestMapping(value="/listToolbar")
    @ActionDescription(name = "", permission = "read")
    public ${type_map} listToolbar(HttpSession session) {
        UserDescriptor userDescriptor = (UserDescriptor) session.getAttribute("user");
        return service.baseGetToolbarItems(userDescriptor);
    }
    
    @RequestMapping(value="/menu")
    @ActionDescription(name = "", permission = "read")
    public ${type_list_map} contextMenu(HttpSession session) {
        UserDescriptor userDescriptor = (UserDescriptor) session.getAttribute("user");
        return service.baseGetContextMenu(userDescriptor);
    }
    
    @RequestMapping(value="/get")
    @ActionDescription(name = "", permission = "read")
    public JsonResult getById(String id) {
        return JsonResult(true, "获取数据成功", service.baseFindById(id));
    }
    
    @RequestMapping(value="/save")
    @ActionDescription(name = "", permission = "manage")
    public JsonResult save(@RequestBody ${model_class_name} entity) {
        boolean success = service.baseSave(entity);
        return JsonResult(success, success ? "添加成功" : "添加失败");
    }
    
    @RequestMapping(value="/update")
    @ActionDescription(name = "", permission = "manage")
    public JsonResult update(@RequestBody ${model_class_name} entity) {
        boolean success = service.baseUpdate(entity);
        return JsonResult(success, success ? "更新成功" : "更新失败");
    }
    
    @RequestMapping(value="/delete")
    @ActionDescription(name = "", permission = "manage")
    public JsonResult update(String id) {
        boolean success = service.baseDeleteById(id);
        return JsonResult(success, success ? "删除成功" : "删除失败");
    }
    `;

    let template = `package ${parent_package};
import com.github.pagehelper.PageInfo;
import com.sunvua.annotation.ActionDescription;
import com.sunvua.baseinterface.BaseController;
import ${parent_package}.model.${model_class_name};
import ${parent_package}.service.${service_class_name};
import com.sunvua.extend.result.JsonResult;
import com.sunvua.security.UserDescriptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value="${url}")
public class ${class_name} implements BaseController {
    @Autowired
    private ${service_class_name} service;

    ${methods}
}
    `;
    return {file_name: `${class_name}.java`, content: template};
};