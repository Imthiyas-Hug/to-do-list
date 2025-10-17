const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ["./src/template.html"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
        }),
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"]
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
    resolve: {
        fallback: {
            "vm": require.resolve("vm-browserify"),
            "url": require.resolve("url/"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer/"),
            "process": require.resolve("process/browser"),
            "path": require.resolve("path-browserify"),
            "assert": require.resolve("assert/"),
            "util": require.resolve("util/"),
            "os": require.resolve("os-browserify/browser"),
            "https": require.resolve("https-browserify"),
            "http": require.resolve("stream-http"),
            "zlib": require.resolve("browserify-zlib"),
            "tty": require.resolve("tty-browserify"),
            "constants": require.resolve("constants-browserify"),
            "querystring": require.resolve("querystring-es3"),
            "inspector": false,

            // Disable Node-only modules
            "fs": false,
            "child_process": false,
            "worker_threads": false,
            "module": false,
            "@swc/core": false,
            "esbuild": false
        }
    },
    ignoreWarnings: [
        {
            module: /ObjectMiddleware\.js|jest-worker|loader-runner|terser-webpack-plugin|ProfilingPlugin/,
            message: /Critical dependency: the request of a dependency is an expression/,
        },
        {
            module: /terser-webpack-plugin/,
            message: /require function is used in a way in which dependencies cannot be statically extracted/,
        }
    ]
};