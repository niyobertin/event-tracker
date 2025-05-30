"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRemainingTime = getRemainingTime;
function getRemainingTime(targetDateTime) {
    const now = new Date().getTime();
    const target = new Date(targetDateTime).getTime();
    const diff = target - now;
    if (diff <= 0) {
        return {
            total: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            isExpired: true,
        };
    }
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return {
        total: diff,
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
    };
}
