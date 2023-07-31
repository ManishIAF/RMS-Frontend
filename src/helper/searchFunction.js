const SearchFunction = ()=>{

     // Declare variables
     var input, filter, table, tr, td, i, txtValue;
     input = document.getElementById("myInput");
     filter = input.value.toUpperCase();     
     table = document.getElementById("myTable");
     tr = table.getElementsByTagName("tr");

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
  const searchTerm = document.getElementById('myInput').value.toLowerCase();
  const cards = document.querySelectorAll('.rapper .container1');

  for (const card of cards) {
    const nameElement = card.querySelector('h3');
    const name = nameElement.textContent.toLowerCase();

    const rollNumberElement = card.querySelector('h6:nth-child(2)');
    const rollNumber = rollNumberElement.textContent.toLowerCase();

    if (name.includes(searchTerm) || rollNumber.includes(searchTerm)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  }
  }
  
export {SearchFunction,SearchFunction1};