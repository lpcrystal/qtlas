/* jshint esversion: 6 */
const json = require('./finaljson2.json');
const saveTilesetJson = require('./lib/saveTilesetJson');
var path = __dirname;
var lasTreePath = path + '\\output\\';
var obj = json.root;

var file='E:\\qtlas\\finaljson2.json';

// function getFileSize(filePath)     
// {     
//     var fso = new ActiveXObject("Scripting.FileSystemObject");     
//     console.log("文件大小为："+fso.GetFile(filePath).size);     
// }  

// var size=getFileSize(file);
var s;
var getjson = function (parent_json) {
    if (parent_json.children) {
        var tmpjson = parent_json.children;
        for (i = 0; i < tmpjson.length; i++) {
            var tmpchildren = tmpjson[i].children;
            if (tmpchildren) {
                for (j = 0; j < tmpchildren.length; j++) {
                    var cjson = tmpchildren[j].children;
                    if (cjson) {
                        for (l = 0; l < cjson.length; l++) {
                            var childrenjson = cjson[l].children;
                            if (childrenjson) {
                                for (k = 0; k < childrenjson.length; k++) {
                                    if (childrenjson[k].children) {
                                        var childjson = {};
                                        var asset = {};
                                        asset.version = '0.0';
                                        childjson.asset = asset;
                                        // childjson.refine='ADD';
                                        childjson.geometricError = childrenjson[k].geometricError;
                                        childjson.root = childrenjson[k];
                                        childjson.root.refine = 'ADD';
                                        var name = childrenjson[k].content.url;
                                        name = name.substring(0, name.length - 4) + 'json';
                                        saveTilesetJson(name, childjson, true);
                                        childrenjson[k].content.url = name;
                                        delete childrenjson[k].refine;
                                        delete childrenjson[k].children;
                                    }
                                }
                            }

                        }
                    }
                }
            }
        }

        // saveTilesetJson(path + '\\final.json', json, true);
        saveTilesetJson(lasTreePath+ 'final.json', json, true);
    }
}
var start = new Date().getTime();
getjson(obj);
var end = new Date().getTime();
console.log("总耗时" + (end - start) / 1000 + "秒。") ;

function maxjsonsize(file){
 

}





