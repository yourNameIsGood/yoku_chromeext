
// 风之动漫 - click page so ads will be removed
document.addEventListener( "click", someListener );

function someListener(event){
    var element = event.target;
    console.log(element);
    if(element.tagName == 'A' && element.classList.contains("someBtn")){
        console.log("hi");
    }
    var first = document.getElementById("fix_top_dom")
    if( first != null){
        first.outerHTML = "";
    }
    var b = document.getElementById("HMRichBox")
    if( b != null){
        b.outerHTML = "";
    }
}
