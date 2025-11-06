import loader from "./express.js";

const init = () => {
    //init express
    //init dbConnection(mongoose)
    const expressApp = loader();
    return { expressApp };
}

const { expressApp } = init();

export default expressApp;