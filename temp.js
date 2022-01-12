var data = {" name": " test ", "age": 25, 'detail':{'distance': '25a '}};
// data=JSON.stringify(data);

function sol(obj){
    for (let x in obj) {

        if(typeof myObject === 'object'){
            obj[x]=sol(obj[x]);
        }
        else if(obj[x][0]===" "){
            obj[x]=obj[x].subString(1);
        }
        
    }
}

sol(data)

console.log(data);