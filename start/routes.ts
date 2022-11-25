/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

//auth

Route.group(() => {
  Route.get("image/:nom_image", "AuthController.readImage");
  Route.post("register", "AuthController.register");
  Route.post("login", "AuthController.login");
  Route.get("home", "UserController.home");

  Route.get("logout", "AuthController.logout").middleware(["auth"]);
  Route.get("user", "AuthController.me").middleware(["auth"]);
  Route.group(() => {
    Route.get("", "DemandeController.recu");
    Route.get("accepter", "DemandeController.accepter");
    Route.post("send", "DemandeController.send");
    Route.get("/show/:id_demande", "DemandeController.show");
    // Route.get("/etat/:etat_demande", "DemandeController.etat");
    Route.post("/etat/action", "DemandeController.actionDemande");
  })
    .prefix("demande")
    .middleware("auth");
}).prefix("api");
