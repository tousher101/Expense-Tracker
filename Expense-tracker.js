const ExpanseList = JSON.parse(localStorage.getItem('expanse')) || [{
    Name: 'Buy Rice',
    Amount: 100,
    Date: '04/19/2025'
},
{
    Name: 'Buy Pizza',
    Amount: 500,
    Date: '04/19/2025'

}]

ExpanseList.sort((a,b)=> new Date(a.Date)-new Date(b.Date));
displayData();
displayChart();



function displayData(){
    let showHTML= '';
    let totalAmount = 0;
    ExpanseList.forEach((expanse, i)=>{
        const exname = expanse.Name;
        const examount= expanse.Amount;
        const exdate = expanse.Date;
         totalAmount+=examount;
        
         showHTML+= `<div class="date-div"> ${exname}</div>
         <div class="date-div"> $${examount}</div>
         <div class="date-div"> ${exdate}</div>
         <button class="delete-btn">Delete</button>
         `
    });


    document.querySelector('.data-disply').innerHTML = showHTML;
    document.querySelector('.total-expans').innerHTML = `Total Expanse: $${totalAmount}`
    document.querySelectorAll('.delete-btn').forEach((btnElm, i)=>{
        btnElm.addEventListener('click',()=>{
            ExpanseList.splice(i,1);
            displayData();
            saveToStorage();
            displayChart();
        })
        
    })
}
displayChart();
function displayChart() {
    const labels = ExpanseList.map(exp => exp.Name);
    const data = ExpanseList.map(exp => exp.Amount);

    const ctx = document.getElementById('expenseChart').getContext('2d');

    // Destroy previous chart if it exists
    if (window.expenseChartInstance) {
        window.expenseChartInstance.destroy();
    }

    window.expenseChartInstance = new Chart(ctx, {
        type: 'bar', // 'pie' ও করতে পারো
        data: {
            labels: labels,
            datasets: [{
                label: 'Expenses',
                data: data,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1|4,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}



function addToList(){
    const expanseName = document.querySelector('.input-expanse');
    const name = expanseName.value;
    const expanseAmount = document.querySelector('.input-amount');
    const amount = Number(expanseAmount.value);
    const expanseDate = document.querySelector('.input-date');
    const date = expanseDate.value;

    if(!name||!amount||!date){alert('Please fill all fields with valid value'); return};



    ExpanseList.push({
        Name:name,
        Date:date,
        Amount:amount
    });

    expanseName.value ='';
    expanseAmount.value = '';
    expanseDate.value = '';
    displayData();
    displayChart()
    saveToStorage();
}

document.querySelector('.submit-btn').addEventListener('click',()=>{
    addToList();

})
function saveToStorage(){
    localStorage.setItem('expanse', JSON.stringify(ExpanseList))
}

document.querySelector('.filter-btn-1').addEventListener('click',()=>{
    const filterDate = document.querySelector('.input-filter');
    const filterBD = filterDate.value;
    const filterByDate = ExpanseList.filter((exp)=>
            exp.Date === filterBD
);
   
        document.querySelector('.data-disply').innerHTML=filterByDate.map((displayDate)=>
            `<div class="filter-div">${displayDate.Name} </div>
            <div class="filter-div">$${displayDate.Amount} </div>
            <div class="filter-div">${displayDate.Date} </div>`,
          
 )
});

document.querySelector('.filter-btn-2').addEventListener('click',()=>{
    const filterName = document.querySelector('.input-filter-name');
    const filterBN = filterName.value;
    const filterByName = ExpanseList.filter((nam)=>
        nam.Name === filterBN
        );
        document.querySelector('.data-disply').innerHTML = filterByName.map((displayName)=>
            `<div class="filter-div">${displayName.Name} </div>
        <div class="filter-div">$${displayName.Amount} </div>
        <div class="filter-div">${displayName.Date} </div>`,
      
        )
})


document.querySelectorAll('.clear-btn').forEach((button)=>{
button.addEventListener('click',()=>{
    displayData();
})
})
