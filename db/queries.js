const pool = require("./pool");

async function getBalli(){
const {rows} = await pool.query('SELECT ballo,stile,img FROM balli WHERE scelto = true')

return rows
}

async function getBallo(ballo){
    const {rows} = await pool.query('SELECT * FROM balli WHERE ballo LIKE ($1)', [ballo])
    return rows
}
async function getPassi(ballo){
const {rows} = await pool.query(`
    SELECT *
    FROM balli JOIN passi on id = passi.ballo_id 
    WHERE ballo LIKE ($1)
     ORDER BY passi.passo_id`, [ballo])
     return rows
}

async function getVariazioni(ballo){
const {rows} = await pool.query(`SELECT variazione, variazioni.passo_id, variazioni.imparato,var_id
    FROM variazioni JOIN passi on variazioni.passo_id = passi.passo_id
    JOIN balli ON passi.ballo_id = balli.id
    WHERE ballo LIKE ($1)  
    `, [ballo])

    return rows
}

async function getPasso(passo){
    const {rows} = await pool.query(`SELECT * FROM passi WHERE passo LIKE ($1)`, [passo])
  
    return rows
}

async function getPassoId(passo, ballo){
    const {rows} = await pool.query('SELECT passo_id FROM passi JOIN balli ON passi.ballo_id = id WHERE passo LIKE ($1) AND ballo LIKE ($2) ', [passo,ballo])
    return rows
}

async function getPassoProgresso(progresso, passoId){
  
    const {rows} = await pool.query(`SELECT ${progresso} FROM passi WHERE passi.passo_id = ($1)`, [ passoId])

    return rows
}

async function updatePasso(conoscenza, passoId){
    await pool.query('UPDATE passi SET conoscenza = ($1) WHERE passi.passo_id = ($2)', [conoscenza, passoId])
}

// async function updatePassoProgresso(imp, pp, temp, gr, s, c, id){
//     await pool.query(`UPDATE passi SET
//          imparato = ($1),
//          piedi = ($2),
//          tempo = ($3),
//          guida = ($4),
//          stile = ($5),
//          checked = ($6)
//          WHERE passi.passo_id = ($7)
//           `, [imp, pp, temp, gr, s, c, id])

// }

async function updatePassoProgresso(progresso, valore, id){
  
    await pool.query(`UPDATE passi SET
       ${progresso} = ($1)
       WHERE passo_id = ($2) `, [ valore, id])
}

async function updateVariazioni(variazioni){
    if(!variazioni)
    {return;}
    else if(typeof(variazioni) === 'string'){          
      await pool.query(`UPDATE variazioni SET
            imparato = true
            WHERE var_id = ($1)`, [variazioni]);
} else{
    await variazioni.forEach(variazione => {
        console.log(variazione)
         pool.query(`UPDATE variazioni SET
            imparato = true
            WHERE var_id = ($1)`, [variazione])
        
    });
}
}


module.exports ={
    getBalli,
    getBallo,
    getPassi,
    getVariazioni,
    getPasso,
    getPassoId,
    getPassoProgresso,
    updatePasso,
    updatePassoProgresso,
    updateVariazioni
}