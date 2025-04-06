const {Router} = require('express')
const indexController = require('../controllers/indexController');
const indexRouter = Router();

indexRouter.get('/', indexController.indexGet)
indexRouter.get('/:ballo/img', indexController.balloImgGet)
indexRouter.get('/new', indexController.newGet)
indexRouter.post('/new', indexController.newPost)
indexRouter.get('/:ballo', indexController.balloGet)
indexRouter.get('/:ballo/:passo', indexController.changePassoGet)
indexRouter.post('/:ballo/:passo', indexController.changePassoPost)
indexRouter.get('/:ballo/:passo/variazioni', indexController.changeVariazioniGet)
indexRouter.post('/:ballo/:passo/variazioni', indexController.changeVariazioniPost)
indexRouter.get('/:ballo/:passo/:progresso/:cifro', indexController.changeProgressoGet)
indexRouter.post('/:ballo/:passo/:progresso/', indexController.changeProgressoPost)
// indexRouter.post('/:ballo/delete', indexController.indexGet)



module.exports = indexRouter

