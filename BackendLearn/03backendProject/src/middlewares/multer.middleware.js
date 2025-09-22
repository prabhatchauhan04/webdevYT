// so hum multer ko direct use krne ki jagah as a middleware lenge
// taki jab bhi kahi file upload ho toh usse pehle isse use krlengee
// middleware simply means jaane se pehle mujhse milkr jaana
// toh jab bhi file upload krni hogi lga denge isse whi
import multer from 'multer';

// ye hum direct official documentation se utha lae
// hum diskStorage use kr rhe bcoz agar memoryStorage/buffer use krte toh bohot jldi full hojati woh
// This just tells Multer where to save the file (like a folder) and how to name it.
const storage = multer.diskStorage({
    // isiliye express ki jagah multer use krte hai yha bcoz ab 'file' ka option bhi mil gya yha . warna express file upload k naamse bhi kuch hota hai woh bhi kr sakte the but abhi multer hi seekhenge . 
    destination: function (req, file, cb) {
        cb(null, './public/temp'); // cb is callback aur second argument is jaha hum file rakhne wale hai woh location
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // originalname basically means ki jis naam se user ne upload ki thi file ussi naam se rakhdete hai 
        // not a good thing bcoz ho sakta hai na multiple files same naam se aajae
        // but its file bcoz hum bohot kam time k liye rakhne wale hai file in disk bs cloudinary wala process pass ya fail hojae bs tab tak
    }
});

// This creates the actual "file upload handler" (called upload) that you use in your route.
// Now Multer, use that storage setup and start handling file uploads.
export const upload = multer({ storage: storage });









