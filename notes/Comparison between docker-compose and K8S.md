# Some knowledge about K8S

## Basic of K8S

### Basic unit

- Pod
  - A pod can run one or more containers inside of it.
  - If you have more containers that have integration with other containers inside a pod, use a pod.
  - e.g. Primary container and support container
  - smallest that we can deploy
  - Run one or more related containers
- Services
  - Sets up networking in a K8S cluster
- Development
  - Runs a set of identical pods
  - Monitors the state of each pod, updating as necessary

### Connection between Pod and Service

- Labels in Pod and Selector in Services

## Docker Compose v.s. K8S

### Building Image

- Each entry in docker-compose to tell engine how to build image.
- K8s expects all images to already to be built.

### Container v.s. object

- Each entry in docker-compose represents a container
- Each config file represents a object

### Network

- Each entry in docker-compose define the networking ports.
- Manually set up all networking for K8S

### Something need to do

- Trigger a rebuild
  - tag a version number
