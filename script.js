"use strict";
let participants = [];
function domRemoveParticipant(event) {
    // TODO
}

function domAddParticipant(participant, st) {
    const table = document.querySelector("#participant-table");
    const tr = document.createElement("tr");
    table.appendChild(tr);

    for(const key in participant){
        const td = document.createElement("td");
        //.key nej delou kr key je string ("neku_ime")
        td.innerText = participant[key];
        tr.appendChild(td);
    }
    tr.ondblclick = function doubleClick(){
        console.log(tr.rowIndex - 1);
        let ime = tr.childNodes[0].innerText;
        var answer = window.confirm("Are you sure you want to delete "+ime+" ?");
        let indeks = tr.rowIndex - 1;
        if(answer){
            tr.remove();
            //console.log(indeks);
            participants.splice(indeks, 1);
            for(let a of participants){
                //console.log(a);
            }
            localStorage.setItem("participants", JSON.stringify(participants));
            //localStorage.setItem("participants", JSON.stringify(participants));
        }
    }
    if(st == 1){
        participants.push(participant);
        localStorage.setItem("participants", JSON.stringify(participants));
    }
    /*
    let retrieved = JSON.parse(localStorage.getItem("participants"));
    console.log(retrieved);
    for(const r of retrieved){
        console.log(r.first+ " " + r.last+ " " + r.role);
    }
    */
}

function addParticipant(event) {
    // TODO: Get values
    const first = document.querySelector("#first").value;
    const last = document.querySelector("#last").value;
    const role = document.querySelector("#role").value;
    
    // TODO: Set input fields to empty values
    // ...
    document.querySelector("#first").value = "";
    document.querySelector("#last").value = "";

    // Create participant object
    const participant = {
        first: first,
        last: last,
        role: role
    };

    // Add participant to the HTML
    domAddParticipant(participant, 1);

    // Move cursor to the first name input field
    document.getElementById("first").focus();
}

document.addEventListener("DOMContentLoaded", () => {
    // This function is run after the page contents have been loaded
    // Put your initialization code here
    let retrieved = JSON.parse(localStorage.getItem("participants"));
    participants = retrieved;
    //retrieved = participants;
    //localStorage.setItem("participants", JSON.stringify(participants));
    console.log(retrieved);
    for(const r of retrieved){
        console.log(r.first+ " " + r.last+ " " + r.role);
        domAddParticipant(r,0);
    }
    document.getElementById("addButton").onclick = addParticipant;
})