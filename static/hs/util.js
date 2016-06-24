/**
 * Created by stanley_q on 16/6/22.
 */

function uniform_obj_array(objOrArray){
    if(objOrArray instanceof Array){
        return objOrArray;
    }else{
        return [objOrArray];
    }
};