const express = require("express");
const router = express.Router();

router.post('/foodData', (req, res)=>{
    try {
        res.send([global.sample, global.foodCategory]);
    } catch (error) {
        console.error(error);
        res.send("Server Error...");  
    }
})

module.exports = router;