"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SessionService {
    static getInstance() {
        if (!this.instance) {
            SessionService.instance = new SessionService();
        }
        return this.instance;
    }
}
exports.default = SessionService;
