//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Client = require('./models/Client')
const Freelancer = require('./models/Freelancer')
const Project = require('./models/Project')
const Request = require('./models/Request')
const Message = require('./models/Message')
const Rating = require('./models/Rating')
const Like = require('./models/Like')

//associations could go here!
Client.hasMany(Project)
Project.belongsTo(Client)
Freelancer.hasMany(Project)
Project.belongsTo(Freelancer)
Project.hasMany(Request)
Request.belongsTo(Project)
Freelancer.hasMany(Request)
Request.belongsTo(Freelancer)
Client.hasMany(Message)
Message.belongsTo(Client)
Freelancer.hasMany(Message)
Message.belongsTo(Freelancer)

Freelancer.hasMany(Rating)
Rating.belongsTo(Freelancer)

Rating.belongsTo(Project)
Project.hasMany(Rating)

Freelancer.hasMany(Like)
Like.belongsTo(Freelancer)
Project.hasMany(Like)
Like.belongsTo(Project)



module.exports = {
  db,
  models: {
    User,
    Client,
    Freelancer,
    Project,
    Request,
    Message,
    Rating,
    Like
  },
}
