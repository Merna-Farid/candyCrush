let candies=['Purple','Yellow','Red','Orange','Green','Blue']
let rows=9
let columns=9
let score=0
let b=[]
let board=document.querySelector('#board')
var currElement
var otherElement


window.onload=function(){
    StartGame()
    window.setInterval(function(){
        crushCandy()
        slideCandy()
        generateCandy()
    },100)

    
}

function RandomCandy(){
    let random=Math.floor(Math.random()*candies.length)
    return(candies[random])
}



function StartGame(){
    
    for(let r=0;r<rows;r++){
        
        let row=[]
        
        for(let c=0;c<columns;c++){
            let element=document.createElement("img")
            
            element.id=`${r}-${c}`
            element.src=`./images/${RandomCandy()}.png`
            board.appendChild(element)
            row.push(element)
            //drag functionalities
            element.addEventListener("dragstart",dragStart)//clicking on candy
            element.addEventListener("dragover",dragOver)//clicking on candy and moving the mouse while clicking
            element.addEventListener("dragenter",dragEnter)//draging candy on another candy
            element.addEventListener("dragleave",dragLeave)//leave the image
            // element.addEventListener("drag",dragDrop)//dropping a  candy over another candy
            element.addEventListener("dragend",dragEnd)//after dragging we swap candies
            element.addEventListener("drop",dragDrop)
            
            element.addEventListener("touchstart",dragStart) 
            element.addEventListener("touchmove",dragDrop)
            element.addEventListener("touchend",dragEnd)

          


        }
        b.push(row)
    
    }
    return b

}
function touchStart(){
    currElement=this
    console.log(this)

}

function dragStart(){
    currElement=this
    
    

}

function dragOver(e){
    e.preventDefault()
}

function dragEnter(e){
    e.preventDefault()
}


function dragLeave(){   
}

function dragDrop(){
    otherElement=this
    

}

function touchMove(){
    otherElement=this
    console.log(otherElement)
}

function dragEnd(){

    if(currElement.src.includes("blank") || otherElement.src.includes("blank")){return}

    let currCoor=currElement.id.split("-")
    let otherCoor=otherElement.id.split("-")

    const deltaX = Math.abs(otherCoor[0] - currCoor[0]);
    const deltaY = Math.abs(otherCoor[1] - currCoor[1]);
    
    if (((deltaX== 1 && deltaY==0) || (deltaX==0 && deltaY==1)) ){
        let currImg=`images${currElement.src.split("/images")[1]}`
        let otherImg=`images${otherElement.src.split("/images")[1]}`
        
        currElement.src=otherImg
        otherElement.src=currImg

        let validMove=isValid()
        if(!validMove){
            let currImg=`images${currElement.src.split("/images")[1]}`
            let otherImg=`images${otherElement.src.split("/images")[1]}`
            
            currElement.src=otherImg
            otherElement.src=currImg
        }
        }

       
}

function crushCandy(){
    crushThree()
    //crushFour()
    //crushFive()
    document.querySelector("#score").innerText=score
}

function crushThree(){
    //check rows
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns-2;c++){
            let candy1=b[r][c]
            let candy2=b[r][c+1]
            let candy3=b[r][c+2]

            if(candy1.src==candy2.src && candy2.src==candy3.src && !candy1.src.includes("blank")){
                candy1.src='./images/blank.png'
                candy2.src='./images/blank.png'
                candy3.src='./images/blank.png'
                score+=20
            }

        }
    }

    //check columns
    for(let c=0;c<columns;c++){
        for(let r=0;r<rows-2;r++){
            let candy1=b[r][c]
            let candy2=b[r+1][c]
            let candy3=b[r+2][c]

            if(candy1.src==candy2.src && candy2.src==candy3.src &&  !candy1.src.includes("blank")){
                candy1.src='./images/blank.png'
                candy2.src='./images/blank.png'
                candy3.src='./images/blank.png'
                score+=20
            }

        }
    }
}

function isValid(){
     //check rows
     for(let r=0;r<rows;r++){
        for(let c=0;c<columns-2;c++){
            let candy1=b[r][c]
            let candy2=b[r][c+1]
            let candy3=b[r][c+2]

            if(candy1.src==candy2.src && candy2.src==candy3.src && !candy1.src.includes("blank")){
                return true
            }

        }
    }

    //check columns
    for(let c=0;c<columns;c++){
        for(let r=0;r<rows-2;r++){
            let candy1=b[r][c]
            let candy2=b[r+1][c]
            let candy3=b[r+2][c]

            if(candy1.src==candy2.src && candy2.src==candy3.src &&  !candy1.src.includes("blank")){
                return true
            }
            

        }

    }
    return false


}

function slideCandy(){
    for(let c=0;c<columns;c++){
        let ind=rows-1
        for(let r=columns-1;r>=0;r--){
            if(!b[r][c].src.includes("blank")){
                b[ind][c].src=b[r][c].src
                ind-=1;
            }

        }
        for (let r=ind;r>=0;r--){
            b[r][c].src="./images/blank.png"
        }
    }
    
}

function generateCandy(){
    for(let c=0;c<columns;c++){
        if(b[0][c].src.includes("blank")){
            b[0][c].src=`./images/${RandomCandy()}.png`


        }
    }
}