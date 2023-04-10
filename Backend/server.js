
const app = require('./app');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  // await mongoose.connect('mongodb://127.0.0.1:27017/test');
  await mongoose.connect('mongodb+srv://vsctl95:zSxe0wAU98vfcybl@cluster0.yii2iir.mongodb.net/?retryWrites=true&w=majority');

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// module.exports = mongoose