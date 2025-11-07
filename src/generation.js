export default function* uuid(Start_index){
    // const fruits=["mangue", "banane", "...."]
    // for(let i =0; i<fruits.length; i++){
    //     yield fruits[i];
    // }
    let i=Start_index;
    //let i=1000;
    while(true){
        yield i++;
    }
}

const uuidgen= uuid();
console.log(uuidgen.next());
console.log(uuidgen.next());
console.log(uuidgen.next())