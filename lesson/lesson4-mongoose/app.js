let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('we\'re connected!')
});


let PersonSchema = new mongoose.Schema({
    name: String   //定义一个属性name，类型为String
});

PersonSchema.methods.speak = function () {
    console.log('my name is' + this.name);
}

let PersonModel = db.model('names', PersonSchema);
//如果该Model已经发布，则可以直接通过名字索引到，如下：
// var PersonModel = db.model('Person');
//如果没有发布，上一段代码将会异常



let personEntity = new PersonModel({ name: 'Krouky111' });

personEntity.save(); //

// personEntity.speak();