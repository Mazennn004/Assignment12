//selecting elements
var bookmarkNameInput=document.getElementById("siteName");
var siteUrlInput=document.getElementById("siteURL");
var submitButton=document.getElementById("submitButton");
var invalidLayer=document.getElementById("invalidLayer");
var closeButton=document.querySelector(".fa-close");
//arrayOfSites
var siteList=[];
//validation
var isInputsValid=false;
var patterns={
    bookmarkName:/\w{3,}/,
    url:/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
};
function validateInput(key,userValue){
var isMatched=patterns[key].test(userValue);
if(isMatched){
    isInputsValid=true;
}
else{
    isInputsValid=false;
}

}
function isNull(){
    if(bookmarkNameInput.value.trim()==""||siteUrlInput.value.trim()==""){
        return true;
    }
    else{
        return false;
    }
}
bookmarkNameInput.addEventListener('input',function(){
    validateInput('bookmarkName',bookmarkNameInput.value);
    if(!isInputsValid){
        bookmarkNameInput.classList.add("is-invalid");
    }
    else{
        bookmarkNameInput.classList.remove("is-invalid");
    }
});
siteUrlInput.addEventListener('input',function(){
    validateInput('url',siteUrlInput.value);
     if(!isInputsValid){
        siteUrlInput.classList.add("is-invalid");
    }
    else{
        siteUrlInput.classList.remove("is-invalid");
    }
});



//intiallizing the array of sites
if(localStorage.getItem("sites")==null){
    siteList=[];
}else{
   siteList=JSON.parse(localStorage.getItem('sites'));
   displaySites(siteList);
}

//Add Url Function

function addSite(){
if(!isNull()&&isInputsValid){
    var website={
    sName:bookmarkNameInput.value,
    sUrl:siteUrlInput.value,};
siteList.push(website);
localStorage.setItem("sites",JSON.stringify(siteList));
displaySites(siteList);
clearInputs();
}
else{
    
    showInvalidLayer();
    
}

}
//activating the add fucntion on the submit button
submitButton.addEventListener("click",function(e){
    addSite();
});


//function that show a layer if inputs are invalid

function showInvalidLayer(){
    invalidLayer.classList.replace("d-none","d-flex");
}
//function that hides the layer
function hideInvalidLayer(){
    invalidLayer.classList.replace("d-flex","d-none");
}

closeButton.addEventListener("click",function(){
    
hideInvalidLayer();

});
document.getElementById('layerContainer').addEventListener('click',function(e){
    e.stopPropagation(); //stop bubbling
});

invalidLayer.addEventListener('click',function(){
    hideInvalidLayer();
    
});
function clearInputs(){
    bookmarkNameInput.value="";
    siteUrlInput.value="";
}

function displaySites(list){
var tableRow=``;
for(var i=0;i<siteList.length;i++){
    tableRow=tableRow+` <tr>
                <td>${i+1}</td>
                <td>${list[i].sName}</td>
                <td><button class="btn btn-success"><a class="text-decoration-none text-white" href="${list[i].sUrl}">Visit</a></button></td>
                <td><button id="deleteButton" class="btn btn-danger" onclick="deleteSite(${i})">Delete</button></td>
            </tr>`;
}
document.getElementById("tableBody").innerHTML=tableRow;
}
function deleteSite(index){
siteList.splice(index,1);
localStorage.setItem("sites",JSON.stringify(siteList));
displaySites(siteList);
}