const express = require('express'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb://localhost:27017/node-tuts';
//  const dbURI = 'mongodb+srv://samuel:qwerty123@cluster1.ijjio.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


// register view engine
app.set('view engine', 'ejs');


// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// app.use(morgan('tiny'));
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});









// const express = require('express'),
//     morgan = require('morgan'),
//     mongoose = require('mongoose'),
//     Blog = require('./models/blog');

// // express app
// const app = express();

// // connect to mongodb
// const dbURI = 'mongodb://localhost:27017/node-tuts';
// //  const dbURI = 'mongodb+srv://samuel:qwerty123@cluster1.ijjio.mongodb.net/node-tuts?retryWrites=true&w=majority'
//  mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
//     .then((result) => app.listen(3000))
//     .catch((err) => console.log(err));


// // register view engine
// app.set('view engine', 'ejs');


// // middleware & static files
// app.use(express.static('public'));

// // app.use(morgan('tiny'));
// app.use(morgan('dev'));

// // mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'new blog 2',
//         body: 'more about my new blog 2'
//     });

//     blog.save()
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// app.get('/single-blog', (req, res) => {
//     Blog.findById('5f43b05ceb7e20288c975241')
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// app.get('/', (req, res) => {
//     const blogs = [
//         {title: 'Bob finds eggs', snippet: 'Lorem ipsum dolor sit amet consecteur'},
//         {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consecteur'},
//         {title: 'How defeat bowser', snippet: 'Lorem ipsum dolor sit amet consecteur'}
//     ];
//     res.render('index', { title: 'Home', blogs });
// });

// app.get('/about', (req, res) => {
//     res.render('about', { title: 'About' });
// });

// app.get('/blogs/create', (req, res) => {
//     res.render('create', { title: 'Create a new blog' });
// });

// // 404 page
// app.use((req, res) => {
//     res.status(404).render('404', { title: '404' });
// });