// Two methods to do this 
// 1st Method :

// const content = document.getElementById('content');

// const addNoteBox = ()=>{
//     // console.log('hi');
//     const htmlData = `
//         <div class="boxes">
//         <div class="noteBox">
//             <button class="edit"><i class="fas fa-edit"></i></button>
//             <button class="delete"><i class="fas fa-trash-alt"></i></button>
//             <br>
//             <textarea class="textArea"></textarea>
//         </div>           
//         </div> `;


//     content.insertAdjacentHTML('beforeend',htmlData);

// }


const updateLSData=()=>{
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    // console.log(textAreaData);
    textAreaData.forEach((data)=>{
        return notes.push(data.value);
    })
    // console.log(notes);

    localStorage.setItem('Notes',JSON.stringify(notes));
}


const addNoteBox = (text="")=>{
    const note = document.createElement('div');
    note.classList.add('boxes');

    const htmlData = `
    <div class="noteBox">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
        <br>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class=" textArea ${text ? "hidden" : "" }"></textarea>
    </div> `;
    
    note.insertAdjacentHTML('afterbegin',htmlData);
    document.body.appendChild(note);

    // Getting the References
    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('.textArea');

    delButton.addEventListener('click',()=>{
        note.remove();
        updateLSData();
    })

    textArea.value = text;
    mainDiv.innerHTML=text;

    // toggle using edit button 
    editButton.addEventListener('click',()=>{
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('change',(event)=>{
        const value = event.target.value;
        mainDiv.innerHTML=value;

        updateLSData();
    })

}

// getting data back from local storage 
const getNotes = JSON.parse(localStorage.getItem('Notes'));

if (getNotes) {
    getNotes.forEach((note)=>{
        addNoteBox(note);
    })
}
