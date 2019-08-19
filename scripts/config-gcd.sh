#!/bin/bash

openssl ges-256-cbc -K XXXXXXX.json -d
curl http://sdk.cloud.google.com | bash > /dev/null;
source $HOME/google-cloud-sdk/path.bach.inc

# google cloud is in charge of kubectl command in tavis environment
gcloud components update kubectl
gcloud auth activate-service-account --key-file service-account.json
gcloud config set project <project id>
gcloud config set compute/zone <localtion>
gcloud container clusters get-credentials <gcd cluster name>