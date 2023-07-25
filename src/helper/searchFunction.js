const SearchFunction = ()=>{

     // Declare variables
     var input, filter, table, tr, td, i, txtValue;
     input = document.getElementById("myInput");
     filter = input.value.toUpperCase();     
     table = document.getElementById("myTable");
     tr = table.getElementsByTagName("tr");
console.log('input : ',input)
console.log('table : ',table)
console.log('tr : ',tr)

     // Loop through all table rows, and hide those who don't match the search query
     for (i = 0; i < tr.length; i++) {
       td = tr[i].getElementsByTagName("td")[1];
     if (td) {
       txtValue = td.textContent || td.innerText;
     if (txtValue.toUpperCase().indexOf(filter) > -1) {
       tr[i].style.display = "";
     } else {
       tr[i].style.display = "none";
     }
   }
 }

}


function SearchFunction1() {
    const input = document.getElementById("myInput");
    const filter = input.value.toUpperCase();
    const cardContainers = document.getElementsByClassName("Card");
  
    for (let i = 0; i < cardContainers.length; i++) {
      const cardContainer = cardContainers[i];
      const cardInfo = cardContainer.querySelector(".cardInfo");
      const nameElement = cardInfo.querySelector("strong");
  
      if (nameElement) {
        const txtValue = nameElement.textContent || nameElement.innerText;
  
        if (txtValue.toUpperCase().includes(filter)) {
          cardContainer.style.display = "block"; // Show the card container
        } else {
          cardContainer.style.display = "none"; // Hide the card container
        }
      }
    }
  }
  
export {SearchFunction,SearchFunction1};