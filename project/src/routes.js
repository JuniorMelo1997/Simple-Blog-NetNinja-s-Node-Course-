const express = require("express");
const router = express.Router();
const Blog = require("./models/blog");


/*GET method routes */
router.get("/", (req, res)=>{
    Blog.find().sort({createdAt: -1}).then((blogs)=>{
        res.render("index", {title: "Home", blogs})
    }).catch((err)=>{
        console.log(err);
    })

})

router.get("/about", (req, res)=>{
    res.render("about", {title: "About"})
})

router.get("/create", (req, res)=>{
    res.render("create", {title: "Create Blog"})
})




router.get("/blogs/:id", (req, res)=>{
    const id = req.params.id;
    
    Blog.findById(id).then((blog)=>{
        res.render("show-blog", {title: blog.title, blog});
    }).catch((err)=>{
        console.log(err);
    })
})


/*POST method routes */
router.post("/blogs", (req, res)=>{
    const blog = new Blog({
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body
    });

    blog.save().then(()=>{
        res.redirect("/");
    }).catch((err)=>{
        res.send("Failure to posto the new blog. Error: "+ err);
    });
})


/*DELETE method routes */
router.delete("/blogs/:id", (req, res)=>{
    const id = req.params.id;

    Blog.findByIdAndDelete(id).then(()=>{
        res.json({redirect: "/"});
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports = router;