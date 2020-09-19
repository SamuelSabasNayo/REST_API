import Blog from '../database/models/blog';

const blogIndex = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => res.json({ blogs: result }))
    .catch((err) => {
      console.log(err);
    });
};

const blogDetails = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => res.json({ blog: result }))
    .catch((err) => {
      console.log(err);
    });
};

export default {
  blogIndex,
  blogDetails
};
