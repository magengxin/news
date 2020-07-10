export  function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 


export  function getIEMI() {
    let r1 = Math.floor(Math.random() * 9000000) + 1000000;
    let r2 = Math.floor(Math.random() * 9000000) + 1000000;
    let rStr = r1 + "" + r2;
    let rCharList = rStr.split("");
    let a = 0;
    let b = 0;
    rCharList.forEach((i, index) => {
      let num = Number(i);
      if (index % 2 == 0) {
        a = a + num;
      } else {
        let temp = num * 2;
        b = b + temp / 10 + (temp % 10);
      }
    });
    let last = (a + b) % 10;
    if (last === 0) {
      last = 0;
    } else {
      last = 10 - last;
    }
    last = parseInt(last) + ""
    return rStr + last
  }
