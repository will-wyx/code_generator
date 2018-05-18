const {toCamelCase} = require('../utils');
exports.createServiceImpl = (data, parent_package) => {
    let package_name = 'service';
    let table_name = data.table;
    table_name = table_name.split('_').slice('2').join('_');
    let model_class_name = toCamelCase(table_name);
    let dao_class_name = `${model_class_name}Mapper`;
    let service_class_name = `${model_class_name}Service`;
    let class_name = `${model_class_name}ServiceImpl`;
    let type_map = 'Map<String, Object>';
    let type_list = 'List<Map<String, Object>>';

    let methods = `
    @Override
    public ${type_map} baseGetToolbarItems(UserDescriptor user) {
        return getToolbarItemsWithoutBase(user, BUNDLE_MANAGE, readToolbar -> {
            ${type_map} nameTextfield = new HashMap<>();
            nameTextfield.put("xtype", "textfield");
            nameTextfield.put("emptyText", "请输入名称");
            nameTextfield.put("name", "name");
            nameTextfield.put("width", 200);
            readToolbar.add(nameTextfield);

            ${type_map} searchButton = new HashMap<>();
            ${type_map} searchButtonListeners = new HashMap<>();
            searchButton.put("text", "查询");
            searchButton.put("name", "search");
            searchButton.put("disabled", false);
            searchButton.put("reference", "searchButton");
            searchButton.put("iconCls", "btn-search-icon");
            searchButton.put("cls", "btn-search");
            searchButtonListeners.put("click", "search");
            searchButton.put("listeners", searchButtonListeners);
            readToolbar.add(searchButton);

            ${type_map} resetButton = new HashMap<>();
            ${type_map} resetButtonListeners = new HashMap<>();
            resetButton.put("text", "重置");
            resetButton.put("name", "reset");
            resetButton.put("disabled", false);
            resetButton.put("reference", "resetButton");
            resetButton.put("iconCls", "btn-reset-icon");
            resetButton.put("cls", "btn-reset");
            resetButtonListeners.put("click", "reset");
            resetButton.put("listeners", resetButtonListeners);
            readToolbar.add(resetButton);
        }, manageToolBar -> {
            ${type_map} addButton = new HashMap<>();
            ${type_map} addButtonListeners = new HashMap<>();
            addButton.put("text", "新建");
            addButton.put("reference", "addButton");
            addButton.put("disabled", true);
            addButton.put("name", "add");
            addButton.put("iconCls", "btn-add-icon");
            addButton.put("cls", "btn-add");
            addButtonListeners.put("click", "add");
            addButton.put("listeners", addButtonListeners);
            manageToolBar.add(addButton);
        });

    }
    
    @Override
    public ${type_list} baseSetContextMenu(UserDescriptor user) {
        return getContextMenuWithoutBase(userDescriptor, BUNDLE_MANAGE, readMenu -> {
            ${type_map} detailsMenu = new HashMap<>();
            ${type_map} detailsMenuListeners = new HashMap<>();
            detailsMenu.put("text", "查看");
            detailsMenu.put("iconCls", "btn-search-icon");
            detailsMenu.put("cls", "btn-search");
            detailsMenuListeners.put("click", "details");
            detailsMenu.put("listeners", detailsMenuListeners);
            readMenu.add(detailsMenu);
        }, manageMenu -> {
            ${type_map} editMenu = new HashMap<>();
            ${type_map} editMenuListeners = new HashMap<>();
            editMenu.put("text", "编辑");
            editMenu.put("iconCls", "btn-edit-icon");
            editMenu.put("cls", "btn-edit");
            editMenuListeners.put("click", "edit");
            editMenu.put("listeners", editMenuListeners);
            manageMenu.add(editMenu);

            ${type_map} delMenu = new HashMap<>();
            ${type_map} delMenuListeners = new HashMap<>();
            delMenu.put("text", "删除");
            delMenu.put("iconCls", "btn-delete-icon");
            delMenu.put("cls", "btn-delete");
            delMenuListeners.put("click", "del");
            delMenu.put("listeners", delMenuListeners);
            manageMenu.add(delMenu);
        });

    }`;

    let template = `package ${parent_package}.${package_name}.impl;
import com.sunvua.baseinterface.BaseMapper;
import com.sunvua.baseinterface.BaseServiceImpl;
import ${parent_package}.mapper.${dao_class_name};
import ${parent_package}.model.${model_class_name};
import ${parent_package}.service.${service_class_name};
import com.sunvua.security.UserDescriptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ${class_name} extends BaseServiceImpl<${model_class_name}> implements ${service_class_name} {
    @Autowired
    private ${dao_class_name} mapper;
    
    private static final String BUNDLE_MANAGE = "${table_name}_manage";
    
    protected ${class_name}(BaseMapper<${model_class_name}> baseMapper) {
        super(baseMapper);
    }
    
    ${methods}
}`;
    return {file_name: `${class_name}.java`, content: template};
};
