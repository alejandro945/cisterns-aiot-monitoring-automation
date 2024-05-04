# python 3.6

import random
import time
import json
from paho.mqtt import client as mqtt_client


broker = 'localhost'
port = 1883
topic = "device1/FreeMem" # main/json, IP, FreeMem, wifiRSSI
# Generate a Client ID with the publish prefix.
client_id = f'publish-{random.randint(0, 1000)}'
# username = 'emqx'
# password = 'public'

def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(mqtt_client.CallbackAPIVersion.VERSION1, client_id)
    # client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def publish(client):
    msg_count = 1
    while True:
        time.sleep(1)
        #Create a dictionary with the message content
        #msg = { "value": msg_count }
        #msg = "192.168.130.4"
        msg= 1000
        #msg= -30
        # Convert the dictionary to a JSON-formatted string
        #msg_json = json.dumps(msg)
        #msg_json = "192.168.130.4"
        msg_json = 1000
        #msg_json = -80
        # Publish the JSON-formatted message to the topic
        result = client.publish(topic, msg_json)
        # result: [0, 1]
        status = result[0]
        if status == 0:
            print(f"Send {msg} to topic {topic}")
        else:
            print(f"Failed to send message to topic {topic}")
        msg_count += 1
        if msg_count > 5:
            break


def run():
    client = connect_mqtt()
    client.loop_start()
    publish(client)
    client.loop_stop()


if __name__ == '__main__':
    run()
