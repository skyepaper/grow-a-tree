import React, { useState, useEffect } from 'react';

function App() {

  const [steps, setSteps] = useState(0);
  const [maxSteps, setMaxSteps] = useState(200);

function switchDisplay(word) {
  let arr=document.querySelectorAll('.display')
  arr.forEach(item=>{
    item.style.display='none'
  })

  let find=document.querySelector(`.${word}`)
  if(find)find.style.display='block'
}

function startCount() {
  let button=document.querySelector('.start')
  button.style.display='none'

  let boxA=document.querySelector('.box-first')
  let boxB=document.querySelector('.box-second')
  let boxC=document.querySelector('.box-third')

  let flag=1
  let stepCount=0

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

         let arrText=text.split('0')

         arrText.forEach(part=>{
          let matches = part.match(new RegExp('5', 'g'))
          let count = matches ? matches.length : 0

          if(count>2 && count<7) stepCount++

         })
         setSteps(stepCount)
       
     }
      
   }
   
  },4000)

  let interval2=setInterval(()=>{


    let arr=document.querySelectorAll(`.pole`)
    arr.forEach(pole=>{
       pole.style.visibility='hidden'
       pole.style.height=`9.8%`
       pole.style.backgroundColor=`#400f04`
    })
    let arr2=document.querySelectorAll(`.branch`)
    arr2.forEach(branch=>{
       branch.style.width='1px'
    })
    let arr3=document.querySelectorAll(`.stick`)
    arr3.forEach(stick=>{
      stick.remove()
    })
   
   
   let num = Math.floor(steps/maxSteps*100)
   
   let count=Math.ceil(num/10)
   for(let i=1;i<=count;i++) {
     let curr=document.querySelector(`.pole-${i}`)
     curr.style.visibility='visible'
     curr.style.width=`${(count-i+1)*3}px`
     
     let arr=curr.querySelectorAll('.branch')
     arr.forEach(branch=>{
       let width=num*1.8-i*15
       branch.style.width=`${random(width*0.8,width*1.2)}px`
       branch.style.height=`${(count-i+1)*1.2}px`
      
       let length=branch.style.width.replace('px','')
        
       let flag=0
       if(length>30) {
           if(length<60) {flag=1}
           else if(length<80) {flag=2}
           else if(length<100) {flag=3}
           else {flag=4}
       }
       
       if(flag!==0) {
         let percent=Math.floor(100/(flag+1))
         
         for(let i=1;i<=flag;i++) {
           let left=document.createElement('div')
           let right=document.createElement('div')
           left.classList.add('stick')
           right.classList.add('stick')
              left.style.transform=`rotate(${random(20,50)}deg)`
              right.style.transform=`rotate(${random(-50,-20)}deg)`
           
               left.style.height=`${flag/2.5}px`
               right.style.height=`${flag/2.5}px`
               left.style.width=`${random(flag*10,flag*15)}px`
               right.style.width=`${random(flag*10,flag*15)}px`
                         
           left.style.marginLeft=`${percent*i}%`
           right.style.marginLeft=`${percent*i}%`
           branch.appendChild(left)
           branch.appendChild(right)
         }
       }
       let arr5=document.querySelectorAll(`.shade`)
        arr5.forEach(shade=>{shade.remove()})
       let arr6=document.querySelectorAll(`.leaf`)
        arr6.forEach(leaf=>{leaf.remove()})
       
       let arr4=document.querySelectorAll(`.stick`)
        arr4.forEach(stick=>{
           let shade=document.createElement('div')
           shade.classList.add('shade')
           stick.appendChild(shade)
           for(let j=0;j<4;j++) {
             let leaf=document.createElement('div')
             leaf.classList.add('leaf')
             leaf.style.top=`${random(0,100)}%`
             leaf.style.left=`${random(0,100)}%`
             shade.appendChild(leaf)
           }
        })
       
     })
     
     curr.querySelector('.br-left').style.transform=`rotate(${random(180,210)}deg)`
     curr.querySelector('.br-right').style.transform=`rotate(${random(0,-30)}deg)`
     
     if(i===count) {
       let size=num%10
       if(size===0)size=10
       curr.style.backgroundColor='green'
       curr.style.height=`${size*4}px`
     }
   }


  },300)

}

}

function random(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min);
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
      <div className="steps">{steps}</div>
      <div class="box-first"></div>
      <div class="box-second"></div>
      <div className="box-third"></div>
   </div>

   <div className="display tree" >
      <div className="steps">{steps}/{maxSteps}</div>
      <div className="card">
      
      <div class="pole pole-10 hidden">
        <div class="branch br-left"></div>
        <div class="branch br-right"></div>
      </div> 
      
      <div class="pole pole-9">
        <div class="branch br-left"></div>
        <div class="branch br-right"></div>
      </div> 
      
      <div class="pole pole-8">
        <div class="branch br-left"></div>
        <div class="branch br-right"></div>
      </div> 
      
      <div class="pole pole-7">
        <div class="branch br-left"></div>
        <div class="branch br-right"></div>
      </div> 
      
      <div class="pole pole-6">
        <div class="branch br-left"></div>
        <div class="branch br-right"></div>
      </div> 
      
      <div class="pole pole-5">
        <div class="branch br-left"></div>
        <div class="branch br-right"></div>
      </div> 
      
      <div class="pole pole-4">
        <div class="branch br-left"></div>
        <div class="branch br-right"></div>
      </div> 
      
      <div class="pole pole-3">
        <div class="branch br-left"></div>
        <div class="branch br-right"></div>
      </div> 
      
      <div class="pole pole-2">
        <div class="branch br-left"></div>
        <div class="branch br-right"></div>
      </div> 
      
      <div class="pole pole-1">
        <div class="branch br-left">
          <div class="stick"></div>
        </div>
        <div class="branch br-right"></div>
      </div> 
    
      
      </div>
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
