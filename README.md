# react-forecast-table

## Quick Start (Option #1)
* Clone the repo:
```
https://github.com/fatematzuhora/react-forecast-table.git
```
* Go inside the folder:
```
cd react-forecast-table
```
* Install necessary libraries:
```
npm i
```
* Run the project:
```
npm run start
```

## Build Docker Image (Option #2)
* Go inside the folder:
```
cd react-forecast-table
```
* Build a **docker image**:
```
sudo docker build -t fatematzuhora/react-forecast-table .
```
Now you can see the following message on your terminal:

**Successfully tagged fatematzuhora/react-forecast-table:latest**

This means the docker image has built successfully.

* Run the docker image:
```
sudo docker run -it -p 3000:3000 fatematzuhora/react-forecast-table
```

## Pull from [Docker Hub](https://hub.docker.com/r/fatematzuhora/react-forecast-table) (Option #3)

* Simply just pull the docker image from the docker hub:
```
sudo docker pull fatematzuhora/react-forecast-table
```
* Run the docker image:
```
sudo docker run -it -p 3000:3000 fatematzuhora/react-forecast-table
```
