import express from "express";
import { AuthorRouter, BooksRouter, CategoriesRouter, UsersRouter, PurchasesRouter, SessionsRouter, ViewsRouter } from "./routes/index.js";
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars"
import { errorHandler } from "../s2-SKT8/middlewares/index.js";

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Decir a express que estamos usando HBS
app.engine('hbs', engine({extname: 'hbs'}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use("/", ViewsRouter)
app.use("/auth", SessionsRouter);
app.use("/users", UsersRouter);
app.use("/categories", CategoriesRouter);
app.use("/authors", AuthorRouter);
app.use("/books", BooksRouter);
app.use("/purchases", PurchasesRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Servidor en puerto: ${port}`);
});
