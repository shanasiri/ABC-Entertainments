const router = require('express').Router();
const Album = require('../models/Album');

router.post("/add", (req, res) => {
    const album = new Album(req.body);

    album.save((err) => {
        if(err){
            return res.status(400).json({ success:false, err});
        }
        else{
            return res.status(200).json({success:true});
        }
    })
});

router.get("/", (req, res) => {
    Album.find().exec((err, albums) => {
        if(err){
            return res.status(400).json({ success:false, err});
        }
        else{
            return res.status(200).json({success:true, albums:albums});
        }
    })
});

router.get("/detail/:id", (req, res) => {
    let id = req.params.id;

    Album.findById(id, function(err, album) {
        if(err){
            return res.json({success: false, error:err});
        }
        else{
            return res.json({success: true, album})
        }
    })
})

router.put("/update/:id", (req, res) => {
    Album.findByIdAndUpdate(req.params.id, {
        $set: req.body,
        }, (err, album) => {
            if(err){
                return res.status(400).json({ success:false, err});
            }
            else{
                return res.status(200).json({ success:true, albums:album});
            }
        }
    );
});

router.delete("/delete/:id", (req, res) => {
    Album.findByIdAndRemove(req.params.id).exec((err, deleteAlbum) => {
        if(err){
            return res.status(400).json({ success:false, err});
        }
        else{
            return res.json({ success: true, deleteAlbum});
        }
    })
})

module.exports = router;