# App super simples com um exemplo para enviar dados para o logstash com node usanto tcp

### Segue exemplo do pipeline usado no logstash. 

        input {
            beats {
                port => 5044
            }

            tcp {
                port => 5000
                # codec => "json"
            }
    }

    ## Add your filters / logstash plugins configuration here

    output {
        elasticsearch {
            ssl => true
            ssl_certificate_verification => false
        hosts => "https://odfe-node1:9200"
        user => "admin"
        password => "admin"
            # disable elasticsearch oficial features
        ecs_compatibility => disabled
            ilm_enabled => false
            # indice name
            index => "logstash-node-app"
        }
    }