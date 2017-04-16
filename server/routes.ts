import ProjectsCtrl from './controllers/projects';

export default function setRoutes(app) {

  const projects = new ProjectsCtrl();

  // APIs
  app.route('/api/projects').get(projects.getAll);
  app.route('/api/projects/count').get(projects.count);
  app.route('/api/project').post(projects.insert);
  app.route('/api/project/:id').get(projects.get);
  app.route('/api/project/:id').put(projects.update);
  app.route('/api/project/:id').delete(projects.delete);

}
