const validateBody = (req,res, next) => {
    const {body} = req;
    if(body.title == undefined) {
        return res.status(400).json({message: "Campo 'titulo' e necessario"});
    }
    if(body.title == "") {
        return res.status(400).json({message: "O campo titulo nao pode ser vazio"});
    }
    next();
}

module.exports = {
    validateBody
}