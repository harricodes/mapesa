"use strict";
var t = require("socket.io-client"),
    e = require("eventemitter3"),
    n = require("axios"),
    s = require("url-join"),
    i = require("react"),
    r = require("throttle-debounce");

function a(t) {
    return t && "object" == typeof t && "default" in t ? t : {
        default: t
    }
}
var f = a(t),
    u = a(e),
    t = a(n),
    e = a(s),
    o = a(i),
    n = a(r),
    T = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

function c(t) {
    return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t
}
var s = {},
    S = {};
! function(e) {
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.AutoPlayStakeAction = void 0, (t = e.AutoPlayStakeAction || (e.AutoPlayStakeAction = {})).RESET = "reset", t.MULTIPLY = "multiply";
    e.ChatType = void 0, (t = e.ChatType || (e.ChatType = {})).SAY = "say", t.MUTE = "mute", t.UNMUTE = "unmute", e.MuteType = void 0, (t = e.MuteType || (e.MuteType = {})).SHADOW = "shadow", t.NORMAL = "normal";
    e.TxnStatus = void 0, (t = e.TxnStatus || (e.TxnStatus = {})).PENDING = "pending", t.SUCCESS = "success", t.ERROR = "error", e.BonusStatus = void 0, (t = e.BonusStatus || (e.BonusStatus = {})).ACTIVE = "active", t.REDEEMED = "redeemed", t.EXPIRED = "expired";
    e.GameState = void 0, (t = e.GameState || (e.GameState = {})).STARTING = "STARTING", t.BLOCKING = "BLOCKING", t.IN_PROGRESS = "IN_PROGRESS", t.ENDED = "ENDED", e.SortDirection = void 0, (t = e.SortDirection || (e.SortDirection = {})).ASC = "+", t.DESC = "-", e.BoundaryOperator = void 0, (t = e.BoundaryOperator || (e.BoundaryOperator = {})).LT = "lt", t.GT = "gt", e.Role = void 0, (t = e.Role || (e.Role = {})).USER = "user", t.MODERATOR = "moderator", t.ADMIN = "admin", t.BOT = "player";
    var t;
    e.BalanceActivityType = void 0, (t = e.BalanceActivityType || (e.BalanceActivityType = {})).DEPOSIT = "deposit", t.BONUS = "deposit_bonus", t.BONUS_EXPIRY = "deposit_bonus_expiry", t.REFERRAL_PAYOUT = "referral_payout", t.BET = "bet", t.CASHOUT = "cashout", t.GIFT = "gift", t.TIP_SEND = "send_tip", t.TIP_RECEIVE = "receive_tip", t.WITHDRAW = "withdraw", t.WITHDRAW_REVERSE = "withdraw_reverse";

    function n(n, s, i) {
        return Object.keys(n).reduce((t, e) => (t => {
            t = s.includes(t);
            return i ? !t : t
        })(e) ? Object.assign(Object.assign({}, t), {
            [e]: n[e]
        }) : t, {})
    }
    e.API_VERSION_HEADER = "Accept-Api-Version", e.AUTHORIZATION_HEADER = "Authorization", e.BET_MIN_AMOUNT = 10, e.CHAT_HISTORY_SIZE = 500, e.CappedArray = class {
        constructor(t, e = !1) {
            this.t = t, this.i = e, this.u = []
        }
        get length() {
            return this.u.length
        }
        getAtIndex(t) {
            if (this.u.length > t && 0 <= t) return this.u[t]
        }
        set(t) {
            return this.u = this.i ? t.slice(0, this.t) : t.slice(Math.max(t.length - this.t, 0)), this
        }
        add(t) {
            return this.u.length >= this.t && (this.i ? this.u.pop() : this.u.shift()), this.i ? this.u.unshift(t) : this.u.push(t), this
        }
        clear() {
            return this.u = [], this
        }
        get(e) {
            return this.u.find(t => e(t))
        }
        filter(t) {
            this.u = this.u.filter(t)
        }
        apply(t) {
            this.set(t([...this.u]))
        }
        toArray() {
            return this.u
        }
    }, e.ERROR_ALREADY_CASHED_OUT = "ALREADY_CASHED_OUT", e.ERROR_ALREADY_PLACED_BET = "ALREADY_PLACED_BET", e.ERROR_GAME_ALREADY_CRASHED = "GAME_ALREADY_CRASHED", e.ERROR_GAME_IN_PROGRESS = "GAME_IN_PROGRESS", e.ERROR_GAME_NOT_IN_PROGRESS = "GAME_NOT_IN_PROGRESS", e.ERROR_INTERNAL_ERROR = "INTERNAL_ERROR", e.ERROR_MAX_WAGER_VIOLATION = "MAX_WAGER_VIOLATION", e.ERROR_NO_BET_PLACED = "NO_BET_PLACED", e.ERROR_NO_ENOUGH_MONEY = "NO_ENOUGH_MONEY", e.ERROR_NO_GAME_HASH = "NO_GAME_HASH", e.ERROR_OUTDATED_CLIENT = "OUTDATED_CLIENT", e.ERROR_REFERRAL_PAYOUT_INSUFFICIENT_PAYOUT = "INSUFFICIENT_PAYOUT", e.ERROR_REFERRAL_PAYOUT_TOO_SOON = "INSUFFICIENT_TIME_SPAN", e.EVENT_ADMIN_ONLINE_COUNT = "online_count_a", e.EVENT_ADMIN_PLAYER_BET_PLACED = "player_bet_a", e.EVENT_AUTO_PLAY = "auto_play", e.EVENT_BONUS_STATUS = "bonus_status", e.EVENT_CASHED_OUT = "cashed_out", e.EVENT_CHAT_JOIN_CHANNEL = "join_channel", e.EVENT_CHAT_MSG = "msg", e.EVENT_CHAT_MSG_DELETE = "msg_delete", e.EVENT_CHAT_MSG_MUTE_CHANGE = "chat_msg_mute_change", e.EVENT_CHAT_SAY = "say", e.EVENT_GAME_CRASH = "game_crash", e.EVENT_GAME_JOIN = "join_game", e.EVENT_GAME_STARTED = "game_started", e.EVENT_GAME_STARTING = "game_starting", e.EVENT_GAME_TICK = "game_tick", e.EVENT_ONLINE_COUNT = "online_count", e.EVENT_PLACE_PLAYER_BET = "place_bet", e.EVENT_PLAYER_BET_PLACED = "player_bet", e.EVENT_PLAYER_CASHOUT = "cash_out", e.EVENT_SERVER_SHUTDOWN_REQUESTED = "shutdown_requested", e.EVENT_STKPUSH_OFF_STATUS = "stkpush_off_status_change", e.EVENT_TXN_CHECK_COMPLETE = "txn_check_complete", e.EVENT_USER_INIT = "init", e.EVENT_WALLET_CHANGE = "wallet", e.GAME_HISTORY_SIZE = 100, e.MAX_TRANSACTION_AMOUNT = 7e4, e.MIN_TRANSACTION_AMOUNT = 50, e.PHONE_REGEX = /^\+\d{12}$/, e.REFERRAL_PAYOUT_AMOUNT_THRESHOLD = 100, e.REFERRAL_PAYOUT_MILLIS_THRESHOLD = 12096e5, e.USERNAME_MAX_LENGTH = 16, e.USERNAME_REGEX = /^[a-z0-9_-]{1,16}$/i, e.identity = t => t, e.isModerator = t => [e.Role.ADMIN, e.Role.MODERATOR].includes(t), e.mPesaWithdrawFee = t => 1e3 < t ? 23 : 16, e.multiplierToTime = t => Math.log(t) / 6e-5, e.noop = () => {}, e.omit = function(t, ...e) {
        return n(t, e, !0)
    }, e.omitKeys = function(t, e) {
        return n(t, e, !0)
    }, e.pick = function(t, ...e) {
        return n(t, e, !1)
    }, e.timeToMultiplier = t => Math.pow(Math.E, 6e-5 * t), e.toAtMostTwoDecimalPlaces = t => Math.floor(100 * t) / 100, e.usernameEqual = function(t, e) {
        var n = t => (t = t && "string" != typeof t ? t.username : t) ? t.toLowerCase() : "";
        return t = n(t), e = n(e), Boolean(t && e && t === e)
    }, e.withholdingTax = t => .2 * t
}(S);
var N = {},
    b = {},
    h = {},
    i = T && T.__importDefault || function(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    };
