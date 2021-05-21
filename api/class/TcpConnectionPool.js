"use strict";

const config            = require('config');
const http              = require('http');
const LOGSTASH_IP       = config.get('logstash.dns'); //  endereco logstash
const LOGSTASH_PORT     = config.get('logstash.port'); // porta do pipeline logstash
const LOGSTASH_QUIET    = false;
const ENABLED           = LOGSTASH_IP && LOGSTASH_PORT ? true : false;
const QUIET             =
    LOGSTASH_QUIET == "false" || LOGSTASH_QUIET == false ? false : true;

if (LOGSTASH_IP && LOGSTASH_PORT) {
    console.log("[INFO] logstash setting: " + LOGSTASH_IP + ":" + LOGSTASH_PORT);
} else {
    console.log(
        "[WARN] logstash setting is missing or ignored ip:port --> %s:%s",
        LOGSTASH_IP,
        LOGSTASH_PORT
    );
}

class TcpConnectionPool {

    // para o log - https://www.npmjs.com/package/node-logstash-send
    send(data) {
        if (ENABLED) {
            let post_data = JSON.stringify(data);
            let post_options = {
                host: LOGSTASH_IP,
                port: LOGSTASH_PORT,
                // path: "/",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Length": Buffer.byteLength(post_data),
                },
            };

            let post_req = http.request(post_options);
            post_req.on("error", (e) => {
                if (QUIET) {
                    // ignora todos os erros aqui voce pode colocar uma tratativa se quiser
                } else {
                    console.log(e);
                }
            });

            // postar os dados no logstash
            post_req.write(post_data);
            // post_req.end();


        }
    }

}

module.exports.TcpConnectionPool = TcpConnectionPool;
