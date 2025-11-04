const PageNotFound = (req, res) => {
    res.send("404 Page Not Found.");
    res.status(404);
};

export default PageNotFound;
