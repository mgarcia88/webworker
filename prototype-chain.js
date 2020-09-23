function Person(personName) {
    this.persons = [];

    this.personName = personName;
    this.persons.push(personName);
}

Person.prototype = {
    addPerson: function (person) {
        this.persons.push(person);
    },

    listPerson: function () {
        return this.persons;
    }
}

function NaturalPerson() {
    Person.call(this);
}

NaturalPerson.prototype = Object.create(Person.prototype);

NaturalPerson.prototype.addPerson = function (personName, birthDate) {
    this.persons.push({ name: personName, birthDate: birthDate });
}

const newPerson = new NaturalPerson();

newPerson.addPerson("Maiara", "26/02/1988");
newPerson.addPerson("Tatiane", "25/07/1989");
newPerson.addPerson("Edmilson", "08/09/1953");
newPerson.addPerson("Cirlene", "31/08/1953");
newPerson.addPerson("Valter jr", "21/10/1994");
newPerson.addPerson("Caio", "21/11/1988");
newPerson.addPerson("Rafa", "05/02/2014");
newPerson.addPerson("Maria", "22/07/2010");
console.log(newPerson.listPerson());

