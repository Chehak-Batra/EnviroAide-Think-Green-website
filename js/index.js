// let api=`https://api.reliefweb.int/v1/reports?appname=apidoc`;
// let api=`https://api.reliefweb.int/v1/countries?appname=apidoc`;
// let api=`https://api.reliefweb.int/disasters?appname=apidoc?`;
// let api=`https://api.reliefweb.int/v1/sources?appname=apidoc`;
// let api=`https://api.reliefweb.int/v1/training?appname=apidoc`;
// let api=`https://api.reliefweb.int/v1/jobs?appname=apidoc`;
//----------------------------------------------------------------------------------------------------

// endangered animals
// let api="https://animals-endangered-environmentalism.p.rapidapi.com/population/1?type=equal";

let type=document.querySelector('#options');
let num=document.querySelector('#number');
let val1="equal";
let val2=1;

type.addEventListener('input',()=>{
    console.log("type changed");

    let options=document.querySelectorAll('option');

    options.forEach(element => {
        if(element.selected)
        val1=element.value;
    });
    accessdata();
})

num.addEventListener('input',()=>{
    console.log(num.value);
    val2=num.value;
    accessdata();
})

function accessdata() {
    let k=true;

if(k==true)
{
    fetch(`https://animals-endangered-environmentalism.p.rapidapi.com/population/${val2}?type=${val1}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "animals-endangered-environmentalism.p.rapidapi.com",
            "x-rapidapi-key": "95d39a2412msh61773a06fbf83fcp1a596cjsn8b67b2fab175"
        }
    })

    .then((response) =>{
        return response.json();
    })
   
    .then(data=>{
    //    console.log(data);
      printdata(data);
    })
} 
}

function printdata(arr) {
    let text=document.querySelector('.text');
    text.innerHTML="";

    console.log(arr);

    arr.forEach((element,index) => {
        if(index<20)
        {
            // console.log(element);
            let box=document.createElement('div');
            box.classList.add('box');
            let yes=`<div class="name">${element.commonName}</div><div class="pop">${element.numberOfMatureIndividuals}</div><div class="cat">${element.data.assessmentInformation.iucnRedListCategoryAndCriteria.substr(0,22)}</div><div class="hab">${element.data.habitatAndEcology.habitatType}</div>`;
    
            box.innerHTML=yes;
            text.appendChild(box);
        }
       

    });
}
accessdata();
//------------------------------------------------------------------------------------------

let val3=12;
function getdata(offset=0) {
    
let api=`https://docs.openaq.org/v2/latest?limit=${val3}&page=1&offset=${offset}&sort=desc&radius=1000&country_id=In&order_by=random&dumpRaw=true`;
let z=true;

if(z==true)
{
    fetch(api)

    .then((response) =>{
        return response.json();
    })
   
    .then(data=>{
       console.log(data);
       showdata(data.results);
    })
} 

}

function showdata(arr) {
    let text=document.querySelector('.citylist');
    text.innerHTML="";

    console.log(arr);

    arr.forEach(element => {

            // console.log(element);
            let box=document.createElement('div');
            box.classList.add('round');
            let yes=`<div class="city">CITY: ${element.city}</div><div class="loc">${element.location}</div><br>`;
    
            element.measurements.forEach(element => {
                yes=yes+`<div class="par"><strong>${element.parameter} value: </strong>${element.value} ${element.unit}</div>`;
            });
            box.innerHTML=yes;
            text.appendChild(box);

    });
}

getdata();

let limit=document.querySelector('#limit');

limit.addEventListener('input',()=>{
    console.log(limit.value);
    val3=limit.value;
    getdata();
})
let offset=0;

let btn=document.querySelector('.heading button');

btn.addEventListener('click',()=>{
    console.log("btn clicked");
    offset=offset+val3;

    if(offset>3000)
    offset=0;
    
    getdata(offset);
})