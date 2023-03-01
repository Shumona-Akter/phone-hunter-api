const loadPhones = async (search, dataLimit) => {
    try{
        const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
        const res = await fetch (url);
        const data = await res.json();
        dataLoad(data.data, dataLimit)
    }
    catch(error){
        console.log(error)
    }
}


const dataLoad = (mainData, dataLimit) =>{
    const dataContainer = document.getElementById('dataContainer');
    const showAll = document.getElementById('show-all');
    if( mainData.length > 10 && dataLimit){
        mainData = mainData.slice (0, 10)
        showAll.classList.remove("d-none")
    }
    else{
        showAll.classList.add("d-none")

    }

    const noPhone = document.getElementById('no-phone');
    if(mainData.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none')

    }
    dataContainer.innerText = ''
    mainData.forEach(data => {
        dataContainer.innerHTML += `
        <div class="col">
          <div class="card">
            <img src="${data.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h4 class="card-title">${data.brand}</h4>
              <h5 class="card-title">${data.phone_name}</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <button onclick = "detailsApi('${data.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Details
                </button>
             
            </div>
          </div>
        </div>
    `
    });
    spinnerLoad(false)
    
}

const detailsApi = async (id) =>{
    try{
        const url = `https://openapi.programming-hero.com/api/phone/${id}`
        const res = await fetch (url)
        const data = await res.json();
        detailsContainer(data.data)
    }
    catch(error){
        console.log(error)
    }
}

const detailsContainer = (data) =>{
    console.log(data)
    const Container = document.getElementById('details-container');
    document.getElementById('exampleModalLabel').innerHTML = `${data.name}
    <img  src=" ${data.image}" alt="">
    `;
    document.getElementById('img').innerHTML = ` ${data.image}`;
    document.getElementById('para').innerHTML = `storage: ${data.mainFeatures.storage} <br> displaySize: ${data.mainFeatures.displaySize} `
    document.getElementById('exampleModalLabel')
    
}
// search 
const searchFunction = (dataLimit) =>{
    spinnerLoad(true)
     const inputField = document.getElementById('search-field').value;
     console.log(inputField);
     loadPhones(inputField, dataLimit);
     inputField.innerHTML = " ";
}
document.getElementById('search-btn').addEventListener("click", function(){
    searchFunction(10)
    
})
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchFunction(10)
    }
});
const spinnerLoad = isSpinner => {
    const spinner = document.getElementById('spinner');
    if(isSpinner){
        spinner.classList.remove('d-none');
    }
    else{
        spinner.classList.add('d-none');

    }
}

// show all
document.getElementById('show-all').addEventListener('click', function(){
    searchFunction()
})