export const select_table = (current_table) => {
    return {
        type: 'SELECT_TABLE',
        current_table
    }
};

export const set_db = (data) => {
    return {
        type: 'SET_DB',
        data
    }
};

export const update_columns = (columns) => {
    return {
        type: 'UPDATE_COLUMNS',
        columns
    }
};
