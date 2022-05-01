
const divDesc = document.querySelector(".right-side_description");
const divType = document.querySelector(".right-side_type");
const divAmount = document.querySelector(".right-side_amount");
const total = document.querySelector(".right-side_summary-p")
const btnAdd = document.querySelector(".add");
const btnDelete = document.querySelector(".delete");
const formMontoValidator = /^\d+$/;



class Information{
    constructor(eleccion,descripcion,monto){
        this.eleccion = eleccion;
        this.descripcion = descripcion;
        this.monto = monto;
    }
    showEleccion(){
        const p = document.createElement('p');
        p.textContent = this.eleccion;
        p.className = "right-side_type_node";
        divType.appendChild(p);
    }
    showDescripcion(){
        const p = document.createElement('p');
        p.textContent = this.descripcion;
        divDesc.appendChild(p);
    }
    showMontoGreen(){
        const p = document.createElement('p');
        p.textContent = this.monto;
        p.className = "right-side_amount_node";
        p.style.backgroundColor = '#4cd463';
        divAmount.appendChild(p);
    }
    showMontoRed(){
        const p = document.createElement('p');
        p.textContent = this.monto;
        p.className = "right-side_amount_node";
        p.style.backgroundColor = '#e8574d';
        divAmount.appendChild(p);
    }
}

let divTypeCounter = 0;
let totalToPay = 0;
let arr = [];

btnAdd.addEventListener('click',() => {
    const select = document.querySelector(".left-side_data-type").value;
    let shortDescription = document.getElementById("textarea").value;
    const input = document.getElementById("input").value;
    if (formMontoValidator.test(input)){
        const newInf = new Information(select,shortDescription,input)
        newInf.showDescripcion()
        newInf.showEleccion();
        divTypeCounter += 1;
        if (select == "ingreso"){
            newInf.showMontoGreen()
            totalToPay = parseInt(totalToPay) + parseInt(input);
            total.innerHTML = "$"+totalToPay;
        }
        else{
            newInf.showMontoRed();
            totalToPay = parseInt(totalToPay) - parseInt(input);
            total.innerHTML = "$"+totalToPay;
        }
        arr.push(newInf)
        localStorage.setItem('arr', JSON.stringify(arr));
        localStorage.setItem('total', JSON.stringify(totalToPay));
    }
    else{
        alert("Solo se admiten numeros!");
    }
})

btnDelete.addEventListener('click',() => {
    while (divTypeCounter>=1){
    divType.removeChild(divType.lastChild);
    divDesc.removeChild(divDesc.lastChild);
    divAmount.removeChild(divAmount.lastChild);
    divTypeCounter -= 1;
    }
    arr = [];
    divTypeCounter = 0;
    totalToPay = 0;
    total.innerHTML = "$"+0
    localStorage.removeItem("arr")
    localStorage.removeItem("totalToPay")
})

document.addEventListener('DOMContentLoaded', () => {
    data = JSON.parse(localStorage.getItem('arr'));
    totalFinal = JSON.parse(localStorage.getItem('total'));
    if (data != []){
        renderTabla(data);
        arr = data;
        totalToPay = totalFinal;
        total.innerHTML = "$"+totalFinal;
    } 
  });

const renderTabla = (data)=>{
   for (let i=0;i<data.length;i++){
        let obj = Object.values(data[i]);
        const newInf = new Information(obj[0],obj[1],obj[2]);
        newInf.showDescripcion()
        newInf.showEleccion();
        divTypeCounter += 1;
        if (obj[0] == "ingreso"){
            newInf.showMontoGreen()
        }
        else{
            newInf.showMontoRed();
        }
    }
}
  
