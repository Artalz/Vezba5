const http = require('http');
const url = require('ulr');
const querystring = require('query-string');
let artikli = [
    {
        "id": 1,
        "naziv": Jogurt,
        "cena": 120,
        "imeKompanije": Imlek
    },
    {
        "id": 2,
        "naziv": Mleko,
        "cena": 110,
        "imeKompanije": NekaKomp
    }
];
http.createServer(function (req, res){
    let urlObj = url.parse(req.url,true, false);
    if (req.method == "GET"){
        if (urlObj.pathname == "/svi-artikli"){
            let response = sviArtikli();
            res.write(`
            
            `);
            for(let o of response){
                res.write(`
                
                `);
            }
            res.end(`
            
            `);
        }
        if (urlObj.pathname == "/izmeni-artikal"){
            let art = artikli.find(x => x.id == urlObj.query.id);
            res.write(`
            
            `);
        }
        if (urlObj.pathname == "/dodaj-artikal"){
            res.write(`
            
            `);
        }
    }
    else if (req.method == "POST"){
        if (urlObj.pathname == "/izmeni-artikal"){
            let body = '';
            req.on('data', function(data){
                body += data;
            });
            req.on('end', function(){
                izmeniArtikal(querystring.parse(body).id,querystring.parse(body).naziv,
                querystring.parse(body).cena,querystring.parse(body).imeKompanije)
                res.writeHead(302,{
                    'Location': '/svi-artikli'
                });
                res.end();
            });
        }
        if (urlObj.pathname == "/obrisi-artikal"){
            let body = '';
            req.on('data', function(data){
                body += data;
            });
            req.on('end', function(){
                obrisiArtikal(querystring.parse(body).id)
                res.writeHead(302,{
                    'Location': '/svi-artikli'
                });
                res.end();
            });
        }
        if (urlObj.pathname == "/dodaj-artikal"){
            let body = '';
            req.on('data', function(data){
                body += data;
            });
            req.on('end', function(){
                dodajArtikal(querystring.parse(body).id,querystring.parse(body).naziv,
                querystring.parse(body).cena,querystring.parse(body).imeKompanije)
                res.writeHead(302,{
                    'Location': '/svi-artikli'
                });
                res.end();
            });
        }
    }
}).listen(5000);



function dodajArtikal(id, naziv, cena, imeKompanije){
    let novi = {
        "id": id,
        "naziv": naziv,
        "cena": cena,
        "imeKompanije": imeKompanije
    };
    artikli.push(novi);
}
function sviArtikli(imeKompanije){
    let tmp = [];
    for (let i = 0; i < artikli.length; i++){
        if (artikli[i].imeKompanije == imeKompanije){
            tmp.push(artikli[i]);
            return tmp;
        }
        else{
            return artikli;
        }
    }
}
function obrisiArtikal(id){
    let dlt = [];
    for (let i = 0; i < artikli.length; i++){
        if (artikli[i].id != id){
            dlt.push(artikli[i]);
        }
    }
    artikli = dlt
    return artikli
}
function izmeniArtikal(id, naziv, cena, imeKompanije){
    for (let i = 0; i < artikli.length; i++){
        if (artikli[i].id == id){
            artikli[i].naziv = naziv;
            artikli[i].cena = cena;
            artikli[i].imeKompanije = imeKompanije;
        }
    }
}
function getArtikal(id){
    let get = [];
    for (let i = 0; i < artikli.length; i++){
        if (artikli[i].id == id){
            get.push(artikli[i])
        }
    }
    return get
}