Object.defineProperty(h, "__esModule", {
    value: !0
});
class l extends i(u.default).default {
    emit(t, ...e) {
        return super.emit("*", ...e), super.emit(t, ...e)
    }
}
h.default = l;
var R = {};
Object.defineProperty(R, "__esModule", {
    value: !0
});
const d = S;

function _(e, t) {
    const {
        serialize: n,
        deserialize: s,
        defaultValue: i,
        isValid: r = () => !0
    } = t;
    return {
        set(t) {
            localStorage.setItem(e, n(t))
        },
        get() {
            var t = localStorage.getItem(e);
            if (null !== t) {
                t = s(t);
                if (r(t)) return t
            }
            return i
        },
        clear() {
            localStorage.removeItem(e)
        }
    }
}
r = t => ({
    serialize: d.identity,
    deserialize: d.identity,
    defaultValue: t
}), i = (e, t) => ({
    serialize: t => String(t),
    deserialize: t => Number(t),
    isValid: t => !isNaN(t) && e <= t && t <= Number.MAX_SAFE_INTEGER,
    defaultValue: t
}), u = t => {
    const e = new Set([d.AutoPlayStakeAction.RESET, d.AutoPlayStakeAction.MULTIPLY]);
    return {
        serialize: t => JSON.stringify(t),
        deserialize: t => JSON.parse(t),
        isValid: t => t && e.has(t.action) && isFinite(t.multiplier),
        defaultValue: {
            action: d.AutoPlayStakeAction.RESET,
            multiplier: t
        }
    }
}, i = {
    jwt: _("auth", r("")),
    chatChannel: _("chat:channel", r("english")),
    playerListSize: _("settings:player-list-size", i(1, 30)),
    betAmount: _("manual:bet:amount", i(10, 100)),
    betAutoCashout: _("manual:bet:auto-cashout", i(1.01, 2)),
    autoPlayStake: _("auto:bet:stake", i(10, 100)),
    autoPlayCashout: _("auto:bet:cashout", i(1.01, 2)),
    autoPlayLossAction: _("auto:bet:loss-action", u(2)),
    autoPlayWinAction: _("auto:bet:win-action", u(.5))
};
R.default = i;
u = T && T.__importDefault || function(t) {
    return t && t.__esModule ? t : {
        default: t
    }
};
Object.defineProperty(b, "__esModule", {
    value: !0
});
const v = S;
i = u(h);
const g = u(R),
    m = () => g.default.playerListSize.get();
