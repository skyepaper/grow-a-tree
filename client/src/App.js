

function App() {



function switchDisplay(word) {
  let arr=document.querySelectorAll('.display')
  arr.forEach(item=>{
    item.style.display='none'
  })

  let find=document.querySelector(`.${word}`)
  if(find)find.style.display='block'
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
      <div className="steps">1111</div>
   </div>

   <div className="display tree" >
      <div className="steps">1000</div>
   </div>

   <div className="display map" >map</div>

   <button type="button" className="start">
      <div class="top">START</div>
      <div class="bottom"></div>
   </button>



   </div>
  );
}

export default App;
