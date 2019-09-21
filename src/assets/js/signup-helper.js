
function autoFill() {
    var element = document.getElementById("country-select");
    var text = element.options[element.selectedIndex].value;
    document.getElementById("country-code").value = text;
}