class O extends i.default {
    constructor(e, t, n) {
        super(), this.ws = e, this.user = t, this.o = n, this.isInitialized = !1, this.isShuttingDown = !1, this.onlineUserCount = 0, this.history = new v.CappedArray(v.GAME_HISTORY_SIZE, !0), this.h = {}, this.l = new Set, this._ = 30, this.gameState = v.GameState.ENDED, this.gameId = void 0, this.maxWin = void 0, this.maxWager = void 0, this.startTime = void 0, this.timeTillStart = void 0, this.isPlacingBet = !1, this.isCashingOut = !1, this.nextBet = void 0, this.tickTimer = void 0, this.lastGameTick = void 0, this.lag = !1, this.nyan = !1, this._ = m(), t.on("initialized", () => {
            this.joinGame()
        }), t.on("disconnected", () => {
            this.isInitialized = !1, this.emit("disconnected")
        }), e.on(v.EVENT_SERVER_SHUTDOWN_REQUESTED, () => {
            this.isShuttingDown = !0, this.emit(v.EVENT_SERVER_SHUTDOWN_REQUESTED)
        }), e.on(v.EVENT_GAME_STARTED, () => {
            this.gameState = v.GameState.IN_PROGRESS, this.startTime = Date.now(), this.lastGameTick = Date.now(), this.isPlacingBet = !1, this.timeTillStart = void 0, this.nextBet = void 0, this.emit(v.EVENT_GAME_STARTED)
        }), e.on(v.EVENT_GAME_TICK, t => {
            this.lastGameTick = Date.now(), this.lag && (this.lag = !1, this.emit("lag_change"));
            var e = this.lastGameTick - t;
            (!this.startTime || this.startTime > e) && (this.startTime = e), this.tickTimer && clearTimeout(this.tickTimer), this.tickTimer = setTimeout(() => {
                this.lag = !0, this.emit("lag_change")
            }, 300), 115129 < t && !this.nyan && (this.nyan = !0, this.emit("nyan_cat_animation")), this.emit("tick")
        }), e.on(v.EVENT_GAME_CRASH, t => {
            this.tickTimer && clearTimeout(this.tickTimer);
            t = {
                gameId: this.gameId,
                gameHash: t.gameHash,
                gameCrash: t.gameCrash
            };
            this.history.add(t);
            t = this.h[this.user.username || ""];
            this.user.addPlay(t), this.gameState = v.GameState.ENDED, this.isCashingOut = !1, this.lag = !1, this.nyan = !1, this.emit(v.EVENT_GAME_CRASH)
        }), e.on(v.EVENT_GAME_STARTING, t => {
            this.isShuttingDown = !1, this.g(), this.gameState = v.GameState.STARTING, this.gameId = t.gameId, this.timeTillStart = t.timeTillStart, this.startTime = Date.now() + t.timeTillStart, this.maxWin = t.maxWin, this.maxWager = t.maxWager, this.nextBet && this.doBet(), this.emit(v.EVENT_GAME_STARTING)
        });
        t = (t, i) => {
            e.on(t, t => {
                if (!i(this.user.moderator)) {
                    for (const s of t) {
                        var {
                            username: e,
                            bet: n
                        } = s;
                        this.user.isMe(e) && (this.isPlacingBet = !1, this.nextBet = void 0, this.user.addBalance(-n)), this.h[s.username] = s
                    }
                    this.m(), this.emit("plays:new")
                }
            })
        };
        t(v.EVENT_PLAYER_BET_PLACED, t => t), t(v.EVENT_ADMIN_PLAYER_BET_PLACED, t => !t), e.on(v.EVENT_CASHED_OUT, t => {
            let e = !1;
            for (const r of t) {
                var {
                    username: n,
                    stoppedAt: s
                } = r, i = this.h[n];
                i && (this.user.isMe(n) && (this.isCashingOut = !1, this.user.addBalance(i.bet * s)), this.h[n].stoppedAt = s, this.l.has(n) && (e = !0))
            }
            e && this.emit("plays:cashout")
        });
        const s = t => {
            this.onlineUserCount = t, this.emit(v.EVENT_ONLINE_COUNT)
        };
        e.on(v.EVENT_ADMIN_ONLINE_COUNT, s), e.on(v.EVENT_ONLINE_COUNT, t => {
            this.user.moderator || s(t)
        })
    }
    g(t = {}) {
        this.h = Object.assign({}, t), this._ = m(), this.m(), this.emit("plays:refresh")
    }
    get plays() {
        return Array.from(this.l).map(t => this.h[t])
    }
    get rawPlays() {
        return Object.values(this.h)
    }
    getPlayByUsername(t) {
        return this.h[t]
    }
    m() {
        var t = this._,
            e = this.rawPlays;
        const i = e.length;
        if (i <= t) this.l = new Set(Object.keys(this.h));
        else {
            const r = [...e];
            r.sort((t, e) => e.bet - t.bet);
            const a = Math.floor(t / 5),
                u = t - 2 * a;
            const n = [...r.slice(0, a), ...(() => {
                const t = r.slice(a, i - a);
                if (t.length > 2 * u) {
                    const n = [],
                        s = new Set;
                    for (; n.length < u;) {
                        var e = Math.floor(Math.random() * t.length);
                        s.has(e) || (s.add(e), n.push(t[e]))
                    }
                    return n
                }
                return t.sort(() => Math.random() - .5), t.slice(0, u)
            })(), ...r.slice(i - a)];
            e = t => this.user.isMe(t.username), t = r.findIndex(e); - 1 < t && n.findIndex(e) < 0 && (e = Math.floor(Math.random() * u) + a, n[e] = r[t]), this.l = new Set(n.map(t => t.username))
        }
    }
    get isBetActive() {
        var t = this.h[this.user.username || ""];
        return !!t && !t.stoppedAt
    }
    joinGame() {
        this.emit("initializing"), this.ws.emit(v.EVENT_GAME_JOIN, (t, e) => {
            this.isShuttingDown = !1, this.startTime = Date.now() - e.elapsed, this.gameState = e.state, this.g(e.plays), this.gameId = e.gameId, this.maxWin = e.maxWin, this.maxWager = e.maxWager, this.history.set(e.history), this.onlineUserCount = e.online, this.gameState === v.GameState.IN_PROGRESS && (this.lastGameTick = Date.now()), this.isInitialized = !0, this.emit("initialized")
        })
    }
    bet(t) {
        if (this.nextBet = t, this.gameState === v.GameState.STARTING) return this.doBet();
        this.emit("bet_queued")
    }
    doBet() {
        this.isPlacingBet = !0, this.emit("placing_bet"), this.ws.emit(v.EVENT_PLACE_PLAYER_BET, this.nextBet, t => {
            if (t) {
                switch (console.error("place_bet error: ", t), t) {
                    case v.ERROR_NO_ENOUGH_MONEY:
                        this.o.error("Insufficient funds to place bet");
                        break;
                    case v.ERROR_GAME_IN_PROGRESS:
                    case v.ERROR_ALREADY_PLACED_BET:
                        break;
                    default:
                        window.location.reload()
                }
                this.nextBet = void 0, this.isPlacingBet = !1
            }
            this.emit("place_bet")
        })
    }
    cancelBet() {
        if (!this.nextBet || this.isPlacingBet) return console.error("Can not cancel next bet, wasn't going to make it...");
        this.nextBet = void 0, this.isPlacingBet = !1, this.emit("cancel_bet")
    }
    cashOut() {
        this.isCashingOut = !0, this.emit("cashing_out"), this.ws.emit(v.EVENT_PLAYER_CASHOUT, t => {
            t && (this.isCashingOut = !1, console.warn("Cashing out error: ", t))
        })
    }
    getElapsedTime() {
        return this.gameState === v.GameState.IN_PROGRESS && this.startTime && this.lastGameTick ? this.lag ? this.lastGameTick - this.startTime + 300 : Date.now() - this.startTime : 0
    }
}
b.default = O;
var p = {},
    u = T && T.__importDefault || function(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    };
