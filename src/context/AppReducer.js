export default (state, action) => {
    switch (action.type) {
        case 'SET_ANSWER':
            return {
                ...state,
                data: state.data.map((item) => {
                    if (item.id === action.payload.id) {
                        return action.payload;
                    }
                    return item;
                }),
            };  
        default:
            return state;
    }
}