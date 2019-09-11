
function autoFill() {
    var element = document.getElementById("country-select");
    var text = element.options[element.selectedIndex].value;
    document.getElementById("country-code").value = text;
}


$(document).ready(function(){
    $('#myCarouse .item').each(function(){
        console.log('inside ', this.firstChild )
      var next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));
      
      for (var i=0;i<4;i++) {
        next=next.next();
        if (!next.length) {
            next = $(this).siblings(':first');
          }
        
        next.children(':first-child').clone().appendTo($(this));
      }
    });
    });



