const settings = {
    serverHost: (process.env.NODE_ENV === "production") ? process.env.serverHost : "http://localhost:3001",
    batchId:["OREPOR201901FSF3"]
}

export default settings;