const reducer = (state, action) => {
    const {type} = action;
    switch (type) {
        case 'SET_DB':
            return {
                ...state,
                database: {
                    name: action.data.database,
                    tables: action.data.tables
                }
            };
        case 'SELECT_TABLE':
            return {
                ...state,
                table: {
                    ...state.table,
                    name: action.current_table
                }
            };
        case 'UPDATE_COLUMNS':
            return {
                ...state,
                table: {
                    ...state.table,
                    columns: action.columns
                }
            };
        default:
            return state;
    }
};

export default reducer;