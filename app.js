const form = document.querySelector('#grocery-list');
const input = document.querySelector('input[name="grocery"]');
const list = document.querySelector('#list');




const retrieve = JSON.parse(localStorage.getItem('list')) || [];

for(let x = 0; x < retrieve.length; x++){
    const newItem = document.createElement('li');
    const dltBtn = document.createElement('button');
    newItem.innerText = retrieve[x].list;
    newItem.complete = retrieve[x].complete ? true : false;
    if(newItem.complete){
        newItem.classList.add('cross-off');
    }
    dltBtn.innerText = 'X';
    dltBtn.classList.add('red-X');
    list.appendChild(newItem);
    newItem.appendChild(dltBtn);
    newItem.setAttribute("data-id", [x]);
    dltBtn.setAttribute("data-id", [x]);
};

list.addEventListener('click', function(e){
    const newItem = document.createElement('li');
    const dltBtn = document.createElement('button');
    const click = e.target;
    const clickId = click.getAttribute("data-id");
    if (e.target.tagName === "BUTTON"){
        retrieve.splice(clickId,1);
        localStorage.setItem("list", JSON.stringify(retrieve));
        e.target.parentElement.remove();
    } else if(e.target.tagName === "LI"){
        e.target.classList.toggle("cross-off");
        if(e.target.classList.contains("cross-off")){
            retrieve[clickId].complete = true;
        }else {
            retrieve[clickId].complete =  false;
        }
    }
})


form.addEventListener('submit', function(e) {
	e.preventDefault();
    const newItem = document.createElement('li');
    const dltBtn = document.createElement('button');
    dltBtn.innerText = "X";
    dltBtn.classList.add('red-X');
    if (input.value === ""){
        alert("Please enter a value.");
    } else{
        const listLength = retrieve.length;
        newItem.innerText = input.value;
        newItem.appendChild(dltBtn);
        list.appendChild(newItem);
        dltBtn.setAttribute("data-id", listLength);
        newItem.setAttribute("data-id", listLength);
        retrieve.push({list : newItem.innerText.replace(dltBtn.innerText,""), complete: false});
        localStorage.setItem('list', JSON.stringify(retrieve));
        input.value = "";
        
    }  
});

// this was so hard. :( def need more practice with localStorage.
