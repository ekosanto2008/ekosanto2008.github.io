var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BDWdih6d98g8fA17AxBFFmmeG66T3SV6rqu92Y2SYU-K_oY0NqDWrGak3ApSAVfwMCZ4LFcocIs62E8KSz-eLfc",
   "privateKey": "g1yxpLfhhjsmsPKDrbosagDE54I2DKf4nFmCCDjJVOw"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/ewe4eN7qDDU:APA91bFHsMTbbP9jiIcDy_fMe9Fcl7OxZ5t26GpkSrv-gAwWeGNe1vToB4xjcZNIrcZ_ge7mNgKqNjBqXB92KhK5Zxe4R9XAvH7xI9wlEZXVPeh7LWlLYCCzC9kRojZHrUlPk4mc6IbM",
   "keys": {
       "p256dh": "BJHlys2kLbtTYsSQrbcCOe3vwNogHWvm1MF7U8tPNqvm39DtgVwdHMfIPcTWivz0f20kIxyjXa+qKewAk+DrLn4=",
       "auth": "oFa01icmyJ+a3K9TiHsWwg=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '767122108478',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);