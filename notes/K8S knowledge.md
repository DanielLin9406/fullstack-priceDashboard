# K8S Knowledge

Note from a course by Stephen Grider
https://www.udemy.com/docker-and-kubernetes-the-complete-guide/

## Tools

1. minikue creates a single node and run K8S cluster
2. kubectl is a program that is used to interact with the K8s cluster in general and manage what all the different nodes are doing and what different containers they are running.

## Basics

1. Nodes are individual machines that run containers
2. Masters are machines with a set of programs to manage nodes
3. Kubernetes didn't build our images - it got them from somewhere else
4. Kubernetes decided where to run each container - each node can run a dissimilar set of containers

## Process of building a K8S app @local

### Install Docker desktop's Kubernetes

1. enable Kubernetes in docker
2. run localhost:31515

### Command with Kubernetes cluster

#### Load config file into Kubernetes cluster

```bash
kubectl apply -f <path-to-filename>
```

#### Print the status of all running pods

```bash
kubectl get pods
kubectl get services
kubectl get storageclass
kubectl get pv
kubectl get pvc
```

#### Remove an object

```bash
kubectl delet -f <path-to-filename>
```

### Update Image version

1. Update the image, rebuild it and push to docker hub
2. Get the deployment to recreate our pods with the latest version
   => Use an imperative command to update the image version

```bash
kubectl set image <object_type>/<object_name> <container_name>=<new image to use>
```

### Storage Class

#### Persistent Volumes

TODO

### Create a Secrets

```bash
kubectl create secret generic[docker-registry | tls] <secret_name> --from-literal key=value
```

### Set Traffics

#### Use ingress-nginx (different from environment)

#### Behind the scene of a ingress

1. Ingress config: object that has a set of configuration rules describing how traffic should be routed.
2. Ingress Controller: Constantly watches for changes to the ingress and updates the thing that handles treffic
3. Something acceptes incoming traffic

#### Behind the scene of the ingress-nginx

1. Ingress config: object that has a set of configuration rules describing how traffic should be routed.
2. Ingress Controller + thin that routes traffic

#### why ingress-nginx instead of load lalance service

1. Load balancer servie will bypass clusterIP service and directly connect to the set of pods.

#### Ingress-Nginx locally (Use a docker built in kubernetes)

[Url](https://kubernetes.github.io/ingress-nginx/)

1. General setup : Mandatory Command

   ```bash
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml
   ```

2. Create a service in docker for mac

   ```bash
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud-generic.yaml
   ```

3. Verify the service was enabled by running the following

   ```bash
   kubectl get svc -n ingress-nginx
   ```

## Process of building a K8S app @prod

### Set GKE project

1. Google cloud platform project
2. Link a billing account
3. Create K8S engine

### Set Travis config file

1. install google cloud sdk cli
2. configure the sdk without google cloud auth info
3. login docker cli
4. build test image and run tests
5. if test successful run script to deploy newest images
6. build all our images, tag each one and push each to docker hub
7. apply all k8S configs
8. imeratively set latest images on each deployment

#### Set service Account

1. create a service account
2. download service account credentials in a json file
3. download and install the travis cli(encrypt)
4. encrypt and uploadthe json file to our travis account
5. In travis.yml, add code to unencrypt the json file and load it into GCD SDK

##### Install travis cli

1. docker run -it -v \$(pwd):/app ruby:2.3 sh
2. gem install travis --no-rdoc -no-ri
3. gem install travis
4. travis login
5. copy json file into the 'volumed' directory
6. travis encrypt-file service-account.json
7. add service-account.json.enc to git repository

### Build a unique tags for built images

Use \$SHA to build a unique tage

### Configure the GCD CLI on cloud console

```bash
gcloud config set project <project id>
gcloud config set compute/zone <localtion>
gcloud container clusters get-credentials <gcd cluster name>
kubectl create secret generic <secret name> --from-literal <secret Name in Capital>=ajd;jkas;ldj;
```

### Set Traffic

#### Ingress-Nginx on GKE console with Helm

##### Install helm

###### install helm from script (https://helm.sh/docs/using_helm/#quickstart)

```bash
curl -LO https://git.io/get_helm.sh
chmod 700 get_helm.sh
./get_helm.sh
```

###### Google’s GKE hosted Kubernetes platform enables RBAC by default. You will need to create a service account for tiller, and use the –service-account flag when initializing the helm server.

- Helm+Tiller
  command we issue => helm client => tiller server

- Role based access control (RBAC system)

1. limits who can access and modify objects in our cluster
2. enable on google cloud by default
3. tiller wants to make changes to our cluster, so it needs to get some permissions set

- Assign a service-account for tiller and give it a cluster role binding

1. Create a new service account called tiller in the kube-system namespace

   ```bash
     kubectl create serviceaccount --namespace kube-system tiller
   ```

2. Create a new clusterrolebinding with the role 'cluster-admin' and assign it ot service account 'tiller'

   ```bash
   kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
   ```

###### init helm

```bash
helm init --service-account tiller --upgrade
```

##### Install ingress-nginx with helm

If the kubernetes cluster has RBAC enabled, then run:

```bash
helm install stable/nginx-ingress --name my-nginx --set rbac.create=true
```

#### Ingress-Nginx on GKE (alternative)

[url](https://kubernetes.github.io/ingress-nginx/)

1. General setup: Mandatory Command

   ```bash
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml
   ```

2. Create a service in docker for GKE

   ```bash
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud-generic.yaml
   ```

### Set up https

1. Purchase a domain
2. domain.com, www.domain.com => our project
3. Cert magager install with helm on GKE console
   [Cert-Manager-Url](https://github.com/jetstack/cert-manager)
   [Cert-Manager-Url](https://docs.cert-manager.io/en/latest/getting-started/)

   install cert manager with helm

   ```bash
   helm install \
     --name cert-manager \
     --namespace cert-manager \
     --version v0.9.1 \
     jetstack/cert-manager
   ```

   Cert Manager: a Pod that could set up infra to sespond to http challenge
   Certificate: object describing details about the certificate that should be obtained
   Issuer: object telling cert manager where to get the certificate from

4. update nginx-ingress, add issuer and certificate

```bash
kubectl describe certificates
```

## Setting up Ingress with Docker Desktops' Kubernetes

### Step.1: Mandatory generic script

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml
```

### Step.2: Execute the provider specific script

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud-generic.yaml
```

### Step.3: Verify the service was enabled by running the following:

```bash
kubectl get svc -n ingress-nginx
```

## Apply Docker Desktop's Kubernetes Dashboard

### Using Docker Desktop's built-in Kubernetes

### Step.1: download the config file locally

```bash
curl -O https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml
```

### Step.2: Update file

args:

- --auto-generate-certificates
- --enable-skip-login
- --disable-settings-authorizer

### Step.3: Run Conmand

```bash
kubectl apply -f kubernetes-dashboard.yaml
kubectl proxy
```

### Step.4: check browser with the following url

```bash
http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy
```
