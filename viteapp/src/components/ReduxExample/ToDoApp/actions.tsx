const addToDo = (text: string) => {
    return {
        type: "ADD_TASK",
        playload: {
            id: new Date().getTime(),
            text: text,
        },
    };
};
const modifyToDo = (text: string) => {
    return {
        type: "MODIFY_TASK",
        playload: {

        },
    }
};
const FindToDo = () => {
    return {
        type: "FIND_TASK",
        playload: {

        },
    }
};
const DelectToDo = () => {
    return {
        type: "DELECT_TASK",
        playload: id,
    }
};

export { addToDo, modifyToDo, FindToDo, DelectToDo }