Object.defineProperty(p, "__esModule", {
    value: !0
});
const j = S;
i = u(h);
const y = u(R);
class w extends i.default {
    constructor(t, i) {
        super(), this.ws = t, this.user = i, this.channel = y.default.chatChannel.get(), this.state = "CONNECTING", this.history = new j.CappedArray(j.CHAT_HISTORY_SIZE), i.on("initialized", () => {
            this.history.clear(), this.state = "CONNECTED", this.emit("connected"), this.joinChannel(this.channel)
        }), i.on("disconnected", () => {
            this.state = "DISCONNECTED", this.emit("disconnected")
        }), t.on("msg", t => {
            this.amIMentioned(t) && new Audio("/msg.mp3").play().then(j.noop), this.history.add(t), this.emit("change")
        }), t.on(j.EVENT_CHAT_MSG_DELETE, e => {
            this.history.filter(t => t.id !== e), this.emit("change")
        }), t.on(j.EVENT_CHAT_MSG_MUTE_CHANGE, s => {
            this.history.apply(t => {
                var e = i.moderator || !s.mute || i.isMe(s.user.username) && s.mute === j.MuteType.SHADOW,
                    n = t.findIndex(t => t.type === j.ChatType.SAY && t.id === s.id);
                return -1 < n ? e ? t[n] = s : t.splice(n, 1) : e && (t.push(s), t.sort((t, e) => {
                    t = new Date(t.createdAt), e = new Date(e.createdAt);
                    return t < e ? -1 : e < t ? 1 : 0
                })), t
            }), this.emit("change")
        }), t.on("error", t => {
            console.error("on error: ", t), this.emit("error", t)
        }), t.on("err", t => {
            console.error("Server sent us the error: ", t)
        })
    }
    amIMentioned(t) {
        if (t.type !== j.ChatType.SAY) return !1;
        if (t.mute) return !1;
        var e = this.user.username;
        if ((0, j.usernameEqual)(t.user.username, e)) return !1;
        const n = new RegExp("@" + e + "(?:$|[^a-z0-9_-])", "i");
        return n.test(t.message)
    }
    joinChannel(n) {
        this.emit("joining"), this.channel = n, y.default.chatChannel.set(n), this.ws.emit(j.EVENT_CHAT_JOIN_CHANNEL, n, (t, e) => {
            t ? console.error(`Error while joining channel:: ${n}`, t) : (this.history.clear().set(e), this.state = "JOINED", this.emit("joined"), this.emit("change"))
        })
    }
    say(t, e = !1) {
        this.ws.emit(j.EVENT_CHAT_SAY, t, e)
    }
    delete(t, e) {
        this.ws.emit(j.EVENT_CHAT_MSG_DELETE, t, e)
    }
    modifyMute(t, e) {
        this.ws.emit(j.EVENT_CHAT_MSG_MUTE_CHANGE, {
            id: t,
            mute: e
        })
    }
}
p.default = w;
var P = {};
! function(t) {
    var e = T && T.__importDefault || function(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    };
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.AutoPlayState = void 0;
    const i = S;
    var n, s = e(h);
    const r = e(R),
        a = t => Object.assign(Object.assign({}, t), {
            expiresAt: (t => {
                if (!(t < 0)) {
                    const e = new Date;
                    return e.setMilliseconds(e.getMilliseconds() + t), e
                }
            })(t.millis)
        });
    (e = n = t.AutoPlayState || (t.AutoPlayState = {})).ON = "on", e.OFF = "off", e.STARTING = "starting", e.STOPPING = "stopping";
    class u extends s.default {
        constructor(t) {
            super(), this.O = t, this.p = !1, this.j = !1, this.username = void 0, this.balance = 0, this.tea = 0, this.moderator = !1, this.plays = new i.CappedArray(40, !0), this.bonuses = [], this.friends = new Set, this.stkpushOff = !1, this.autoPlay = {
                state: n.OFF
            }, t.on("disconnect", () => {
                this.p = !1, this.j = !1, this.emit("disconnected")
            }), t.on("connect", () => {
                this.p = !0, this.emit("connected"), this.initialize()
            }), t.on(i.EVENT_WALLET_CHANGE, t => {
                var {
                    username: e,
                    amount: n,
                    absolute: s,
                    tea: t
                } = t;
                this.j && (0, i.usernameEqual)(e, this.username) && (this.balance = s ? n : Math.max(this.balance + n, 0), !t && 0 !== t || (this.tea = t), this.emit("change"))
            }), t.on(i.EVENT_BONUS_STATUS, t => {
                const {
                    username: e,
                    available: n,
                    code: s
                } = t;
                this.j && (0, i.usernameEqual)(e, this.username) && (n || (this.bonuses = this.bonuses.filter(t => t.code !== s)), this.emit("active_bonus_list_change"))
            }), t.on(i.EVENT_STKPUSH_OFF_STATUS, t => {
                this.stkpushOff = t, this.emit("stkpush_off_status_change")
            }), t.on(i.EVENT_AUTO_PLAY, t => {
                this.A(t), this.emit("auto_play_state_change")
            })
        }
        A(t) {
            this.autoPlay = {
                state: t ? n.ON : n.OFF,
                params: t
            }
        }
        M() {
            this.username = void 0, this.balance = 0, this.tea = 0, this.moderator = !1, this.plays.clear(), this.bonuses = [], this.stkpushOff = !1, this.friends = new Set
        }
        setToken(t) {
            r.default.jwt.set(t), this.O.auth.token = t, this.O.disconnect().connect()
        }
        addBalance(t) {
            this.balance += t, this.emit("change")
        }
        startAutoPlay(t) {
            this.autoPlay.state === n.OFF && (this.autoPlay = {
                state: n.STARTING,
                params: t
            }, this.O.emit(i.EVENT_AUTO_PLAY, t, t => {
                t && (this.autoPlay = {
                    state: n.OFF,
                    params: void 0
                })
            }), this.emit("auto_play_state_change"))
        }
        stopAutoPlay() {
            this.autoPlay.state === n.ON && (this.autoPlay.state = n.STOPPING, this.O.emit(i.EVENT_AUTO_PLAY), this.emit("auto_play_state_change"))
        }
        isMe(t) {
            return (0, i.usernameEqual)(this.username, t)
        }
        initialize() {
            if (this.p) {
                const n = () => {
                    this.j = !0, this.emit("initialized"), this.emit("change"), this.emit("auto_play_state_change")
                };
                var t = r.default.jwt.get();
                if (!t) return this.M(), void n();
                this.O.emit(i.EVENT_USER_INIT, t, (t, e) => {
                    t ? console.error("Error when joining the game...", t) : (e ? (this.balance = e.balance, this.tea = e.tea, this.username = e.username, this.moderator = e.moderator, this.bonuses = e.bonuses.map(a), this.friends = new Set(e.friends), this.plays.clear().set(e.plays), this.stkpushOff = e.stkpush_off, this.A(e.autoplay)) : (this.M(), r.default.jwt.clear()), n())
                })
            }
        }
        addPlay(t) {
            t && (this.plays.add(t), this.emit("change"))
        }
    }
    t.default = u
}(P);
var A = {};
Object.defineProperty(A, "__esModule", {
    value: !0
});
const M = S,
    E = {
        success: M.noop,
        error: M.noop
    };
A.default = class {
    constructor(t) {
        this.T = new Set, this.S = E, t.on(M.EVENT_TXN_CHECK_COMPLETE, t => {
            var {
                reference: e,
                type: n,
                message: t
            } = t;
            this.T.has(e) && (this.T.delete(e), e = `${t} - ${e}`, "error" === n ? this.error(e) : this.success(e))
        })
    }
    register(t) {
        this.T.add(t.toUpperCase())
    }
    setListeners(t) {
        this.S = t
    }
    error(t) {
        this.S.error(t)
    }
    success(t) {
        this.S.success(t)
    }
};
var I = {};
Object.defineProperty(I, "__esModule", {
        value: !0
    }), I.getConfig = void 0, I.getConfig = function() {
        var t = window.__MONEYPOT_CONFIG__;
        if (!t || !t.baseURL || !t.alerts) throw new Error("window.__MONEYPOT_CONFIG__ must be set before the client can be used");
        const {
            baseURL: e,
            alerts: n
        } = t;
        return {
            alertListeners: n,
            serverAddress: t => "production" === process.env.NODE_ENV ? e : `http://pakakumi.lh:${t?3040:3041}`,
            apiVersion: 10
        }
    },
    function(e) {
        var t = T && T.__importDefault || function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        };
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.engine = e.chat = e.user = e.alerts = void 0;
        const n = t(f.default),
            s = t(b),
            i = t(p),
            r = t(P),
            a = t(A),
            u = S,
            o = t(R),
            c = I,
            {
                serverAddress: h,
                alertListeners: l,
                apiVersion: d
            } = (0, c.getConfig)(),
            _ = (0, n.default)(h(!0), {
                query: {
                    v: d.toString()
                },
                auth: {
                    token: o.default.jwt.get()
                },
                extraHeaders: {
                    [u.API_VERSION_HEADER]: d.toString()
                },
                withCredentials: !0,
                transports: ["websocket", "polling"]
            });
        e.alerts = new a.default(_), e.alerts.setListeners(l), e.user = new r.default(_), e.chat = new i.default(_, e.user), e.engine = new s.default(_, e.user, e.alerts), _.on("update", () => {
            alert("Please refresh your browser! We just pushed a new update to the server!")
        }), _.on("error", t => {
            console.error("on error: ", t)
        }), _.on("err", t => {
            console.error("Server sent us the error: ", t), e.alerts.error(t.description)
        }), _.on("connect_error", t => {
            t.message === u.ERROR_OUTDATED_CLIENT || 403 == t.description ? (_.disconnect(), window.location.reload()) : _.io.opts.transports = ["polling", "websocket"]
        })
    }(N);
