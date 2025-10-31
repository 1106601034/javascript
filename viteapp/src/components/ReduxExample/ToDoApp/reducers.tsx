const initialState = {
    tasks: []
};

const taskReducers = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return {

            }
        case "MODIFY_TASK":
            return {

            }
        case "FIND_TASK":
            return {

            }
        case "DELECT_TASK":
            return {

            }
        default:
            return state;
    }
}

export default taskReducers;