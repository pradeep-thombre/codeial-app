var num1=10;

console.log("num1 outside",num1);

function sum(){
    
    var num2=9;
    console.log("num1 outside",num1);
}

abc={
    _par1:"abc",
    par2:"xyz"
}

a={...abc,
    par3:"cux"
}


abc[par1]
abc._par1

sum();

if(true){
    var num3=20;
    const num4=34;
    let num5=80;
}