var C = {},
    u = {},
    z = {};
Object.defineProperty(z, "__esModule", {
    value: !0
}), z.apiErrorMessage = z.ApiError = void 0;
const D = "An error occurred while communicating to the server";
class k extends Error {
    constructor(t, e, n) {
        super(), this.status = t, this.message = this.msg = e || D, this.errors = n || []
    }
}
z.ApiError = k;
z.apiErrorMessage = (t, e) => t.errors && 0 < t.errors.length ? `${t.message}: ${t.errors[0].msg}` : 500 === t.status ? e || t.message || D : t.message || e || D;
i = T && T.__importDefault || function(t) {
    return t && t.__esModule ? t : {
        default: t
    }
};
Object.defineProperty(u, "__esModule", {
    value: !0
});
const L = i(t.default),
    U = S,
    G = i(R),
    x = z,
    B = i(e.default);
u.default = function(t, e) {
    const u = L.default.create({
        baseURL: t,
        headers: {
            [U.API_VERSION_HEADER]: String(e)
        }
    });
    u.defaults.withCredentials = !0, u.interceptors.request.use(t => {
        t.withCredentials = !0;
        var e = G.default.jwt.get();
        return e && (t.headers || (t.headers = {}), t.headers[U.AUTHORIZATION_HEADER] = `Bearer ${e}`), t
    });
    const o = t => t && t.response;
    return {
        get: (e = (r, a) => (t, n, s = {}) => {
            const i = new Set;
            var e = (0, B.default)(t, n).replace(/:(\w+)/g, (t, e) => {
                    if (!s.hasOwnProperty(e)) throw Error(`Missing param key "${e}" for "${n}"`);
                    return i.add(e), s[e]
                }),
                t = (0, U.omitKeys)(s, Array.from(i));
            return u.request({
                method: r,
                url: e,
                [a]: t
            }).then(t => t.data).catch(t => {
                if (o(t)) {
                    var {
                        status: e,
                        data: t
                    } = t.response;
                    throw 418 === e && window.location.reload(), 401 === e && G.default.jwt.get() && (G.default.jwt.clear(), window.location.reload()), new x.ApiError(e, t.message, t.errors)
                }
                throw new x.ApiError(500)
            })
        })("get", "params"),
        delete: e("delete", "params"),
        patch: e("patch", "data"),
        put: e("put", "data"),
        post: e("post", "data")
    }
};
e = T && T.__importDefault || function(t) {
    return t && t.__esModule ? t : {
        default: t
    }
};
Object.defineProperty(C, "__esModule", {
    value: !0
});
const $ = e(u),
    F = I,
    H = N;
e = function() {
    const {
        serverAddress: t,
        apiVersion: e
    } = (0, F.getConfig)();
    var n, s, i, r = (0, $.default)(t(!1), e);
    return {
        users: {
            get: t => i.get("/users", ":id", t),
            updatePassword: t => i.patch("/users", "me/password", t)
        },
        plays: {
            get: t => s.get("/plays", ":id", t),
            list: t => s.get("/plays", "", t)
        },
        games: {
            get: t => n.get("/games", ":id", t)
        },
        fundings: function(e) {
            const n = "/fundings";
            return {
                list: t => e.get(n, "", t),
                deposit: t => e.post(n, "deposit", t),
                verify: t => e.post(n, "verify", t).then(() => {
                    H.alerts.register(t.code)
                }),
                withdraw: t => e.post(n, "withdraw", t),
                activeBonus: () => e.get(n, "bonus")
            }
        }(n = s = i = r),
        referrals: function(e) {
            const n = "/referrals";
            return {
                list: t => e.get(n, "", t),
                summary: () => e.get(n, "summary"),
                payments: t => e.get(n, "payments", t),
                cashout: () => e.post(n, "payments")
            }
        }(r),
        friends: function(e) {
            const n = "/friends";
            return {
                add: t => e.post(n, ":id", t).then(t => {
                    H.user.friends.add(t)
                }),
                delete: t => e.delete(n, ":id", t).then(t => {
                    H.user.friends.delete(t)
                }),
                list: () => e.get(n, "")
            }
        }(r),
        auth: function(e) {
            const n = "auth",
                s = ({
                    token: t
                }) => {
                    H.user.setToken(t)
                };
            return {
                logout: () => e.get(n, "logout").catch(console.log).then(() => s({
                    token: ""
                })),
                login: t => e.post(n, "login", t).then(s),
                register: t => e.post(n, "register", t).then(s),
                sendPasswordResetToken: t => e.post(n, "password-reset-token", t),
                resetPassword: t => e.post(n, "password-reset", t).then(s)
            }
        }(r),
        admin: function(e) {
            const n = "/admin";
            return {
                summary: () => e.get(n, "summary"),
                users: t => e.get(n, "users", t),
                fundings: t => e.get(n, "fundings", t),
                userReferrals: t => e.get(n, "users/:id/referrals", t)
            }
        }(r)
    }
}();
C.default = e;
var V = {};
Object.defineProperty(V, "__esModule", {
    value: !0
});
const q = o.default,
    Y = N;
V.default = function() {
    const [t, e] = (0, q.useState)([]);
    return (0, q.useEffect)(() => {
        const t = () => e([...Y.chat.history.toArray()]);
        return t(), Y.chat.on("change", t), () => {
            Y.chat.off("change", t)
        }
    }, []), t
};
var W = {},
    u = T && T.__importDefault || function(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    };
Object.defineProperty(W, "__esModule", {
    value: !0
});
const X = o.default,
    J = u(V);
W.default = function(e) {
    const t = (0, J.default)();
    return (0, X.useMemo)(() => t.find(t => t.id === e), [t, e])
};
var K = {};
Object.defineProperty(K, "__esModule", {
    value: !0
});
const Q = o.default,
    Z = N;
K.default = function() {
    const [t, n] = (0, Q.useState)([]);
    return (0, Q.useEffect)(() => {
        const e = e => Z.user.plays.get(t => t.gameId === e),
            t = () => {
                n(Z.engine.history.toArray().map(t => Object.assign(Object.assign({}, t), {
                    play: e(t.gameId)
                })))
            };
        return Z.engine.on("initialized", t), Z.engine.on("game_crash", t), Z.engine.isInitialized && t(), () => {
            Z.engine.off("initialized", t), Z.engine.off("game_crash", t)
        }
    }, []), t
};
var tt = {},
    e = {};
Object.defineProperty(e, "__esModule", {
    value: !0
});
const et = o.default;
e.default = function(s) {
    (0, et.useEffect)(() => {
        let t;
        const e = () => {
                s(), n()
            },
            n = () => {
                t = window.requestAnimationFrame(e)
            };
        return n(), () => {
            t && window.cancelAnimationFrame(t)
        }
    }, [s])
};
u = T && T.__importDefault || function(t) {
    return t && t.__esModule ? t : {
        default: t
    }
};
Object.defineProperty(tt, "__esModule", {
    value: !0
});
const nt = S,
    st = o.default,
    it = u(e),
    rt = N;
