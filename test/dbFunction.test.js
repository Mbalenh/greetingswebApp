const assert = require('assert');
const pgp = require('pg-promise')();
const DbFunction = require("../db/DbFunction")

const DATABASE_URL= process.env.DATABASE_URL ||'postgres://dcizjcmy:p8wTJ3o5rpKJi2r12VBO0obH1DAyjPi5@surus.db.elephantsql.com/dcizjcmy'
const config = { 
  connectionString : DATABASE_URL
}

if (process.env.NODE_ENV == 'production') {
  config.ssl = { 
    rejectUnauthorized : false
  }
}

const db = pgp(config)

describe('The greeting app', function(){

    beforeEach(async function(){
        // clean the tables before each test run
         await db.none('Delete FROM GreetingNames')
     })
    it('should be able to add all greeted users', async function(){
    	const dbFunction = DbFunction(db)
    	await dbFunction.greets('mbali')
    	await dbFunction.greets('khanya')

    	assert.equal(true, await dbFunction.nameGreeted('mbali'))
    	assert.equal(false, await dbFunction.nameGreeted('kay'))
})

   it('should be able to add all greeted users', async function(){
    	const dbFunction = DbFunction(db)
    	await  dbFunction.greets('mbali')
    	await  dbFunction.greets('khanya')

    	assert.equal(false, await dbFunction.nameGreeted('ayanda'))
    	assert.equal(false, await dbFunction.nameGreeted('kay'))
})

it('should be able to check if the user has been greeted', async function(){
    	const dbFunction = DbFunction(db)
    	await  dbFunction.greets('mbali')
    	await  dbFunction.greets('khanya')
    

        let names=await dbFunction.nameGreeted('mbali') 
        console.log(names)
          	assert.equal(true, await dbFunction.nameGreeted('mbali'))
    	assert.equal(false, await dbFunction.nameGreeted('kay'))
})

it('should be able to check how many times a user has been greeted', async function(){
    	const dbFunction = DbFunction(db)
    	await  dbFunction.greets('mbali')
    	await  dbFunction.greets('mbali')
    	await  dbFunction.greets('mbali')
    	await  dbFunction.greets('khanya')
        // await dbFunction.getUserCounter('khanya')
        
    	assert.equal(1, await dbFunction.getUserCounter('khanya'))
    	
})
it('should be able to check how many times all user has been greeted', async function(){
    	const dbFunction = DbFunction(db)
    	await  dbFunction.greets('mbali')
    	// await  dbFunction.greets('mbali')
    	// await  dbFunction.greets('mbali') 
    	await  dbFunction.greets('khanya')

    	assert.equal(2, await dbFunction.getCounter())
    	// assert.equal(1, await dbFunction.getUserCounter('khanya'))
})
})