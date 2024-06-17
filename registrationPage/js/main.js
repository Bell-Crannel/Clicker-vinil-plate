
const  playbtn = document.querySelector('.playBtn');
const  vinilRecorderIcon = document.querySelector('.gameIcon');


playbtn.addEventListener('click',addClasshtmlElm('active',vinilRecorderIcon,playbtn,));



function addClasshtmlElm(className,...element){
    return (e) =>{
            element.forEach((elem)=>{
            console.log(elem.className.split(" ")[0]);
        })
    }
}