tt.default = function() {
    const [t, s] = (0, st.useState)({
        ready: !1,
        state: nt.GameState.ENDED,
        payout: 1,
        timeToStart: "",
        lastPayout: 0,
        elapsedTime: 0
    });
    var e = (0, st.useCallback)(() => {
        var t, e = rt.engine.startTime || 1,
            n = rt.engine.getElapsedTime();
        s({
            ready: rt.engine.isInitialized,
            state: rt.engine.gameState,
            payout: (0, nt.toAtMostTwoDecimalPlaces)((0, nt.timeToMultiplier)(n)),
            timeToStart: Math.max(0, (e - Date.now()) / 1e3).toFixed(1),
            lastPayout: (t = rt.engine.history.getAtIndex(0)) ? t.gameCrash : 0,
            elapsedTime: n,
            play: rt.engine.getPlayByUsername(rt.user.username || "")
        })
    }, []);
    return (0, it.default)(e), t
};
var at = {};
Object.defineProperty(at, "__esModule", {
    value: !0
});
const ut = o.default,
    ot = S,
    ct = N;
at.default = function() {
    const [t, e] = (0, ut.useState)(ot.GameState.ENDED);
    return (0, ut.useEffect)(() => {
        const t = () => {
            e(ct.engine.gameState)
        };
        return ct.engine.on("*", t), () => {
            ct.engine.off("*", t)
        }
    }, []), t
};
var ht = {};
Object.defineProperty(ht, "__esModule", {
    value: !0
});
const lt = o.default,
    dt = S,
    _t = N;
ht.default = function() {
    const [t, e] = (0, lt.useState)({
        maxWager: 1e3
    });
    return (0, lt.useEffect)(() => {
        const t = () => e({
            maxWager: _t.engine.maxWager || 1e3
        });
        return t(), _t.engine.on(dt.EVENT_GAME_STARTING, t), _t.engine.on("initialized", t), () => {
            _t.engine.off(dt.EVENT_GAME_STARTING, t), _t.engine.off("initialized", t)
        }
    }, []), t
};
var ft = {};
Object.defineProperty(ft, "__esModule", {
    value: !0
});
const bt = o.default,
    vt = P,
    gt = N;
ft.default = function() {
    const [t, e] = (0, bt.useState)(vt.AutoPlayState.OFF);
    return (0, bt.useEffect)(() => {
        const t = () => {
            e(gt.user.autoPlay.state)
        };
        return gt.user.on("auto_play_state_change", t), () => {
            gt.user.off("auto_play_state_change", t)
        }
    }, []), t
};
var mt = {};
Object.defineProperty(mt, "__esModule", {
    value: !0
}), mt.default = function(t) {
    return (t => {
        const [e, n] = t.toString().split(".");
        if (!n) return e;
        const s = [];
        let i = !1;
        n.split("").some(t => (s.push(t), i ? !0 : (i = "0" !== t, !1)));
        const r = s.join("").replace(/0+$/, "");
        return "0" !== e && r.match(/^00/) ? e : `${e}.${r}`
    })(100 / t - 1 / t)
};
var Ot = {};
! function(t) {
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.BetState = void 0;
    const e = o.default,
        s = S,
        i = N;
    var r, n;
    (n = r = t.BetState || (t.BetState = {})).IDLE = "idle", n.PLACING = "placing", n.PLAYING = "playing", n.CASHING_OUT = "cashing_out", n.QUEUED = "queued", t.default = function() {
        const [t, n] = (0, e.useState)(r.IDLE);
        return (0, e.useEffect)(() => {
            const t = () => i.engine.isCashingOut ? r.CASHING_OUT : i.engine.isPlacingBet ? r.PLACING : i.engine.nextBet ? r.QUEUED : i.engine.isBetActive && i.engine.gameState !== s.GameState.ENDED ? r.PLAYING : r.IDLE,
                e = () => {
                    n(t())
                };
            return i.engine.on("*", e), () => {
                i.engine.off("*", e)
            }
        }, []), t
    }
}(Ot);
var pt = {};
Object.defineProperty(pt, "__esModule", {
    value: !0
});
const jt = o.default,
    yt = N;
pt.default = function() {
    const [t, e] = (0, jt.useState)({
        onlineCount: 0,
        playCount: 0,
        playTotal: 0,
        winCount: 0,
        winTotal: 0,
        netProfit: 0
    });
    return (0, jt.useEffect)(() => {
        const t = () => {
            const n = {
                onlineCount: yt.engine.onlineUserCount,
                playCount: 0,
                playTotal: 0,
                winCount: 0,
                winTotal: 0,
                netProfit: 0
            };
            yt.engine.rawPlays.forEach(t => {
                var {
                    bet: e,
                    stoppedAt: t
                } = t;
                n.playCount++, n.playTotal += e, t && (n.winCount++, n.winTotal += t * e)
            }), n.netProfit = n.winTotal - n.playTotal, e(n)
        };
        return yt.engine.on("initialized", t), yt.engine.on("online_count", t), yt.engine.on("plays:new", t), yt.engine.on("plays:cashout", t), yt.engine.on("plays:refresh", t), yt.engine.isInitialized && t(), () => {
            yt.engine.off("initialized", t), yt.engine.off("online_count", t), yt.engine.off("plays:new", t), yt.engine.off("plays:cashout", t), yt.engine.off("plays:refresh", t)
        }
    }, []), t
};
var wt = {};
Object.defineProperty(wt, "__esModule", {
    value: !0
});
const At = o.default,
    Mt = N,
    Et = n.default;
wt.default = function() {
    const [t, e] = (0, At.useState)([]);
    return (0, At.useEffect)(() => {
        const t = (0, Et.throttle)(100, () => {
            e(Mt.engine.plays)
        });
        return Mt.engine.on("plays:refresh", t), Mt.engine.on("plays:new", t), Mt.engine.on("plays:cashout", t), Mt.engine.isInitialized && t(), () => {
            Mt.engine.off("plays:refresh", t), Mt.engine.off("plays:new", t), Mt.engine.off("plays:cashout", t)
        }
    }, []), t
};
var Tt = {};
Object.defineProperty(Tt, "__esModule", {
    value: !0
});
const St = o.default,
    Nt = S,
    Rt = N;
Tt.default = function() {
    const [t, e] = (0, St.useState)(!1);
    return (0, St.useEffect)(() => {
        const t = () => e(Rt.engine.isShuttingDown && Rt.engine.gameState === Nt.GameState.ENDED);
        return t(), Rt.engine.on(Nt.EVENT_SERVER_SHUTDOWN_REQUESTED, t), Rt.engine.on(Nt.EVENT_GAME_STARTING, t), Rt.engine.on(Nt.EVENT_GAME_CRASH, t), Rt.engine.on("initialized", t), () => {
            Rt.engine.off(Nt.EVENT_SERVER_SHUTDOWN_REQUESTED, t), Rt.engine.off(Nt.EVENT_GAME_STARTING, t), Rt.engine.off(Nt.EVENT_GAME_CRASH, t), Rt.engine.off("initialized", t)
        }
    }, []), t
};
var Pt = {};
Object.defineProperty(Pt, "__esModule", {
    value: !0
});
const It = o.default,
    Ct = P,
    zt = N;
