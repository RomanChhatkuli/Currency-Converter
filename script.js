let exchange = document.querySelector('button')
let amount = document.querySelector('input')
let select = document.querySelectorAll('select')
let fromCurr = document.querySelector('.from select')
let toCurr = document.querySelector('.to select')
let rate = document.querySelector('.rate')

select.forEach(element => {
    for (let currency in countryList) {
        let option = document.createElement('option')
        option.innerHTML = currency;
        option.value = currency;
        if(element.name==="from" && currency==="USD"){
            option.selected="selected";
        }
        if(element.name==="to" && currency==="NPR"){
            option.selected="selected";
        }
        element.appendChild(option);
    }
    
    element.addEventListener('change', (evt)=>{
        updateFlag(evt.target)
    })
});

function updateFlag(x){
    let country = countryList[x.value]
    let image = document.querySelector(`.${x.name} img`)
    image.src = `https://flagsapi.com/${country}/flat/64.png`
}


exchange.addEventListener('click',(evt)=>{
    evt.preventDefault();
    if(amount.value=="" || amount.value<1){
        amount.value='1'
    }
    let URL = `https://v6.exchangerate-api.com/v6/b8898ef67ee0efc9be69e9c2/latest/${fromCurr.value}`
    let data = async ()=>{
        let response = await fetch(URL)
        let a = await response.json()
        let ans = a.conversion_rates[toCurr.value]
        rate.innerHTML= `${amount.value} ${fromCurr.value} = ${ans*amount.value} ${toCurr.value}`
    }
    data()
})