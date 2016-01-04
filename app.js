/* Cat and Cattery are model objects */

function Cat(args) {
  this.name = args.name;
  this.breed = args.breed;
  this.bornOn = args.bornOn;
  this.imageUrl = args.imageUrl;
}

Cat.prototype.sayHello = function() {
  return "Hello from " + this.name
}

function Cattery(name, cats) {
  this.name = name;
  this.cats = cats || [];
}

Cattery.prototype.addCat = function(cat) {
  this.cats.push(cat);
}

/* The View object knows how to draw the display 
   and handle user interaction (form events) 
*/

function View(element, form) {
  this.element = element;
  this.form = form;
  this.setupEventHandling();
}

View.prototype.setupEventHandling = function() {
  var view = this;
  var form = document.getElementById('form');
  form.addEventListener('submit', function(event){
    view.handleFormSubmission(event);
  });
}

View.prototype.drawCats = function(cattery) {
  var cats = cattery.cats;
  var html = '';
  for (var i =0; i < cats.length; i++) {
    var cat = cats[i];
    html += '<div class="cat">';
    html += '<div class="cat-image"><img src="' + cat.imageUrl + '"></div>';
    html +=   '<div class="cat-stats">';
    html +=     '<div class="cat-name">Name: ' + cat.name + ' </div>';
    html +=     '<div class="cat-breed">Breed: ' + cat.breed + '</div>';
    html +=     '<div class="cat-says">Says: ' + cat.sayHello() + '</div>';
    html += '  </div>';
    html += '</div>';
  }
  this.element.innerHTML = html;
}

View.prototype.handleFormSubmission = function(event) {
  event.preventDefault();
  params = {
    name: document.getElementById('name').value,
    breed: document.getElementById('breed').value,
    bornOn: document.getElementById('bornOn').value,
    imageUrl  : document.getElementById('imageUrl').value
  }
  console.log(this);
  this.controller.addCat(params);
}


function Controller(view, cattery) {
  this.view = view;
  this.cattery = cattery;
}

Controller.prototype.addCat = function(params) {
  var newCat = new Cat(params)
  this.cattery.addCat(newCat);
  this.view.drawCats(this.cattery);
}


document.addEventListener('DOMContentLoaded', function(){
  /* Set up the M V and C */
  var cattery = new Cattery('Steven\'s cat house');
  var view = new View(document.getElementById('cat-list'), document.getElementById('form'));
  var controller = new Controller(view, cattery);
  view.controller = controller;

  /* This is just for our demo purposes */
  var c = new Cat({imageUrl: 'http://do.scass.com/images/kittens/2.jpg', name:'Puss', breed:'Persian', bornOn: new Date('2014-03-01')});
  cattery.addCat(c);
  cattery.addCat(new Cat({imageUrl: 'http://do.scass.com/images/kittens/9.jpg', name:'Jimmy', breed:'Siamese', bornOn: new Date('2012-04-07')}));
  cattery.addCat(new Cat({imageUrl: 'http://do.scass.com/images/kittens/4.jpg', name:'Pudden', breed:'American shorthair', bornOn: new Date('2011-04-07')}));  
  view.drawCats(cattery);  

});


