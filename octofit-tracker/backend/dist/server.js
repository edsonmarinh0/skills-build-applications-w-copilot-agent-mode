"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./config/database");
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
function createApp() {
    const app = (0, express_1.default)();
    const port = Number(process.env.PORT || 8000);
    const codespaceName = process.env.CODESPACE_NAME?.trim();
    const baseUrl = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.get('/api/health', (_req, res) => {
        res.json({ status: 'ok', service: 'octofit-backend', baseUrl });
    });
    app.use('/api', routes_1.default);
    return { app, port, baseUrl };
}
function startServer() {
    const { app, port, baseUrl } = createApp();
    app.listen(port, () => {
        console.log(`OctoFit backend listening on port ${port}`);
        console.log(`API base URL: ${baseUrl}`);
    });
    return app;
}
if (require.main === module) {
    startServer();
}
