/* jshint esversion: 6 */
const json = require('./tileset.json');
const saveTilesetJson = require('./lib/saveTilesetJson');
var path = __dirname;
var lasTreePath = path + '\\Data\\';
var obj = json.root;
var s;
// var file='E:\\qtlas\\Data\\tileset.json';

// function getFileSize(filePath)     
// {     
//     var fso = new ActiveXObject("Scripting.FileSystemObject");     
//     console.log("文件大小为："+fso.GetFile(filePath).size);     
// }  

// var size=getFileSize(file);
// var s;
var getjson = function (parent_json) {
        var childrenjson=parent_json.children;
        for (k = 0; k < childrenjson.length; k++) {        
                var childjson = {};
                var asset = {};
                asset.version = '0.0';
                childjson.asset = asset;
                // childjson.refine='ADD';
                childjson.geometricError = childrenjson[k].geometricError;
                childjson.root = childrenjson[k];
                childjson.root.refine = 'replace';
                var name = childrenjson[k].content.url;
                var s=name;
                var index = name .lastIndexOf("\/");  
                var url= name.substring(index + 1,name.length);   
                // childjson.root.content.url=url; 
                // var url=name;                                 
                name = 'Data\\'+url.substring(0, url.length - 4) + 'json';
                url=url.substring(0, url.length - 4) + 'json';
                saveTilesetJson(name, childjson, true);
              childrenjson[k].content.url =url;
              delete childrenjson[k].refine;
              delete childrenjson[k].children;
        }

        saveTilesetJson(path + '\\final.json', json, true);
    }
var start = new Date().getTime();
getjson(obj);
var end = new Date().getTime();
console.log("总耗时" + (end - start) / 1000 + "秒。");

function maxjsonsize(file) {
}





