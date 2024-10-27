function uniqueArray(arr1, arr2){
    for(let i=0; i< arr1.length; i++){
        for(let j=0; j< arr2.length; j++){
            if(arr1[i] === arr2[j]){
                arr1.splice(i,1);
                arr2.splice(j,1);
            }
        }
    }
    const NewArr = arr1.concat(arr2);
    console.log(NewArr);
}

const A1 = [1, 4, 5, 'a', 'b'];
const A2 = [2, 'b', 7, 5, 'c'];
uniqueArray(A1, A2)