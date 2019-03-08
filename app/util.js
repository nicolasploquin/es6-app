export function encodeText(text){
    return text
        .replace(/&/,"&amp;")
        .replace(/</,"&lt;")
        .replace(/>/,"&gt;")
        .replace(/"/,"&quot;")
    ;
        
}

export function notification(message){
        
    var elemP = document.createElement("p");
    elemP.className = "eni-notif";
    elemP.textContent = message;
    
    var footer = document.querySelector("body > footer");
    footer.insertBefore(elemP, footer.firstElementChild);
    
    setTimeout(() => elemP.remove(), 5000);
    
    
}