import fetch from "node-fetch";

const routeHello = () => "Hello World!";

const routeAPINames = async (url) => {
    let data;
    try {
        const url = 'https://www.usemodernfullstack.dev/api/v1/users';
        const response = await fetch(url);
        data = await response.json();
    } catch (error) {
        console.log(error);
    }
    const names = data.map((item) => `<li>${item.id}. ${item.name}</li>`).join("<br>");
    return names;
};

export {
    routeHello,
    routeAPINames,
};