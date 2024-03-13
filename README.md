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

## Network

![image](https://github.com/alejandro945/cisterns-aiot-monitoring-automation/assets/64285906/958833a7-a837-4566-ac1c-b672182429cf)

## Infrastructure

![image](https://github.com/alejandro945/cisterns-aiot-monitoring-automation/assets/64285906/98a30ab7-05fc-4088-a8c4-79cdf3a7663b)

## IOT 4 Layers

![image](https://github.com/alejandro945/cisterns-aiot-monitoring-automation/assets/64285906/bafb3114-074f-4920-a3dd-135c4032a9c8)

## AIoT Flow

![image](https://github.com/alejandro945/cisterns-aiot-monitoring-automation/assets/64285906/e3648dcb-5626-46dc-ba64-f4e11a88f9d2)

## C4 Model

![image](https://github.com/alejandro945/cisterns-aiot-monitoring-automation/assets/64285906/e98e3dfa-f71c-48e9-ab02-6d3f4a462a6a)

## ESP32 Cam

![image](https://github.com/alejandro945/cisterns-aiot-monitoring-automation/assets/64285906/5014ac3a-5558-46ac-a5a9-13633e492415)

## MQTT Broker

![image](https://github.com/alejandro945/cisterns-aiot-monitoring-automation/assets/64285906/f3da130a-82f2-45a4-bcf6-5134d6ed98d5)

## Event Store Broker

![image](https://github.com/alejandro945/cisterns-aiot-monitoring-automation/assets/64285906/d8137b3a-d70e-4d9f-9025-dc60e9ac5715)

## Web App

![image](https://github.com/alejandro945/cisterns-aiot-monitoring-automation/assets/64285906/ab9fb40e-9884-439c-be6f-50b4fb0dd4b9)


## Deployment

1. Install Minikube

2. Starting Minikube

   ```bash
   minikube start --memory 6144
   ```

3. Creation of namespaces

   ```bash
   kubectl create namespace kafka
   kubectl create namespace monitoring
   kubectl create namespace apps
   ```

4. Deploy Strimzi Kafka Operator (including ClusterRole, ClusterRoleBinding and CRDs):

   ```bash
   kubectl create -f 'https://strimzi.io/install/latest?namespace=kafka' -n kafka
   ```

5. Deploy Prometheus Operator (including ClusterRole, ClusterRoleBinding and CRDs):

   ```bash
   kubectl apply -f ./monitoring/prometheus/prometheus-operator-deployment.yaml -n monitoring --force-conflicts=true --server-side
   ```

6. Create configmap for jmx metrics:

   ```bash
   kubectl apply -f ./message-broker/kafka-metrics-config.yaml -n kafka
   kubectl apply -f ./message-broker/zookeeper-metrics-config.yaml -n kafka
   ```

7. Add our custom kafka resource and wait for it to be ready:

   ```bash
   kubectl apply -f ./message-broker/kafka.yaml -n kafka
   kubectl wait kafka/my-cluster --for=condition=Ready --timeout=300s -n kafka
   ```

8. Deploy Prometheus

   ```bash
   kubectl apply -f ./monitoring/prometheus/prometheus.yaml -n monitoring
   ```

9. Deploy Pod monitor

   ```bash
   kubectl apply -f ./monitoring/strimzi-pod-monitor.yaml -n monitoring
   ```

10. Deploy grafana Enter in grafana app port forwarding 3000 to 3000 and the add prometheus datasource with the url http://prometheus-operated:9090 and also add dashboards from the folder ./dashboard (Exporter and kafka)

   ```bash
   kubectl apply -f ./monitoring/grafana/grafana.yaml -n monitoring
   ```
   
11. Create a topic:

   ```bash
   kubectl apply -f message-broker/topic.yaml -n kafka
   ```

12. Deploy mongo database with its mongo express web ui

   ```bash
   kubectl apply -f ./storage/mongo.yaml -n apps
   ```

13. Create the kafka mongo connect

   ```bash
   kubectl apply -f ./message-broker/kafka-mongo-connect.yaml -n kafka
   ```

14. Create the kafka mongo sink

   ```bash
   kubectl apply -f ./message-broker/kafka-mongo-sink.yaml -n kafka
   ```

15. Create mqtt bridge

   ```bash
   kubectl apply -f ./mqtt-broker -n kafka
   ```

16. Test our mqtt bridge

   ```bash
   python3 ./testing/mqtt_test.py
   ```

17. Port forward to grafana and prometheus

   ```bash
   kubectl port-forward svc/grafana 3000:3000 -n monitoring
   kubectl port-forward svc/prometheus-operated 9090:9090 -n monitoring
   ```

18. Kafka UI

   ```bash
   helm repo add kafka-ui https://provectus.github.io/kafka-ui-charts
   helm install kafka-ui kafka-ui/kafka-ui \
      --set envs.config.KAFKA_CLUSTERS_0_NAME=my-cluster \
      --set envs.config.KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS=my-cluster-kafka-bootstrap:9092 \
      --namespace kafka
   ```

19. Enable Metrics k8s api

   ```bash
   minikube addons enable metrics-server
   ```

## Delete resources

```bash
kubectl -n kafka delete -f ./message-broker/kafka.yaml 
kubectl -n kafka delete -f ./message-broker/kafka-mongo-connect.yaml
kubectl -n kafka delete -f ./message-broker/kafka-mongo-sink.yaml
kubectl -n kafka delete -f ./message-broker/topic.yaml
kubectl -n kafka delete -f ./mqtt-broker
kubectl -n monitoring delete -f ./monitoring/prometheus/prometheus.yaml
kubectl -n monitoring delete -f ./monitoring/strimzi-pod-monitor.yaml
kubectl -n monitoring delete -f ./monitoring/grafana/grafana.yaml
kubectl -n kafka delete -f 'https://strimzi.io/install/latest?namespace=kafka'
kubectl -n monitoring delete -f ./monitoring/prometheus/prometheus-operator-deployment.yaml 
kubectl -n kafka delete -f ./message-broker/kafka-metrics-config.yaml
kubectl -n kafka delete -f ./message-broker/zookeeper-metrics-config.yaml
kubectl -n apps delete -f ./storage/mongo.yaml
helm uninstall kafka-ui -n kafka
kubectl delete namespace kafka
kubectl delete namespace monitoring
kubectl delete namespace apps
minikube stop
```
## Flow Evidences

![image](https://github.com/alejandro945/cisterns-aiot-monitoring-automation/assets/64285906/875467a5-07b6-4b37-a28b-b3b8beeed1cd)
![image](https://github.com/alejandro945/cisterns-aiot-monitoring-automation/assets/64285906/6691b1df-5350-435e-8151-76a826c2e02b)
![image](https://github.com/alejandro945/cisterns-aiot-monitoring-automation/assets/64285906/c2c32bf1-123f-458b-9b10-bdc4ddc0a93a)
![image](https://github.com/alejandro945/cisterns-aiot-monitoring-automation/assets/64285906/92321704-8eda-4b66-8ab3-671b05eb2a79)
