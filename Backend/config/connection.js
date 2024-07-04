mongoose.connect('mongodb://localhost:27017/react-login-signup', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("MongoDB connected successfully");
}).catch((err) => {
    console.error("MongoDB connection failed:", err);
});

module.exports = mongoose;
