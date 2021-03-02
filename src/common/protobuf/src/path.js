var path=module.exports;var isAbsolute=path.isAbsolute=function isAbsolute(path){return/^(?:\/|\w+:)/.test(path)};var normalize=path.normalize=function normalize(path){path=path.replace(/\\/g,"/").replace(/\/{2,}/g,"/");var parts=path.split("/"),absolute=isAbsolute(path),prefix="";if(absolute)prefix=parts.shift()+"/";for(var i=0;i<parts.length;){if(parts[i]===".."){if(i>0&&parts[i-1]!=="..")parts.splice(--i,2);else if(absolute)parts.splice(i,1);else++i}else if(parts[i]===".")parts.splice(i,1);else++i}return prefix+parts.join("/")};path.resolve=function resolve(originPath,includePath,alreadyNormalized){if(!alreadyNormalized)includePath=normalize(includePath);if(isAbsolute(includePath))return includePath;if(!alreadyNormalized)originPath=normalize(originPath);return(originPath=originPath.replace(/(?:\/|^)[^/]+$/,"")).length?normalize(originPath+"/"+includePath):includePath};