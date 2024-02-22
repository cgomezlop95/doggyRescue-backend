function filterDogs() {
  var selectedSex = document.getElementById("dogSex").value;
  //The entire line sets the variable selectedSex to the value of the currently selected option in the dropdown with the ID "dogSex".
  var isVaccinated = document.getElementById("isVaccinated").checked;
  //It returns a Boolean value indicating whether the checkbox is checked (true) or not checked (false).
  var dogs = document.querySelectorAll(".singleDog");

  dogs.forEach(function (dog) {
    var dogSex = dog.getAttribute("data-dog-sex");
    var vaccinated = dog.getAttribute("data-vaccinated") === "true";

    var sexCondition = selectedSex === "all" || selectedSex === dogSex;
    //It returns true if at least one of the conditions on its either side is true.

    var vaccinatedCondition = !isVaccinated || (isVaccinated && vaccinated);

    if (sexCondition && vaccinatedCondition) {
      dog.style.display = "block"; //making the dog element visible.
    } else {
      dog.style.display = "none"; //making the dog element invisible
    }
  });
}
