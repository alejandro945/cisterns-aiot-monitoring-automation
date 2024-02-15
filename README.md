# Automatización de la lectura de medidores analógicos de agua basada en AIoT para asegurar la normativa ambiental de la Universidad ICESI

## Contexto
Actualmente, el personal de Planta Física de la Universidad Icesi realiza registros manuales periódicos de los medidores de agua analógicos en la propiedad universitaria. La institución alberga diez aljibes, según la información proporcionada por la oficina de Planta Física y Gestión Ambiental. De estos, siete aljibes tienen acceso a la red de internet pública de la universidad, mientras que los otros tres, ubicados en zonas alejadas, no permiten la recolección automatizada de datos debido a la falta de acceso a esta red.

## Objetivos 

### General
 
Desarrollar y validar un sistema tele-informático que permita automatizar el proceso de registro de lecturas de medidores analógicos de agua de los aljibes en la Universidad Icesi, para asegurar el cumplimiento de la normativa ambiental.

### Específicos
 
1.	Validar el funcionamiento del sistema AIoT de medición implementado previamente.
2.	Proponer una arquitectura que permita escalar el sistema AIoT en todo el campus de la Universidad Icesi. 
3.	Implementar una infraestructura de comunicación y almacenamiento de datos para la medición de los nodos de AIoT.
4.	Desarrollar un módulo de reportes, alertas y descarga de datos basados en el consumo de agua de los aljibes.
   
## Infrastructure

![image](https://github.com/alejandro945/cisterns-aiot-monitoring-automation/assets/64285906/4a1050bc-38bc-4e78-bf12-6830f6fd9cca)

## Deployment


### Kafka

```bash
minikube start --memory 8192 --cpus 2
kubectl create namespace kafka
kubectl create -f 'https://strimzi.io/install/latest?namespace=kafka' -n kafka
kubectl apply -f https://strimzi.io/examples/latest/kafka/kafka-persistent-single.yaml -n kafka 
kubectl wait kafka/my-cluster --for=condition=Ready --timeout=300s -n kafka 
```

### UI

```bash
helm repo add kafka-ui https://provectus.github.io/kafka-ui-charts
helm install kafka-ui kafka-ui/kafka-ui \
   --set envs.config.KAFKA_CLUSTERS_0_NAME=local \
   --set envs.config.KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS=my-cluster-kafka-bootstrap:9092 \
   --namespace kafka
```

## Delete resources

```bash
kubectl -n kafka delete -f 'https://strimzi.io/install/latest?namespace=kafka'
kubectl -n kafka delete $(kubectl get strimzi -o name -n kafka)
helm uninstall kafka-ui -n kafka
minikube stop
```
