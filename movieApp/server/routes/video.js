const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg")

let storage = multer.diskStorage({
    destination: (res, file, cb) => {
        cb(null, "uploads");
    },
    filename: (res, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage: storage, 
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'video/mp4') {
          return cb(new Error('only allow mp4'));
        }
        cb(null, true);
    }
}).single("file")

//=================================
//             Video
//=================================

router.post("/uploadfiles", (req, res) => {

    upload(req, res, err => {
        console.dir(res.req.file)
        if(err) {
            return res.json({ success: false , err})
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
    })

});
router.post("/uploadVideo", (req, res) => {

    const video = new Video(req.body)
    video.save((err, doc) => {
        if(err) return res.json({ success : false, err })
        res.status(200).json({ success: true })
    })

});
router.post("/getVideoDetail", (req, res) => {
    
    Video.findOne({ "_id" : req.body.videoId })
        .populate("writer")
        .exec((err, videoDetail) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success : true, videoDetail })
        })

});
router.get("/getVideos", (req, res) => {

    Video.find()
        .populate('write')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success : true , videos });
        })

});
router.post("/thumbnail", (req, res) => {

    let filePath =""
    let fileDuration = "" 
    let filename =""
    ffmpeg.ffprobe(req.body.url, function (err, metadata) {
        console.dir(metadata);
        console.dir(metadata.format.duration);
        fileDuration = metadata.format.duration
    })

    ffmpeg(req.body.url)
    .on('filenames', function (filenames) {
        console.log('Will generate ' + filenames.join(', '))
        console.log(filenames)

        filePath = "uploads/thumbnails/" + filenames[0]
    })
    .on('end', function () {
        console.log('Screenshots taken');
        return res.json({ success: true, url: filePath, fileName: filename, fileDuration: fileDuration})
    })
    .on('error', function(err) {
        console.error(err);
        return res.json({ success: false, err})
    })
    .screenshots({
        count : 3,
        folder : 'uploads/thumbnails',
        size: '320x240',
        filename: 'thumbnail-%b.png'
    })

});

module.exports = router;
