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
        //  setTimeout(10000)
     });

    it('should be able to add all greeted users', async function(){
        // await db.none('Delete FROM GreetingNames')
        const dbFunction = DbFunction(db)
        await dbFunction.greets('zethu')
        await dbFunction.greets('linda')
s
        assert.equal(false, await dbFunction.nameGreeted('mbali'))
        assert.equal(false, await dbFunction.nameGreeted('khanya'))
});

   it('should be able to add all greeted users', async function(){
        // await db.none('Delete FROM GreetingNames')
        const dbFunction = DbFunction(db)
        await  dbFunction.greets('mbali')
        await  dbFunction.greets('khanya')

        assert.equal(false, await dbFunction.nameGreeted('ayanda'))
        assert.equal(false, await dbFunction.nameGreeted('kay'))
});

it('should be able to check if the user has been greeted', async function(){
        // await db.none('Delete FROM GreetingNames')
        const dbFunction = DbFunction(db)
        await  dbFunction.greets('mbali')
        await  dbFunction.greets('khanya')
    

        let names=await dbFunction.nameGreeted('mbali') 
        console.log(names)
            assert.equal(true, await dbFunction.nameGreeted('mbali'))
           assert.equal(false, await dbFunction.nameGreeted('kay'))
});

it('should be able to check how many times a user has been greeted', async function(){
        // await db.none('Delete FROM GreetingNames')
        const dbFunction = DbFunction(db)
        await  dbFunction.greets('sbo')
        let kay= await dbFunction.getUserCounter('sbo')
        console.log(kay+"userCounter")
      
        assert.equal(1,await dbFunction.getUserCounter('sbo'))
        
});
it('should be able to check how many times all user has been greeted', async function(){
        // await db.none('Delete FROM GreetingNames')
        const dbFunction = DbFunction(db)
        await  dbFunction.greets('mxo') 
        await  dbFunction.greets('kay')
        let counting= await dbFunction.getCounter()
        console.log(counting)
        assert.equal(2, await dbFunction.getCounter())
        // assert.equal(1, await dbFunction.getUserCounter('khanya'))
});

// it('resolves', (done) => {
//             fooAsyncPromise(arg1, arg2).then((res, body) => {
//                 expect(res.statusCode).equal(incorrectValue);
//                 done();
//             }).catch(done);
//          });

    after(function(){
    db.$pool.end()
});
 });
