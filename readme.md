app.get -> router.get
npx nodemon filename -> npx nodemon

* * Express Js Setup * *

Install

Express js boilerplate code
        go to npm
        search express
        copy the code

express js ejs setup
        install ejs
        set view engine
        create views folder
        create ejs files
        render ejs files inside route

express static files setup

architecture of public folder


in the terminal
1. npm i express
2. npm i ejs
3. npx nodemon .\script.js (for starting the server)

hum logo ko kaafi saara kaam karna padta hai express setup krne mein iska matlab har
baar jab hum naya project banaayega to har baar fir se utna hi kaam krna padega, 
matlab ki poora code likho and sab kichh setup karo, is time ko bacha sakte ho with 
help of express generator, use express generator and it will make the folder structure
for you and it will also write the basic code for the project


express generator ek folder bana ke deta hai, jiska matlab aapko khodse folder nahi 
banana hai, to express gen saare files ko isis folder mein daal ke dega
-------------------------------------------------------------------------------------

* * Steps to use Express Generator 

sabse pahle jeevan mein ek baar laptop par install karo globally
npm i express-generator -g

too create new app anywhere:
open cmd move to desktop 
create new app:
express appname --view=ejs
(npx express-generator --view=ejs my-app
cd my-app
npm install
npm start)

now use three commands
1. cd appname
2. npm i
3. open it on vs code => code .

ejs setup karne ke liye
   1) ejs install -> npm i ejs 
   2) configure ejs -> app.set("view engine", "ejs");
   3) ek views folder banao
   4) usmein ejs files banao
   5) send ki jagah render karo => render karte waqt make sure aap views folder ke 
                                 andar waali hi koi file kaa naam likhein, aur render function me ejs mention naa 
                                 karein
-------------------------------------------------------------------------------------

* * Data Base 

har naye app ka data store hoga storage mein, par usey directly rakne ki jagah ek container mein rakhege, us container
mein sirf us app ka data aayega

1) ek app ka poora data -> db
2) ek app mein variety of data hota hai par poora data hota app ka hi hai, par us   data ka sub category kehlaata hai 
   collection
3) collection matlab ki bola users ka data, ek user pe baat kri to hua document

install mongodb -> from the chrome
install mongoosejs -> npm i mongoose
require and setup connection -> const mongoose = require("mongoose");
                                mongoose.connect("mongodb://127.0.0.1:27017/dbname")
make schema -> schema matlab aapko ye batana banne waala har document mein 
               const userschema = mongoose.Schema({
                  username: string,
                  name: string,
                  age: number,
               })
create model and export -> module.exports = mongoose.model("user", userschema);


sessions =>
express-session install -> npm i express-session
create -> req.session.koibhinaam = koibhinaam;
read -> req.session.koibhinaam
delete -> req.session.destroy

cookie =>
cookie setup -> res.cookie("name", value);
cookie reading -> req.cookie.name
cookie delete -> res.clearCookie("name");
-------------------------------------------------------------------------------------

* * Flash Message

jab bhi app kisi ejs page ko dekhege waha par aapko kisi prakaar ka koi information
dena hai, wo kehlata hai flash message, they are more like good looking alerts, waring and description

1) install connect-flash -> npm i connect-flash
2) make sure you setup express-session
   app.js -> 6 line   -> const flash = require('connect-flash');
             18 line  -> app.use(flash());
3) make sure you put connect flash in a app.use function
   index.js -> add , {error: req.flash('error')} in the router.get "/login"
               add failureFlash: true, in the router.post "/login"
4) kisi bhi route mein aap ko flash create karna hai
5) kisi bhi doosre route par app use chalane ka try karein

AAP CONNECT FLASH KO USE NAHI KR SKTE BINA EXPRESS session

flash message ka matlab server ke kisi route mein koi data banana and us data ko doosre route kar paana
-------------------------------------------------------------------------------------

* * Intermediate mongodb 

mongoose ko setup karo
-------------------------------------------------------------------------------------
* * data association

ek model se doosre model ke data ko jod dena id ke through, matlab ki agar aap ke paas ek user hai to wo post bnaayega hi, jab post banega to wo user ke dwaara hi banega, to hum kya karte hai jab do aise data aapas mein closely related hote hai to hum dono kio jod dete hai, ki ek model ke bane huye data ki id ko doosre model ke data ko dedete hai aur is model ke data ki pichhle model ke data ko dedete hai