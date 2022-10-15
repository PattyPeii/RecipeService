const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const userDef = protoLoader.loadSync('./proto/user.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})
const userService = grpc.loadPackageDefinition(userDef).UserService
exports.userClient = new userService(`${process.env.GRPC_USER_SERVICE}`, grpc.credentials.createInsecure())
