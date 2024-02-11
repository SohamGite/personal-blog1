import express from 'express'
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

let posts = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { posts });
});
app.get('/compose', (req, res) => {
    res.render('compose');
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get("/contacts",(req,res)=>{
    res.render('contacts');
});

app.post('/submit', (req, res) => {

    const title = req.body['title'];
    const content = req.body['content'];
    const author = req.body['author'];
    const option = req.body['option'];

    const post = new Post(title,content,author);

    switch(option){
        case "Create Post":
            posts.push(post);
            break;
        case "Edit Post":
            editPost(title,content,author)
            break;
        case "Delete Post":
            deletePost(title,contnet,author)
            break;
    }
    res.redirect('/');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

class Post{
    constructor(title,content,author)
    {
        this.title = title;
        this.content = content;
        this.author = author;

    }
}
function comparePost(title)
{
    for(let i=0;i<posts.length;i++)
    {
        if(posts[i].title === title){
            return i;
        }
    }
    return -1;
}
function editPost(title,content,author){
    let position = comparePost(title);

    if(position>-1)
    {
        posts[position].title = title;
        posts[position].content = content;
        posts[position].author = author;
    }
}
function deletePost(title,content,author){
    let position = comparePost(title);

    if(position>-1)
    {
        posts.splice(position,1);
    }
}