Pt.default = function() {
    const [t, e] = (0, It.useState)(!1);
    return (0, It.useEffect)(() => {
        function t() {
            e(zt.user.autoPlay.state !== Ct.AutoPlayState.OFF)
        }
        return zt.user.on("auto_play_state_change", t), () => {
            zt.user.off("auto_play_state_change", t)
        }
    }, []), t
};
var Dt = {};
Object.defineProperty(Dt, "__esModule", {
    value: !0
});
const kt = o.default,
    Lt = N;
Dt.default = function() {
    const [t, n] = (0, kt.useState)({
        stkPushOff: !1,
        activeBonus: void 0
    });
    return (0, kt.useEffect)(() => {
        const t = () => {
            const e = new Date;
            var t = Lt.user.bonuses.filter(({
                expiresAt: t
            }) => !t || t > e);
            n({
                stkPushOff: Lt.user.stkpushOff,
                activeBonus: 0 < t.length ? t[0] : void 0
            })
        };
        return Lt.user.on("initialized", t), Lt.user.on("active_bonus_list_change", t), t(), () => {
            Lt.user.off("initialized", t), Lt.user.off("active_bonus_list_change", t)
        }
    }, []), t
};
var Ut = {};
Object.defineProperty(Ut, "__esModule", {
    value: !0
});
const Gt = o.default,
    xt = N,
    Bt = t => xt.user.friends.has(t);
Ut.default = function(t) {
    const [e, n] = (0, Gt.useState)(Bt(t));
    return (0, Gt.useEffect)(() => {
        n(Bt(t))
    }, [t]), e
};
var $t = {};
Object.defineProperty($t, "__esModule", {
    value: !0
});
const Ft = o.default,
    Ht = N;
$t.default = function() {
    const [t, e] = (0, Ft.useState)(!1);
    return (0, Ft.useEffect)(() => {
        const t = () => e(!0);
        return Ht.user.once("initialized", t), () => {
            Ht.user.off("initialized", t)
        }
    }, []), t
};
var Vt = {};
Object.defineProperty(Vt, "__esModule", {
    value: !0
}), Vt.useUserTEA = Vt.useUserBalance = Vt.useUserLoggedIn = Vt.useUsername = Vt.useIsModerator = void 0;
const qt = o.default,
    Yt = S,
    Wt = N;

function Xt(e) {
    const [t, n] = (0, qt.useState)(Wt.user[e]);
    return (0, qt.useEffect)(() => {
        const t = () => n(Wt.user[e]);
        return Wt.user.on("initialized", t), Wt.user.on("change", t), () => {
            Wt.user.off("initialized", t), Wt.user.off("change", t)
        }
    }, [e]), t
}

