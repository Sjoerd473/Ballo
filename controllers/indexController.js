const db = require('../db/queries');

async function indexGet(req,res){

    const balli = await db.getBalli()

    res.render('index', {balli:balli})

}

async function balloGet(req,res){
    const passi = await db.getPassi(req.params.ballo)
    const variazioni = await db.getVariazioni(req.params.ballo)

    res.render('ballo', {ballo:req.params.ballo, passi:passi, variazioni:variazioni})
}

async function balloImgGet(req,res){

    const ballo = await db.getBallo(req.params.ballo)

    res.render('balloInfo', {ballo:ballo})
}

async function changePassoGet(req, res){
   
    const passo = await db.getPasso(req.params.passo)
    
    res.render('balloForm', {ballo:req.params.ballo, passo:passo})
}
async function changePassoPost(req, res){
    const id = await db.getPassoId(req.params.passo, req.params.ballo)
   console.log(req.body.stile)
    await db.updatePasso(req.body.passo, id[0].passo_id)
    await db.updatePassoProgresso(Number(req.body.imparato), Number(req.body.posizione), Number(req.body.tempo),Number(req.body.guida) ,Number(req.body.stile), Number(req.body.pc), id[0].passo_id)

    res.redirect(`/${req.params.ballo}`)
}

async function changeVariazioniGet(req,res){
    const id = await db.getPassoId(req.params.passo, req.params.ballo)
    const variazioni = await db.getVariazioni(req.params.ballo)

    res.render('varForm', {variazioni:variazioni, passo:req.params.passo, ballo:req.params.ballo, id:id} )

}
async function changeVariazioniPost(req,res){
    const id = await db.getPassoId(req.params.passo, req.params.ballo)
    

    await db.updateVariazioni(req.body.varia)

    res.redirect(`/${req.params.ballo}`)
}

async function changeProgressoGet (req,res) {
    const id = await db.getPassoId(req.params.passo, req.params.ballo)
    
    
  
 
    res.render('progressoForm', {progresso:req.params.progresso, cifro:req.params.cifro, ballo:req.params.ballo, passo: req.params.passo})
}

async function changeProgressoPost(req,res){
    const id = await db.getPassoId(req.params.passo, req.params.ballo)
    

    await db.updatePassoProgresso(req.params.progresso, req.body.imparato, id[0].passo_id )

    res.redirect(`/${req.params.ballo}`)
}

async function newGet(req,res){

    res.render('new')
}

async function newPost(req,res){
    console.log(req.body.ballo)
    console.log(req.body.passo)
    console.log(req.body.variazione)
    res.redirect('/')
}

module.exports ={
    indexGet,
    balloGet,
    changePassoGet,
    changePassoPost,
    changeVariazioniGet,
    changeVariazioniPost,
    changeProgressoGet,
    changeProgressoPost,
    newGet,
    newPost,
    balloImgGet
}