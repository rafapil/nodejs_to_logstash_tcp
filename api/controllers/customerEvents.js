const UUID = require('uuid/v4');
const config = require('config');

const TcpConnectionPool = require('../class/TcpConnectionPool').TcpConnectionPool;

const tcpConnectionPool = new TcpConnectionPool();

module.exports = () => {
    const customerEventsDB = require('../data/customerEvents.json');
    const controller = {};

    let index;

    // nesse exemplo utilizo o mock como uma ideia de fila exemplo não sendo obrigatorio 
    // e mesmo que utilize é preciso melhorar
    const {
        customerEvents: customerEventsMock,
    } = customerEventsDB;

    function sendLog(logObject) {
        tcpConnectionPool.send(logObject);
    }

    controller.listCustomerEvents = (req, res) => res.status(200).json(customerEventsDB);

    controller.saveCustomerEvents = (req, res) => {
        customerEventsMock.data.push({
            // Aqui é o padrao de log neste caso todo o conteudo menos o UUID foi colocado manualmente 
            // mas a ideia é exemplificar a estrutura 
            // entao basta criar um objeto desta forma e atribuir os devidos valores nas chaves correspondentes
            "ecs.version": "1.6",
            "transaction.id": UUID(),
            "service.version": "1.0",
            "organization.name": "filgs_empresa",
            "createdAt": "2019-10-18T16:37:58.979Z",
            "log.level": "INFO",
            "source.port": 63885,
            "appName": "meu-log",
            "version": 1,
            "ResponseTime": 0.25,
            "integration": "Service xpto",
            "source.ip": "172.29.188.10",
            "dns.answers.name": "emrpesa-teste.com.br/catalog",
            "log.logger": "com.netflix.discovery.shared.resolver.aws.ConfigClusterResolver",
            "message": "Resolving eureka endpoints via configuration"
        });

        // Aqui é apenas pra pegar o valor lá do mock
        index = customerEventsMock.data.length - 1;

        // Nesta func e disparada a acao de envio 
        sendLog(customerEventsMock.data[index]);

        // aqui é somente status mesmo do post pra esse codigo rodar 
        res.status(201).json(customerEventsMock.data[index]);
    }

    return controller;
}

