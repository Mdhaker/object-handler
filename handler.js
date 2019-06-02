/**
 * 
 * @param {object} targetObject the receiver object 
 * @param {object} sourceObject the object to be cloned
 */
var deepAssign = (targetObject,sourceObject)=>{
    if(typeof targetObject =='object' && typeof sourceObject == 'object')
        {
            let objectToReturn = targetObject;
           // let sameKeys  = Object.keys(sourceObject).filter(x => Object.keys(targetObject).includes(x));
          //  let newKeys  = Object.keys(sourceObject).filter(x => !Object.keys(targetObject).includes(x));
            // handling samepath key
            Object.keys(sourceObject).forEach( (key,index) => {
                if(typeof sourceObject[key] =='object' && typeof targetObject[key] == 'object')
                    {

                        objectToReturn[key] = deepAssign(targetObject[key],sourceObject[key]);
                    }
                else
                    {
                        objectToReturn[key] = sourceObject[key];
                    }
                    
            } )
                return objectToReturn;
        }
    else
        return targetObject;
   
}
/**
 * Function takes a path like "x.y.z" and return object["x"]["y"]["z"]
 * @param {object} object target object to get the value from by path
 * @param {string} path target path of the value
 */
var getValueByPath = (object,path)=>{
    debugger
    (path.split(".")).forEach( (key)=>{
        if(!object || !object[key])
            {
                object = null;
                return null;
            }
           
        else
            object = object[key];
    })
    return object;
}

/**
 * takes a path and value and return an object containig a deep structure described by the path and have the input value
 * @param {String} path 
 * @param {Number} value 
 */
var setObjectValueByPath = (object,path,value) =>
    {
        let objectToCreate = {};
        let keys = path.split(".");
         keys = keys.reverse();
        keys.forEach( (key,index)=>{
            if(index ==0)
                objectToCreate[key] = value;
            else
                {
                    let oldObj = objectToCreate;
                    objectToCreate = {};
                    objectToCreate[key] = oldObj;
                }
        })
        if(Object.keys(object).length > 0)
            objectToCreate = deepAssign(object,objectToCreate);
        return objectToCreate;
    }
/**
 *  takes an object and return all its values maped by the path
 * @param {object} object object to map
 */
var mapObject = (object,rootPath="")=>{
    let resultObject = {};
    debugger
    Object.keys(object).forEach( (key,index) => {
        let path = rootPath ? `${rootPath}.${key}`:key;
        if(typeof object[key] =='object' && !(object[key] instanceof Date) && !ObjectID.isValid(object[key]) && !(object[key] instanceof Array))
            {
                
                resultObject = Object.assign(resultObject,mapObject(object[key],path));
            }
        else
            {
                resultObject[`${path}`] = object[key];
            }
            
    } )
        return resultObject;
}
/**
 * the undo of mapObject
 * @param {*} object object to unMap
 */
var unMapObject = (object) =>
    {
        debugger
        let objectToReturn = setObjectValueByPath({}, Object.keys(object)[0], object[Object.keys(object)[0]]);
        Object.keys(object).forEach( (key,index)=>{
            if(index > 0)
                {
                    objectToReturn = setObjectValueByPath(objectToReturn,key,object[key]);
                }
        } )
        return objectToReturn;
    }
/**
 * summing numeric values of second object to the first
 * @param {object} object1 will be returned object with new values
 * @param {object} object2 object to get values from
 */
var sumObjects = (object1,object2)=>
    {
        debugger
        object1=mapObject(object1);object2=mapObject(object2);
        Object.keys(object1).forEach( (key) =>{
            if( Number.isFinite( object1[key]) &&  Number.isFinite( object2[key]))
                {
                    object1[key] = object1[key] + object2[key];
                }
        })
        return unMapObject(object1);
    }
/**
 * summing numeric values of second object to the first by objects paths
 * @param {*} object1 first object that will hold the result 
 * @param {*} object2 second object
 * @param {*} paths array of objects containing objects of two fields holding the path of each object
 */
var sumObjectsByPaths = (object1,object2,paths) =>{
    object1=mapObject(object1);object2=mapObject(object2);
    paths.forEach(path=>{
        if( Number.isFinite( object1[path.object1]) &&  Number.isFinite( object2[path.object2]))
                {
                    object1[path.object1] = object1[path.object1] + object2[path.object2];
                }
    })
    return unMapObject(object1);
}
module.exports = {
    getValueByPath,
    setObjectValueByPath,
    deepAssign,
    sumObjects,
    mapObject,
    unMapObject
}

