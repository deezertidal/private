var obj = JSON.parse($response.body);
 obj= {
  "status": "ok",
  "data": {
  "contact_id": 27326,
  "name": "deezertidal",
  "firstname": "tidal",
  "lastname": "deezer",
   "email": "",
 "userpic": "https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Spotify.png",
   "userpic_minor": "",
   "update_datetime": 1574144842,
   "signup_date": "2019-11-19",
   "subscription_type": "premium",
   "subscription_expires": "2098-08-20",
   "family_id": null,
   "family_invitation_key": null,
   "family_role": "adult",
   "family_hash": null,
   "device_stat": {
    "desktop_first_login_datetime": 0,
    "mobile_first_login_datetime": 1574144846,
    "desktop_last_login_datetime": 0,
    "mobile_last_login_datetime": 1574144846,
    "desktop_login_counter": 0,
    "mobile_login_counter": 1
   }
  }
 };
$done({body: JSON.stringify(obj)});
//