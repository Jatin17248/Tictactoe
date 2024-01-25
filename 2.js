// Your JavaScript Code Goes Here
let oturn = true;
let countPlay= 0;
let nextIndex1 = 0;
const rbtn = document.querySelector('#rst-btn');
const nbtn = document.querySelector('#new-btn');
const btn = document.querySelectorAll('.btnchild');
const line = document.querySelectorAll('.line');
const msg = document.querySelector('#msg');
const winPattrn =[[0,3,6, 3], [1,4,7,4], [2,5,8,5],
					[0,1,2,0], [3,4,5,1], [6,7,8,2],
					[0,4,8,6], [2,4,6,7]];
					
// ... (your existing code)
btn.forEach((bt, index) => {
    bt.addEventListener('click', function () {
        turnWise(bt);
        checkWinner();
    });

    document.addEventListener('keydown', function (e) {
		btn[nextIndex1].focus();
        if (e.key === 'Enter') {
            e.preventDefault(); // prevent the default behavior of the Enter key
            turnWise(bt);
            checkWinner();
			handleArrowKeys(e, index);
			bt[nextIndex1].focus();
            
        } else {
			bt[nextIndex1].focus();
            handleArrowKeys(e, index);
        }
    });
});

// Focus the first button by default


function handleArrowKeys(event, index) {
    const rows = 3;
    const cols = 3;
    let nextIndex = index;

    switch (event.key) {
        case 'ArrowUp':
            nextIndex = (index - cols + btn.length) % btn.length;
            break;
        case 'ArrowDown':
            nextIndex = (index + cols + btn.length) % btn.length;
            break;
        case 'ArrowLeft':
            nextIndex = (index - 1 + btn.length) % btn.length;
            break;
        case 'ArrowRight':
            nextIndex = (index - 1 + btn.length) % btn.length;
            break;
    }

    btn[nextIndex].focus();
	nextIndex1 = nextIndex;
}

rbtn.addEventListener('click', function () {
    btn.forEach((bt) => {
	bt.removeAttribute('disabled');
	bt.innerText="";
	oturn = true;
	msg.innerText="Play Your Move";
	msg.style.backgroundColor="#000000";
	msg.style.color= "white";
	countPlay=0;
	})
	removeLines();
    // Your JavaScript logic here
});

nbtn.addEventListener('click', function () {
    btn.forEach((bt) => {
	bt.removeAttribute('disabled');
	bt.innerText="";
	oturn = true;
	msg.innerText="Play Your Move";
	msg.style.backgroundColor="#000000";
	msg.style.color= "white";
	countPlay=0;
	})
	
    window.scroll({
  top: window.outerHeight,
  behavior: "smooth",
});
removeLines();
});


function turnWise(bt){
	if(oturn){
		bt.innerText="O";
		oturn = false;
		bt.style.color="green";
		bt.disabled="true";
		msg.innerText="Turn Of X";
		msg.style.backgroundColor="#ff1881";
		msg.style.color= "white";
	}
	else{
		bt.innerText="X";
		oturn = true;
		bt.style.color="red";
		bt.disabled="true";
		msg.innerText="Turn Of O";
		msg.style.backgroundColor="dodgerBlue";
		msg.style.color= "white";
	}
}

function checkWinner(){
	countPlay++;
	winPattrn.forEach((pattern) => {
		let a= btn[pattern[0]].innerText;
		let b= btn[pattern[1]].innerText;
		let c= btn[pattern[2]].innerText;
		if (a !== "" && b !== "" && c !== "") {
		if(a===b && b===c){
			msg.innerText= ` ${a} Is Winner`;
			line[pattern[3]].style.visibility = "visible";
			msg.style.backgroundColor="green";
			msg.style.color= "blue";
			DisableAll();
			}
		else{
			if(countPlay===9){
				msg.innerText= ` Game Is Drawed`;
				msg.style.backgroundColor="black";
				msg.style.color= "white";
			}
		}
		}
	})
	
}

function removeLines(){
	line.forEach((ln) => {
		ln.style.visibility = "hidden";
	})
}
function DisableAll(){
	btn.forEach((bt) => {
			bt.disabled="true";
			})
}