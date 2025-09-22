import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// 'app' here is like a big object with methods you call to tell it what to do when requests come in.
// isse express k methods wagerah sab 'app' mein load hogye hai
const app = express(); // isse express ka ek instance banega

// to handle cross origin requests
app.use(cors({
    origin: process.env.CORS_ORIGIN, // kon konse origin allowed hai
    credentials: true, // When credentials: true is enabled, you're saying: "Yes, it's okay for the browser to include credentials (like cookies or HTTP auth headers) when making cross-origin requests to this server."
})); // use is a method to register middleware

app.use(express.json({limit: "16kb"})); // Parses incoming JSON payloads from the request body and makes them available under req.body.
app.use(express.urlencoded({extended: true, limit: "16kb"})); // form data ko parse krta hai jo submit hota hai
// extended: true means it can parse nested objects
// limit: "16kb" means maximum size of payload is 16kb
app.use(express.static("public")); // public folder ko static folder bana diya hai
app.use(cookieParser()); // taki hum server se cookies on browser read kr ske aur set bhi kr sake  


// Routes Import 
import userRouter from './routes/user.route.js'


// Routes Declaration
// pehle hum direct kr rhe the ki app.get wagerah krke lgado but tab hum route aur function(controller) dono same file mein define kr rhe the as app.get k waha
// ab as hum ab alag alag files mein kr rhe toh hume ek middleware use krne padega app.use() krke krenge kaam ab . yhi hai syntax yaad krlo ise .
// ye industry practice hai to write version jo bhi chal rha ho (abhi v1 maan liya) 
app.use('/api/v1/users' , userRouter); // jaise hi koi user hit krega /users route toh hum userRouter ko control dedenge





// ismein aur ' export const app = express(); ' mein koi farak nhi hai
export { app }; // these are named exports . it means jaha import krenge waha same name se import krna padega





/*
   __________________________________
  | F O L D E R    S T R U C T U R E |
  |__________________________________|

### ✅ 1. **`routes/` folder**

* This folder **lists all the URLs** your backend can respond to.
* Each file in here says:

  * “If someone sends a request to this URL, run this function.”

**Example:**

```js
router.post('/login', loginUser);
```

Means: “When someone sends a POST request to `/login`, run the `loginUser` function.”

---

### ✅ 2. **`controllers/` folder**

* This folder contains the **functions that actually do things**.
* These functions run **after** someone hits a route.
* They handle the logic like:

  * Saving data
  * Checking login details
  * Sending responses

**Example:**

```js
const loginUser = (req, res) => {
  // Check if user exists
  // Verify password
  // Send response
};
```

---

### ✅ 3. **`models/` folder**

* This folder defines how your **data is structured**.
* It also lets you **talk to the database**.
* You use models to:

  * Save something
  * Find something
  * Update or delete something

**Example:**

```js
const User = mongoose.model('User', userSchema);
```

Now you can do `User.find()`, `User.create()`, etc.

---

### ✅ 4. **`middleware/` folder**

* This folder contains code that **runs before your controller functions**.
* It’s used to:

  * Check if the user is logged in
  * Validate data
  * Handle errors

**Example:**

```js
const checkAuth = (req, res, next) => {
  // Check if the user is logged in
  next(); // continue if okay
};
```

---

### ✅ 5. **`utils/` folder**

* This folder has **small helper functions**.
* You can use them in many places.
* They do things like:

  * Hash passwords
  * Send emails
  * Format data

**Example:**

```js
const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};
```

---

### ✅ Summary (No Analogy):

| Folder         | What it's for                                     |
| -------------- | ------------------------------------------------- |
| `routes/`      | Defines the URLs and connects them to functions   |
| `controllers/` | Has the actual logic for each request             |
| `models/`      | Talks to the database and defines data structure  |
| `middleware/`  | Runs before main logic to check or prepare things |
| `utils/`       | Reusable helper functions                         |

*/

