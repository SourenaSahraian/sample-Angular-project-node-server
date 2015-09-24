/**
 * Created by rvv938 on 8/14/2015.
 */


function employee(){

    this.name='soorena';
    this.age='28';
    this.job='software';

}


var soorena = new employee();

console.log('watch ', soorena.age);


var toString = function () {
    for (var element in this) {
        console.log(this[element])

    }

}

employee.prototype.toString=toString;

console.log('hey')

var ehsan= new employee();
ehsan.toString();