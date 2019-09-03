const express = require('express');
const server  = express();
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const PORT    = 3000;

const { calcu: CALCULATOR_MATH } = require('./helpers/calcu');
const { LIST_POSTS } = require('./data/fake.posts');
const { middlewareLogDate } = require('./helpers/middleware.demo');
const { USER_ROUTE } = require('./routes/users.route');
const { ADMIN_ROUTE } = require('./routes/admin.route');
/**
 * setup ejs
 */
server.set('view engine', 'ejs');
server.set('views', './views');

server.use(express.static('./public/'));

/**
 * setup express-session
 */
server.use(expressSession({
    secret: 'MERN_STACK_1508',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 10000
    }
}));

server.use(bodyParser.urlencoded({ extended: true }));
// server.use(middlewareLogDate);
server.use('/nguoi-dung', USER_ROUTE);
server.use('/admin', ADMIN_ROUTE);

server.get('/demo', middlewareLogDate, (req, res) => {
    const { numberRandom } = req;
    res.json({ message: `HELLO WORLD - number: ${numberRandom}` })
});

server.route('/cal')
    .get((req, res) => res.render('cal'))
    .post((req, res) => {
        const { calcu, num1, num2 } = req.body;
        let resultStr = CALCULATOR_MATH(calcu, num1, num2);
        res.json({ result: resultStr })
    })

// server.get('/cal/:calcu/:num1/:num2', (req, res) => {
//     const { calcu, num1, num2 } = req.params;
//     let resultStr = CALCULATOR_MATH(calcu, num1, num2);
//     res.json({ result: resultStr })
// });

server.get('/list-posts', (req, res) => {
    res.json({ listPosts: LIST_POSTS })
});

server.get('/post/:postID', (req, res) => {
    const { postID } = req.params;
    const infoPost = LIST_POSTS.find(item => `${item.id}` === postID);
    res.json({ infoPost })
});

server.get('/post-of-user/:userID', (req, res) => {
    const { userID } = req.params;
    const listPosts = LIST_POSTS.filter(item => `${item.userId}` === userID);
    res.render('list-post', { listPosts, userID })
    // res.json({ infoPost })
});

/**
 * -----
 */
server.get('/home', (req, res) => {
    let users = ['lan server', 'anh'];
    res.render('home', { users });
});

server.get('/dang-nhap', (req, res) => {
    res.render('login')
});

server.post('/dang-nhap', (req, res) => {
    /**
     *   server.use(bodyParser.urlencoded({ extended: true }));
     */
    const { username, password } = req.body;
    /**
     * xu ly
     */
    console.log({ username, password });
    res.json({ username, password });
});

server.get('/login/:username/:password', (req, res) => {
    const { username, password } = req.params;
    /**
     * LOGIN ....
     */
    req.session.infoUser = { username, password };
    res.json({ message: 'save_user_success', username });
});

// server.get('/vao-rap', (req, res) => { 
//     const { DA_MUA_VE } = req.session;
//     console.log({ DA_MUA_VE });
//     if (!DA_MUA_VE) return res.redirect('/chua-co-ve');
//     res.json({ message: 'XEM_XIEC_DI' });
// });

// server.get('/chua-co-ve', (req, res) => res.json({ error: true, message: 'di_mua_ve_di' }));
server.get('/test', (req, res) => {
    const { username, password } = req.session.infoUser;
    res.json({ username, password });
})
/**
 * OBJ = {
 *  fullname: 'abc',
 *  avatar:  {
 *      path: 'avatar.png',
 *      description: ',,,,'
 * }
 */

/**
 * 1. TÌM ITEM BÀI VIẾT VỚI ID
 * 2. LẤY TẤT CẢ BÀI VIẾT CỦA 1 USER (userId)
 */

/**
 * npm install nodemon -g (cai dat global)
 * npm install nodemon --save-dev (luu lai trong devDependencies)
 */

server.get('*', (req, res) => res.json({ error: 'not found' }));

server.listen(PORT, () => console.log(`server started at port ${PORT}`));