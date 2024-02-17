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

![image](https://github.com/alejandro945/cisterns-aiot-monitoring-automation/assets/64285906/98a30ab7-05fc-4088-a8c4-79cdf3a7663b)

## IOT 4 Layers
![image](https://github.com/alejandro945/cisterns-aiot-monitoring-automation/assets/64285906/bafb3114-074f-4920-a3dd-135c4032a9c8)

## Deployment

1. Install Minikube

2. Starting Minikube

```bash
minikube start --memory 8192
```

3. Creation of namespaces

```bash
kubectl create namespace kafka
kubectl create namespace monitoring
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

10. Deploy grafana

```bash
kubectl apply -f ./monitoring/grafana/grafana.yaml -n monitoring
```

11. Create a topic:

```bash
kubectl apply -f message-broker/topic.yaml -n kafka
```

12. Add Prometheus datasource in Grafana 10 Upload grafana dashboards from- https://github.com/strimzi/strimzi-kafka-operator/tree/0.28.0/examples/metrics/grafana-dashboards

13. Create mqtt bridge

```bash
kubectl apply -f ./mqtt-broker -n kafka
```

14. Test our mqtt bridge

```bash
python3 ./testings/mqtt_test.py
```

15. Port forward to grafana and prometheus

```bash
kubectl port-forward svc/grafana 3000:3000 -n monitoring
kubectl port-forward svc/prometheus-operated 9090:9090 -n monitoring
```

![image](https://github.com/alejandro945/cisterns-aiot-monitoring-automation/assets/64285906/923625b2-8f12-4b90-8249-9f3ddc197c40)


## Kafka UI (Optional)  

![image](https://github.com/alejandro945/cisterns-aiot-monitoring-automation/assets/64285906/982a44ea-7d7d-422c-bf92-ff146db79c45)


```bash
helm repo add kafka-ui https://provectus.github.io/kafka-ui-charts
helm install kafka-ui kafka-ui/kafka-ui \
   --set envs.config.KAFKA_CLUSTERS_0_NAME=local \
   --set envs.config.KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS=my-cluster-kafka-bootstrap:9092 \
   --namespace kafka
```

## Delete resources

```bash
kubectl delete -f ./message-broker/kafka.yaml -n kafka
kubectl -n monitoring delete -f ./monitoring/prometheus/prometheus.yaml
kubectl -n monitoring delete -f ./monitoring/strimzi-pod-monitor.yaml
kubectl -n monitoring delete -f ./monitoring/grafana/grafana.yaml
kubectl -n kafka delete -f 'https://strimzi.io/install/latest?namespace=kafka'
kubectl -n kafka delete -f ./monitoring/prometheus/prometheus-operator-deployment.yaml -n monitoring
kubectl -n kafka delete -f ./message-broker/kafka-metrics-config.yaml
kubectl -n kafka delete -f ./message-broker/zookeeper-metrics-config.yaml
kubectl delete namespace kafka
kubectl delete namespace monitoring
# helm uninstall kafka-ui -n kafka
minikube stop
```
