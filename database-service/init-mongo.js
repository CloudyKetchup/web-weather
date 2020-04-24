db.createUser({
    user : "CloudyKetchup",
    pwd : "1111",
    roles : [{
        role : "readWrite",
        db : "weather_app"
    }]
});