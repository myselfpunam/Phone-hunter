const loadPhones = async(searchText,dataLimit) => {
  const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`
  const res = await fetch(url)
  const data = await res.json()
  displayPhones(data.data,dataLimit)
  
}
const displayPhones = (phones,dataLimit) => {
  const phoneContainer =document.getElementById('phones-container')
  phoneContainer.textContent=''
  const showAll = document.getElementById('show-all')
  if(dataLimit && phones.length > 10){
    phones = phones.slice(0,10)
    showAll.classList.remove('d-none')
  }
  else{
    showAll.classList.add('d-none')
  }
  const noPhone = document.getElementById('no-phone')
    if(phones.length === 0){
      noPhone.classList.remove('d-none')
    }
    else{
      noPhone.classList.add('d-none')
    }
  phones.forEach(phone => {
    const phoneDiv = document.createElement('div')
    
    phoneDiv.classList.add('col')
    phoneDiv.innerHTML = 
    `<div class="card">
      <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
          </p>
          <button onclick="loadDetails('${phone.slug}')" type="button" class="btn btn-secondary mt-2" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Search</button>
        </div>
    </div>
`
  phoneContainer.appendChild(phoneDiv)
  displaySpinner(false)
  });

}

const getData = (dataLimit) =>{
  displaySpinner(true)
  const searchField = document.getElementById('searchId')
  const searchText = searchField.value
  loadPhones(searchText,dataLimit)
}



 document.getElementById('btn-search').addEventListener('click',function(){
  getData(10)
 })
 document.getElementById('searchId').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    getData(10)
  }
})

 document.getElementById('btn-showAll').addEventListener('click',function(){
  getData ()
 })

 const displaySpinner = isloading => {
  const spinnerShow = document.getElementById('spinner')
  if(isloading){
    spinnerShow.classList.remove('d-none')
  }
  else{
    spinnerShow.classList.add('d-none')
  }
  }

  const loadDetails =async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data =await res.json()
    displayPhonesDetails(data.data)
  }
  
  const displayPhonesDetails = phone => {
    console.log(phone)
    const modalTitle = document.getElementById('phoneDetailsModalLabel')
    modalTitle.innerText = phone.name
    const phoneDetails = document.getElementById('phoneDetails')
    phoneDetails.innerHTML = `
    <p>Brand : ${ phone.brand} </p>
    <p>Chipset : ${ phone.mainFeatures.chipSet} </p>
    <p>Display : ${ phone.mainFeatures.displaySize} </p>
    <p>Memory : ${ phone.mainFeatures.memory} </p>
    <p>Storage : ${ phone.mainFeatures.storage} </p>
    <p>Sensors : ${ phone.mainFeatures.sensors} </p>
    

    
    <p>Release Date : ${ phone.releaseDate} </p>
    `
  }




