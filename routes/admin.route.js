const express = require('express');
const router  = express.Router();
const { uploadMulter } = require('../helpers/multer');
const fs               = require('fs');
const path             = require('path');
// const users = [ 
//     { fullname: 'abc', email: 'abc@gmail.com', avatar: 'abc.png' },
//     { fullname: 'cde', email: 'cde@gmail.com', avatar: 'cde.png' },
// ]

const users = [ 
    { fullname: 'abc', email: 'abc@gmail.com', 
        gallery: [
            { name: 'abc.png' },
            { name: 'cde.png' }
        ],
        avatar: 'abc.png'
    }
]

// /admin/list-users
router.get('/list-users', (req, res) => {
    res.render('list-users', { users })
});

router.post('/add-user', uploadMulter.single('avatar'), (req, res) => {
    const { fullname, email } = req.body;
    const { originalname } = req.file;

    let newObj = { fullname, email, avatar: originalname };
    users.push(newObj);
    res.redirect('/admin/list-users');
});

let uploadMulti = uploadMulter.fields([
    { name: 'avatar', maxCount: 1 }, 
    { name: 'gallery', maxCount: 8 }])
router.post('/add-user-multi-image', uploadMulti, (req, res) => {
    const { fullname, email } = req.body;
    const { avatar, gallery } = req.files;
    let avatarInfo = avatar[0].originalname;

    let arrGallery  = gallery.reduce((previosVal, currentVal) => {
        let arrCurrent = [...previosVal];
        arrCurrent.push({ name: currentVal.originalname });
        return arrCurrent;
    }, []);

    let objNew = {
        fullname, email, avatar: avatarInfo, gallery: arrGallery
    };
    users.push(objNew);
    res.redirect('/admin/list-users');
});

router.get('/remove-user/:email', async (req, res) => {
    const { email: emailClientSendForRemove } = req.params;

    let indexItemForRemove = users.findIndex(item => Object.is(item.email, emailClientSendForRemove));
    
    const { avatar, gallery } = users[indexItemForRemove];

    let avatarPathForRemove = path.resolve(__dirname, `../public/users/${avatar}`)
    console.log({ avatarPathForRemove });

    await fs.unlink(avatarPathForRemove, (err, message) => {
        console.log({ err, message });
        if (err) return res.json({  error: true, message: 'cannot_remove_avatar_with_unlink' });

        let amountItemRemove = 1;
        let infoUserRemoved = users.splice(indexItemForRemove, amountItemRemove);
        console.log(`unlink success`);
    });

    await gallery.forEach(async itemGallery => {
        let itemGalleryPath = path.resolve(__dirname, `../public/users/${itemGallery.name}`)

        await fs.unlink(itemGalleryPath, (err, message) => {
            console.log({ err, message });
            if (err) return res.json({  error: true, message: 'cannot_remove_avatar_with_unlink' });
    
            let amountItemRemove = 1;
            let infoUserRemoved = users.splice(indexItemForRemove, amountItemRemove);
    
        });
    });
    res.redirect('/admin/list-users');

});

exports.ADMIN_ROUTE = router;