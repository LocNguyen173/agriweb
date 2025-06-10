const { Service } = require('../../config/model');

const createAndSaveService = (done) => {
  const service = new Service({
    serviceId: "service123",
    name: "New Service",
    description: "This is a description of my first service.",
    image: "https://example.com/service.jpg",
    created_at: new Date(),
    updated_at: new Date()
  });
  service.save((err, data) => {
    if (err) return console.error(err);
    console.log("Service saved:", data);
    done(null, data);
  });
};

const createManyServices = (arrayOfServices, done) => {
  Service.create(arrayOfServices, (err, data) => {
    if (err) return console.error(err);
    console.log("Many Services saved:", data);
    done(null, data);
  });
};

const findServicesByDate = (date, done) => {
  Service.find({ created_at: date }, (err, data) => {
    if (err) return console.error(err);
    console.log("Services found by date:", data);
    done(null, data);
  });
};

const findOneByName = (name, done) => {
  Service.findOne({ name: name }, (err, data) => {
    if (err) return console.error(err);
    console.log("Service found by name:", data);
    done(null, data);
  });
};

const findServiceById = (serviceId, done) => {
  Service.findById(serviceId, (err, data) => {
    if (err) return console.error(err);
    console.log("Service found by ID:", data);
    done(null, data);
  });
};

const findServiceAndEdit = (serviceId, done) => {
  const description = "testing update of service description";
  Service.findById(serviceId, (err, service) => {
    if (err) return done(err);
    if (!service) return done(new Error("Service not found"));
    service.description = description;
    service.save((err, data) => {
      if (err) return done(err);
      console.log("Service updated:", data);
      done(null, data);
    });
  });
};

const findImageAndUpdate = (name, done) => {
  const imageToSet = "https://example.com/updated-service.jpg";
  Service.findOneAndUpdate({ name: name }, { image: imageToSet }, { new: true }, (err, data) => {
    if (err) return console.error(err);
    console.log("Service updated image:", data);
    done(null, data);
  });
};

const removeServiceById = (serviceId, done) => {
  Service.findByIdAndRemove(serviceId, (err, data) => {
    if (err) return console.error(err);
    console.log("Service removed:", data);
    done(null, data);
  });
};

const removeManyServices = (done) => {
  const nameToRemove = "New Service";
  Service.remove({ name: nameToRemove }, (err, data) => {
    if (err) return console.error(err);
    console.log("Services removed:", data);
    done(null, data);
  });
};

const queryChainService = (done) => {
  const nameToSearch = "New Service";
  Service.find({ name: nameToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ description: 0, image: 0 })
    .exec((err, data) => {
      if (err) return console.error(err);
      console.log("Query chain result:", data);
      done(null, data);
    });
};

exports.createAndSaveService = createAndSaveService;
exports.createManyServices = createManyServices;
exports.findServicesByDate = findServicesByDate;
exports.findOneByName = findOneByName;
exports.findServiceById = findServiceById;
exports.findServiceAndEdit = findServiceAndEdit;
exports.findImageAndUpdate = findImageAndUpdate;
exports.removeServiceById = removeServiceById;
exports.removeManyServices = removeManyServices;
exports.queryChainService = queryChainService;