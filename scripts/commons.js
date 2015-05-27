Array.prototype.clone = function () {
    return this.slice(0);
};
var ie8 = false;
if(typeof HTMLElement=="undefined"){
    ie8 = true;
    Element.prototype.showBlock = function () {
        return this.style.display = "block";
    };
    Element.prototype.hideBlock = function () {
        return this.style.display = "none";
    };
    Element.prototype.appendFirst=function(childNode){
        if(this.firstChild)this.insertBefore(childNode,this.firstChild);
        else this.appendChild(childNode);
    };
} else{
    HTMLElement.prototype.showBlock = function () {
        return this.style.display = "block";
    };
    HTMLElement.prototype.hideBlock = function () {
        return this.style.display = "none";
    };
    HTMLElement.prototype.appendFirst=function(childNode){
        if(this.firstChild)this.insertBefore(childNode,this.firstChild);
        else this.appendChild(childNode);
    };
}