function Jt() {
    return Xt("username")
}
Vt.useIsModerator = function() {
    return Xt("moderator")
}, Vt.useUsername = Jt, Vt.useUserLoggedIn = function() {
    return !!Jt()
};
n = e => () => {
    var t = Xt(e);
    return t && (0, Yt.toAtMostTwoDecimalPlaces)(t)
};
Vt.useUserBalance = n("balance"), Vt.useUserTEA = n("tea");
var Kt = {};
Object.defineProperty(Kt, "__esModule", {
    value: !0
});
const Qt = o.default;
Kt.default = function(s, i) {
        return function(t) {
            const n = (0, Qt.memo)(t);
            return t => {
                var e = s(),
                    e = i ? i(e) : e;
                return (0, Qt.createElement)(n, Object.assign(Object.assign({}, e), t))
            }
        }
    },
    function(t) {
        var e = T && T.__importDefault || function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.USERNAME_REGEX = t.USERNAME_MAX_LENGTH = t.usernameEqual = t.MuteType = t.isModerator = t.ChatType = t.GameState = t.timeToMultiplier = t.multiplierToTime = t.playId = t.betProfit = t.injectStateAndMemoize = t.apiErrorMessage = t.ApiError = t.useUserLoggedIn = t.useIsModerator = t.useUserTEA = t.useUserBalance = t.useUsername = t.useUserInitialized = t.useIsFriend = t.useDepositOptions = t.stopAutoplay = t.startAutoplay = t.useAutoPlayOn = t.cashout = t.cancelBet = t.placeBet = t.useIsServerRestarting = t.useRoundPlays = t.useRoundSummary = t.AutoPlayState = t.BetState = t.useBetState = t.calculateWinChancePercentage = t.useAutoPlayState = t.useGameLimits = t.useGameState = t.useGameTick = t.useGameHistory = t.isMessageValid = t.isLoggedUserMentioned = t.sendChatMessage = t.deleteChatMessage = t.unmuteChatMessage = t.muteChatMessage = t.useChatMessage = t.useChatMessages = t.Db = t.api = void 0, t.mPesaWithdrawFee = t.MIN_TRANSACTION_AMOUNT = t.MAX_TRANSACTION_AMOUNT = t.REFERRAL_PAYOUT_MILLIS_THRESHOLD = t.REFERRAL_PAYOUT_AMOUNT_THRESHOLD = t.ERROR_REFERRAL_PAYOUT_TOO_SOON = t.ERROR_REFERRAL_PAYOUT_INSUFFICIENT_PAYOUT = t.toAtMostTwoDecimalPlaces = t.TxnStatus = t.SortDirection = t.noop = t.pick = t.BET_MIN_AMOUNT = t.AutoPlayStakeAction = void 0;
        const n = S,
            s = N;
        var i = C;
        Object.defineProperty(t, "api", {
            enumerable: !0,
            get: function() {
                return e(i).default
            }
        });
        var r = R;
        Object.defineProperty(t, "Db", {
            enumerable: !0,
            get: function() {
                return e(r).default
            }
        });
        var a = V;
        Object.defineProperty(t, "useChatMessages", {
            enumerable: !0,
            get: function() {
                return e(a).default
            }
        });
        var u = W;
        Object.defineProperty(t, "useChatMessage", {
            enumerable: !0,
            get: function() {
                return e(u).default
            }
        });
        t.muteChatMessage = t => s.chat.modifyMute(t, n.MuteType.SHADOW);
        t.unmuteChatMessage = t => s.chat.modifyMute(t, void 0);
        t.deleteChatMessage = (t, e) => s.chat.delete(t, e);
        t.sendChatMessage = t => s.chat.say(t);
        t.isLoggedUserMentioned = t => s.chat.amIMentioned(t), t.isMessageValid = function(t) {
            return t && "string" == typeof t && 1 <= t.length && t.length < 500
        };
        var o = K;
        Object.defineProperty(t, "useGameHistory", {
            enumerable: !0,
            get: function() {
                return e(o).default
            }
        });
        var c = tt;
        Object.defineProperty(t, "useGameTick", {
            enumerable: !0,
            get: function() {
                return e(c).default
            }
        });
        var h = at;
        Object.defineProperty(t, "useGameState", {
            enumerable: !0,
            get: function() {
                return e(h).default
            }
        });
        var l = ht;
        Object.defineProperty(t, "useGameLimits", {
            enumerable: !0,
            get: function() {
                return e(l).default
            }
        });
        var d = ft;
        Object.defineProperty(t, "useAutoPlayState", {
            enumerable: !0,
            get: function() {
                return e(d).default
            }
        });
        var _ = mt;
        Object.defineProperty(t, "calculateWinChancePercentage", {
            enumerable: !0,
            get: function() {
                return e(_).default
            }
        });
        var f = Ot;
        Object.defineProperty(t, "useBetState", {
            enumerable: !0,
            get: function() {
                return e(f).default
            }
        }), Object.defineProperty(t, "BetState", {
            enumerable: !0,
            get: function() {
                return f.BetState
            }
        });
        var b = P;
        Object.defineProperty(t, "AutoPlayState", {
            enumerable: !0,
            get: function() {
                return b.AutoPlayState
            }
        });
        var v = pt;
        Object.defineProperty(t, "useRoundSummary", {
            enumerable: !0,
            get: function() {
                return e(v).default
            }
        });
        var g = wt;
        Object.defineProperty(t, "useRoundPlays", {
            enumerable: !0,
            get: function() {
                return e(g).default
            }
        });
        var m = Tt;
        Object.defineProperty(t, "useIsServerRestarting", {
            enumerable: !0,
            get: function() {
                return e(m).default
            }
        });
        t.placeBet = t => s.engine.bet(t);
        t.cancelBet = () => s.engine.cancelBet();
        t.cashout = () => s.engine.cashOut();
        var O = Pt;
        Object.defineProperty(t, "useAutoPlayOn", {
            enumerable: !0,
            get: function() {
                return e(O).default
            }
        });
        t.startAutoplay = t => s.user.startAutoPlay(t);
        t.stopAutoplay = () => s.user.stopAutoPlay();
        var p = Dt;
        Object.defineProperty(t, "useDepositOptions", {
            enumerable: !0,
            get: function() {
                return e(p).default
            }
        });
        var j = Ut;
        Object.defineProperty(t, "useIsFriend", {
            enumerable: !0,
            get: function() {
                return e(j).default
            }
        });
        var y = $t;
        Object.defineProperty(t, "useUserInitialized", {
            enumerable: !0,
            get: function() {
                return e(y).default
            }
        });
        var w = Vt;
        Object.defineProperty(t, "useUsername", {
            enumerable: !0,
            get: function() {
                return w.useUsername
            }
        }), Object.defineProperty(t, "useUserBalance", {
            enumerable: !0,
            get: function() {
                return w.useUserBalance
            }
        }), Object.defineProperty(t, "useUserTEA", {
            enumerable: !0,
            get: function() {
                return w.useUserTEA
            }
        }), Object.defineProperty(t, "useIsModerator", {
            enumerable: !0,
            get: function() {
                return w.useIsModerator
            }
        }), Object.defineProperty(t, "useUserLoggedIn", {
            enumerable: !0,
            get: function() {
                return w.useUserLoggedIn
            }
        });
        var A = z;
        Object.defineProperty(t, "ApiError", {
            enumerable: !0,
            get: function() {
                return A.ApiError
            }
        }), Object.defineProperty(t, "apiErrorMessage", {
            enumerable: !0,
            get: function() {
                return A.apiErrorMessage
            }
        });
        var M = Kt;
        Object.defineProperty(t, "injectStateAndMemoize", {
            enumerable: !0,
            get: function() {
                return e(M).default
            }
        });
        t.betProfit = (t, e) => e ? t * e - t : -t;
        t.playId = (t, e) => `${t}-${e}`;
        var E = S;
        Object.defineProperty(t, "multiplierToTime", {
            enumerable: !0,
            get: function() {
                return E.multiplierToTime
            }
        }), Object.defineProperty(t, "timeToMultiplier", {
            enumerable: !0,
            get: function() {
                return E.timeToMultiplier
            }
        }), Object.defineProperty(t, "GameState", {
            enumerable: !0,
            get: function() {
                return E.GameState
            }
        }), Object.defineProperty(t, "ChatType", {
            enumerable: !0,
            get: function() {
                return E.ChatType
            }
        }), Object.defineProperty(t, "isModerator", {
            enumerable: !0,
            get: function() {
                return E.isModerator
            }
        }), Object.defineProperty(t, "MuteType", {
            enumerable: !0,
            get: function() {
                return E.MuteType
            }
        }), Object.defineProperty(t, "usernameEqual", {
            enumerable: !0,
            get: function() {
                return E.usernameEqual
            }
        }), Object.defineProperty(t, "USERNAME_MAX_LENGTH", {
            enumerable: !0,
            get: function() {
                return E.USERNAME_MAX_LENGTH
            }
        }), Object.defineProperty(t, "USERNAME_REGEX", {
            enumerable: !0,
            get: function() {
                return E.USERNAME_REGEX
            }
        }), Object.defineProperty(t, "AutoPlayStakeAction", {
            enumerable: !0,
            get: function() {
                return E.AutoPlayStakeAction
            }
        }), Object.defineProperty(t, "BET_MIN_AMOUNT", {
            enumerable: !0,
            get: function() {
                return E.BET_MIN_AMOUNT
            }
        }), Object.defineProperty(t, "pick", {
            enumerable: !0,
            get: function() {
                return E.pick
            }
        }), Object.defineProperty(t, "noop", {
            enumerable: !0,
            get: function() {
                return E.noop
            }
        }), Object.defineProperty(t, "SortDirection", {
            enumerable: !0,
            get: function() {
                return E.SortDirection
            }
        }), Object.defineProperty(t, "TxnStatus", {
            enumerable: !0,
            get: function() {
                return E.TxnStatus
            }
        }), Object.defineProperty(t, "toAtMostTwoDecimalPlaces", {
            enumerable: !0,
            get: function() {
                return E.toAtMostTwoDecimalPlaces
            }
        }), Object.defineProperty(t, "ERROR_REFERRAL_PAYOUT_INSUFFICIENT_PAYOUT", {
            enumerable: !0,
            get: function() {
                return E.ERROR_REFERRAL_PAYOUT_INSUFFICIENT_PAYOUT
            }
        }), Object.defineProperty(t, "ERROR_REFERRAL_PAYOUT_TOO_SOON", {
            enumerable: !0,
            get: function() {
                return E.ERROR_REFERRAL_PAYOUT_TOO_SOON
            }
        }), Object.defineProperty(t, "REFERRAL_PAYOUT_AMOUNT_THRESHOLD", {
            enumerable: !0,
            get: function() {
                return E.REFERRAL_PAYOUT_AMOUNT_THRESHOLD
            }
        }), Object.defineProperty(t, "REFERRAL_PAYOUT_MILLIS_THRESHOLD", {
            enumerable: !0,
            get: function() {
                return E.REFERRAL_PAYOUT_MILLIS_THRESHOLD
            }
        }), Object.defineProperty(t, "MAX_TRANSACTION_AMOUNT", {
            enumerable: !0,
            get: function() {
                return E.MAX_TRANSACTION_AMOUNT
            }
        }), Object.defineProperty(t, "MIN_TRANSACTION_AMOUNT", {
            enumerable: !0,
            get: function() {
                return E.MIN_TRANSACTION_AMOUNT
            }
        }), Object.defineProperty(t, "mPesaWithdrawFee", {
            enumerable: !0,
            get: function() {
                return E.mPesaWithdrawFee
            }
        })
    }(s), module.exports = c(s);