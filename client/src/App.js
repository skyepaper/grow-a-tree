import React, { useState, useEffect } from 'react';

function App() {

  const [steps, setSteps] = useState(0);

function switchDisplay(word) {
  let arr=document.querySelectorAll('.display')
  arr.forEach(item=>{
    item.style.display='none'
  })

  let find=document.querySelector(`.${word}`)
  if(find)find.style.display='block'
}

function startCount() {

  let boxA=document.querySelector('.box-first')
  let boxB=document.querySelector('.box-second')
  let boxC=document.querySelector('.box-third')

  let flag=1
  let count=0

window.addEventListener('devicemotion', function(event) {
  
    let accX = event.accelerationIncludingGravity.x;
    let accY = event.accelerationIncludingGravity.y;
    let accZ = event.accelerationIncludingGravity.z;


    if(window.innerWidth <= 800) {

      let curX=Math.ceil(Math.abs(accX.toFixed(2))*100)   
      let curY=Math.ceil(Math.abs(accY.toFixed(2))*100)   
      let curZ=Math.ceil(Math.abs(accZ.toFixed(2))*100)  
      let sum=curX+curY+curZ
      if(sum<1000)sum=1000
      
      if(flag===1) {
        flag=0
        
         let divX=document.createElement('div')
         divX.classList.add('mark')
         divX.textContent=sum
         boxA.appendChild(divX)
        
         setTimeout(()=>{flag=1},50)
      }
    }
      
})

if(window.innerWidth <= 800) {

  let interval=setInterval(()=>{
  
  
    boxB.innerHTML=boxA.innerHTML
    boxA.innerHTML=''
  
   let arr=boxB.querySelectorAll('.mark')
   
   if(arr.length>10) {
      let min=arr[0].textContent
      let max=arr[0].textContent
      let num=0
      
      arr.forEach(mark=>{
         num=mark.textContent
        
         if(num<min) min=num
         if(num>max) max=num
      })
       if(max<min) {
           arr.forEach(mark=>{
             num=mark.textContent
             if(num<min) min=num
             if(num>max) max=num
           })
       }
     
     let diff=max-min
     let text=''
     if(diff>500) {
         let percent=0
         arr.forEach(mark=>{
           num=mark.textContent
           percent=((num-min)/(max-min))*100
           mark.style.height=`${percent}%`
           if(percent>80) {
             mark.style.backgroundColor='blue'
             text=text+' 5'
             //count++
             //setSteps(count)
           } else if(percent>60) {
              mark.style.backgroundColor='lightblue'
              text=text+' 5'
           } else if(percent>40) {
              mark.style.backgroundColor='lightblue'
              text=text+' 5'
           } else if(percent>20) {
              mark.style.backgroundColor='orange'
              text=text+' 0'
           } else  {
              mark.style.backgroundColor='black'
              text=text+' 0'
           }
         })

         boxC.textContent=text
     }
      
   }
   
  },4000)

}

}


  return (
   <div>

   <div className="button-box">
   
      <button type="button" onClick={()=>switchDisplay('count')}>
        <div class="top">count</div>
        <div class="bottom"></div>
      </button>

      <button type="button" onClick={()=>switchDisplay('tree')}>
        <div class="top">tree</div>
        <div class="bottom"></div>
      </button>

      <button type="button" onClick={()=>switchDisplay('map')}>
        <div class="top">map</div>
        <div class="bottom"></div>
      </button>

   </div>
   
   <div className="display count" >
      <div className="steps">1000</div>
      <div class="box-first"></div>
      <div class="box-second"></div>
      <div className="box-third"></div>
   </div>

   <div className="display tree" >
      <div className="steps">1000</div>
   </div>

   <div className="display map" >map</div>

   <button type="button" className="start" onClick={startCount}>
      <div class="top">START</div>
      <div class="bottom"></div>
   </button>



   </div>
  );
}

export default App;
