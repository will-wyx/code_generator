const {toCamelCase, getPrefix} = require('../utils');
exports.createAction = (data, parent_package) => {
    let package_name = 'action';
    let table_name = data.table;
    let model_class_name = toCamelCase(table_name) || '';
    // let dao_class_name = `${model_class_name}DaoImpl`;
    let service_class_name = `${model_class_name}ServiceImpl`;
    let class_name = `${model_class_name}Action`;
    let type_map = 'Map<String, Object>';

    let prefix = getPrefix(table_name);
    let path = model_class_name.toLowerCase();
    let url = `/${prefix}/${path}`;

    let page_load = `
    /**
     * 加载新增页面
     */
    @RequestMapping(value="/addLoad")
    public ModelAndView addLoad() {
        ${type_map} vdata = new HashMap<>();
        vdata.put("url", "${url}/add");
        return new ModelAndView("${url}/info", "vdata", vdata);
    }
    
    /**
     * 加载修改页面
     */
    @RequestMapping(value="/modifyLoad")
    public ModelAndView modifyLoad(String code) {
        ${type_map} vdata = new HashMap<>();
        try {
            ${type_map} map = service.queryByCode(code);
            vdata.put("url", "${url}/modify");
            vdata.put("map", map);
        } catch (Exception e) {
            logger.error("error", e);
        }
        return new ModelAndView("${url}/info", "vdata", vdata);
    }
    
    /**
     * 加载详细页面
     */
    @RequestMapping(value="/infoSee")
    public ModelAndView infoSee(String code) {
        ${type_map} vdata = new HashMap<>();
        try {
            ${type_map} map = service.queryByCode(code);
            vdata.put("map", map);
        } catch (Exception e) {
            logger.error("error", e);
        }
        return new ModelAndView("${url}/infoSee", "vdata", vdata);
    }
    
    /**
     * 加载管理页面
     */
    @RequestMapping(value="/manageLoad")
    public ModelAndView manageLoad() {
        return new ModelAndView("${url}/manage");
    }
    `;

    let methods = `
    /**
     * 新增
     */
    @ResponseBody
    @RequestMapping(value="/add")
    public ActionMessage add(${model_class_name} model) {
        SessionModel session = MySession.getInfo();
        model.setCreatedBy(session.getCODE());
        try {
            int count = service.add(model);
            return new ActionMessage(count > 0);
        } catch (Exception e) {
            logger.error("error", e);
            return new ActionMessage(false).setError();
        }
    }
    
    /**
     * 修改
     */
    @ResponseBody
    @RequestMapping(value="/modify")
    public ActionMessage modify(${model_class_name} model) {
        SessionModel session = MySession.getInfo();
        model.setModifyBy(session.getCODE());
        try {
            int count = service.modify(model);
            return new ActionMessage(count > 0);
        } catch (Exception e) {
            logger.error("error", e);
            return new ActionMessage(false).setinfo(e.getMessage());
        }
    }
    
    /**
     * 通过主键查询
     */
    @ResponseBody
    @RequestMapping(value="/queryByCode")
    public ${type_map} queryByCode(String code) {
        try {
            ${type_map} result = service.queryByCode(code);
            return result;
        } catch (Exception e) {
            logger.error("error", e);
            return null;
        }
    }
    
    /**
     * 删除
     */
    @ResponseBody
    @RequestMapping(value="/delete")
    public ActionMessage delete(String[] codes) {
        SessionModel session = MySession.getInfo();
        String userCode = session.getCODE();
        try {
            int count = service.delete(codes, userCode);
            return new ActionMessage(count > 0);
        } catch (Exception e) {
            logger.error("error", e);
            return new ActionMessage(false).setinfo(e.getMessage());
        }
    }
    
    /**
     * 分页查询
     */
    @ResponseBody
    @RequestMapping(value="/queryManage")
    public ${type_map} queryManage(int page, int rows, String sort, String order, String[] args) {
        try {
            ${type_map} result = service.queryManage(sort, rows, page, order, args);
            return result;
        } catch (Exception e) {
            logger.error("error", e);
            return null;
        }
    }
    `;

    let template = `package ${parent_package}.${package_name}.${prefix};
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import ${parent_package}.${package_name}.BaseAction;
import ${parent_package}.model.ActionMessage;
import ${parent_package}.model.SessionModel;
import ${parent_package}.model.${model_class_name};
import ${parent_package}.service.${service_class_name};
import ${parent_package}.util.MySession;

@Controller
@RequestMapping(value="${url}")
public class ${class_name} extends BaseAction {
    private Logger logger = Logger.getLogger(${class_name}.class);
    @Resource
    private ${service_class_name} service;
    ${page_load}
    ${methods}
}
    `;
    return {file_name: `${class_name}.java`, content: template};
};