# TODO: abstract me to some lib

import base64
import os
import subprocess
import uuid

from kubernetes import client, config

config.load_kube_config()


SECRET_NAME = 'wedding'
NAMESPACE = 'default'
KUBE = client.CoreV1Api()

def load_secret_value(name, namespace):
    secret_data = safe_read_secret(name, namespace)
    if secret_data:
        print("Secret found, editing...")
        return secret_data
    else:
        print("Secret not found; creating a new one")
        return ""

def edit_tmp_secret(secret_data):
    tmp_file = '/tmp/%s.yaml' % (str(uuid.uuid4()))

    with open(tmp_file, 'w') as f:
        f.write(secret_data)

    modified = os.path.getmtime(tmp_file)
    subprocess.call(['vi', tmp_file])
    new_modified = os.path.getmtime(tmp_file)

    if new_modified == modified:
        print("Secret unchanged, skipping.")
        secret_data = None
    else:
        with open(tmp_file) as f:
            secret_data = f.read()

    os.remove(tmp_file)
    return secret_data

def safe_read_secret(name, namespace):
    try:
        secret = KUBE.read_namespaced_secret(
            name,
            namespace,
        )
        encoded_secret = secret.data['config.yaml']
        secret_bytes = base64.b64decode(encoded_secret)
        return secret_bytes.decode('utf-8')
    except client.rest.ApiException:
        return None

def write_secret(name, namespace, secret_data):
    body = client.V1Secret(
        data={
            'config.yaml': base64.b64encode(
                secret_data.encode('utf-8'),
            ).decode('ascii'),
        },
        type='generic',
        metadata={
            'name': name,
            'namespace': namespace,
        }
    )
    current_value = safe_read_secret(name, namespace)
    if current_value:
        print("Replacing existing secret...")
        KUBE.replace_namespaced_secret(name, namespace, body)
    else:
        print("Creating new secret...")
        KUBE.create_namespaced_secret(namespace, body)

if __name__ == '__main__':
    secret_data = load_secret_value(
        SECRET_NAME,
        NAMESPACE,
    )
    new_secret_data = edit_tmp_secret(secret_data)
    if new_secret_data:
        write_secret(
            SECRET_NAME,
            NAMESPACE,
            new_secret_data,
        )
