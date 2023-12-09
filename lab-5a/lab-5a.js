const clickLeft = () => {
    nextPhoto()
   };
   
   setInterval(clickLeft, 1500); 
   
   document.getElementById('left')
    .addEventListener('click', clickLeft);

const clickRight = () => {
        nextPhoto()
     };
      
     setInterval(clickRight, 1500); 
       
     document.getElementById('right')
     .addEventListener('click', clickRight);

    function nextPhoto() {
        const sliderItemNodes = document.getElementsByClassName('slider-item');
       
        let prevIndex = null;
        for (let i = 0; i < sliderItemNodes.length; i += 1) {
         if (sliderItemNodes[i].classList.contains('selected')) {
          prevIndex = i - 1;
          if (prevIndex == -1) {
           prevIndex = sliderItemNodes.length - 1;
          }
         }
        }
       
        const [selectedNode] = document.getElementsByClassName('selected');
       
        selectedNode.classList.toggle('selected');
        sliderItemNodes[prevIndex].classList.toggle('selected');
    }
       
  

