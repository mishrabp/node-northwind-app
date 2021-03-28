//const mongooseDB = require('../../dal/mongooseDB');
const mongooseDB = require("mongoose");

(async () => {
  try {
    //console.log(config.get('database.connectionString'));
    await mongooseDB.connect(
      "mongodb://localhost:27017/northwind?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false",
      {
        autoIndex: false,
        poolSize: 10,
        bufferMaxEntries: 0,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("mongoose database is successfully conneected.");
  } catch (ex) {
    console.log(ex);
  }
})();

const Author = mongooseDB.model(
  "Author",
  new mongooseDB.Schema({
    name: String,
    bio: String,
    website: String,
  })
);

const Course = mongooseDB.model(
  "Course",
  new mongooseDB.Schema({
    name: String,
    author: {
      type: mongooseDB.Schema.Types.ObjectId,
      ref: "Author",
    },
  })
);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find().populate("author").select("name author");
  console.log(courses);
}

//createAuthor('Mosh', 'My bio', 'My Website');

//createCourse('Node Course', '5f4e2a21493b332a5464d0d3');

listCourses();
