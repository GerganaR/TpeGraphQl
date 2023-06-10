"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const schema_1 = require("./schema");
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const mobile_detect_1 = __importDefault(require("mobile-detect"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongo_1 = require("./mongo");
dotenv_1.default.config();
const graphQlPath = process.env.GRAPHQL_PATH;
//TODO: check i18next-fs-backend
async function startApolloServer() {
    // Required logic for integrating with Express
    const app = (0, express_1.default)();
    // Our httpServer handles incoming requests to our Express app.
    // Below, we tell Apollo Server to "drain" this httpServer,
    // enabling our servers to shut down gracefully.
    const httpServer = http_1.default.createServer(app);
    // Same ApolloServer initialization as before, plus the drain plugin
    // for our httpServer.
    const schema = await (0, schema_1.getSchema)();
    const server = new server_1.ApolloServer({
        schema,
        plugins: [
            (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
        ],
        introspection: true,
    });
    await server.start();
    app.use(graphQlPath, (0, cors_1.default)({
        origin: '*',
    }), body_parser_1.default.json(), (0, express4_1.expressMiddleware)(server, {
        context: async ({ req }) => {
            const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress);
            const context = {
                req,
                user: req.user,
                ip,
                location: geoip_lite_1.default.lookup(ip),
                md: new mobile_detect_1.default(req.headers['user-agent']),
            };
            return context;
        },
    }));
    await new Promise((resolve) => httpServer.listen({ port: process.env.PORT }, resolve));
    console.log('🚀 Server ready at http://localhost:4000/');
    await (0, mongo_1.connectToMongo)();
}
startApolloServer().catch((e) => console.log('cannot start server', e));
