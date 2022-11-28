module.exports = (app) => {
  const film_controller = require('../controllers/film_controllers/film_controllers');
  const cinema_cluster_controller = require('../controllers/cinema_cluster_controllers/cinema_cluster_controller');
  const actor_controller = require('../controllers/actor_controllers/actor_controller');
  const image_controller = require('../controllers/image_controllers/image_controller');
  const cinema_controller = require('../controllers/cinema_controller/cinema_controller');
  const middleware = require('../utils/middleware');
  const indexController = require('../controllers/login_controller/login_controller');

  //API film
  app.route('/films').get(film_controller.get_film);
  app
    .route('/films')
    .post(film_controller.add_film)
    .delete(film_controller.delete_film);
  app.route('/films/live').delete(film_controller.delete_in_theater_film);
  app.route('/films/hot').delete(film_controller.delete_hot_film);
  app.route('/films/new').delete(film_controller.delete_new_film);
  app.route('/films/search').get(film_controller.search_film);
  app
    .route('/films/:film_id')
    .get(film_controller.get_film_by_id)
    .put(film_controller.update_film);
  app.route('/films/add_hot').post(film_controller.update_hot_film);
  app.route('/films/add_new').post(film_controller.update_new_film);

  app
    .route('/films/film_image/:film_id')
    .post(film_controller.upload_film_image)
    .put(film_controller.upload_film_image);

  //Get film by genre
  app.route('/finds/new').get(film_controller.get_new_film);
  app.route('/finds/hot').get(film_controller.get_hot_film);
  app.route('/finds/not_hot').get(film_controller.get_not_hot_film);
  app.route('/finds/not_new').get(film_controller.get_not_new_film);
  app.route('/finds/in_theater').get(film_controller.get_in_theater_film);
  app.route('/finds/coming_soon').get(film_controller.get_coming_soon_film);
  app.route('/finds/:genre').get(film_controller.get_film_by_genre);

  //API actor
  app.route('/actors').get(actor_controller.get_actor);
  app
    .route('/actors')
    .post(actor_controller.add_actor)
    .delete(actor_controller.delete_actor);
  app.route('/actors/:actor_id').put(actor_controller.update_actor);
  app
    .route('/actors/image/:actor_id')
    .post(actor_controller.upload_image_actor)
    .put(actor_controller.upload_image_actor);
  app.route('/actors/search').get(actor_controller.search_actor);

  //API cinema cluster
  app
    .route('/cinemas_cluster')
    .get(cinema_cluster_controller.get_cinema_cluster);
  app
    .route('/cinemas_cluster')
    .delete(cinema_cluster_controller.delete_cinema_cluster)
    .post(cinema_cluster_controller.add_cinema_cluster);
  app
    .route('/cinemas_cluster/:cinema_id')
    .get(cinema_cluster_controller.get_single_cinema_cluster)
    .put(cinema_cluster_controller.update_cinema_cluster);
  app
    .route('/cinemas_cluster/cinema_image/:cinema_id')
    .post(cinema_cluster_controller.upload_cinema_image)
    .put(cinema_cluster_controller.upload_cinema_image);
  app
    .route('/cinemas_cluster/search')
    .get(cinema_cluster_controller.search_cinema);

  //API image
  app
    .route('/images')
    .get(image_controller.get_image)
    .post(image_controller.add_images);
  app.route('/images').post(image_controller.add_a_image);
  app.route('/images/:image_id').delete(image_controller.delete_image);

  //API cinema
  app.route('/cinemas').get(cinema_controller.get_cinema);
  app
    .route('/cinemas')
    .post(cinema_controller.add_cinema)
    .delete(cinema_controller.delete_cinema);
  app.route('/cinemas/:cinema_id').put(cinema_controller.update_cinema);
  app.route('/cinemas/search').get(cinema_controller.search_cinema);

  //API Login
  app.route('/login').post(indexController.function_login);
};
