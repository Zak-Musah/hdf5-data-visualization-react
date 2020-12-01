<p align="center" style="color: #343a40">
  <h1 align="center">HDF5 Data Visualization</h1>
</p>
<p align="center" style="font-size: 1.2rem;">IRUBIS HDF5 files visualized in react programmatically</p>

[![npm version](https://badge.fury.io/js/react.svg)](https://badge.fury.io/js/react)
[![Python 3.8](https://img.shields.io/badge/python-3.8-blue.svg)](https://www.python.org/downloads/release/python-360/)

This HDF5 visualization project written with Flask web framework(Python) as backend and React (Javascript) as frontend is served in Docker containers. HDF5 format is a hierarchical data structure, consists mainly of the following components: attributes, groups and data sets. Attributes are used for storing meta-data. Groups and data sets could be considered as folders and files, respectively, in classical file system - https://en.wikipedia.org/wiki/Hierarchical_Data_Format.

Structure of IRUBIS HDF5 files Attributes:

- wavenumbers, array: Wx1, with W - number of data samples
  From here you can extract wavenumbers, which are commonly used as x-axis (horizontal) for plotting spectra.

Groups:

- internal
- external

The internal group has the following structure:

- glucose
- measurement
- time

time - integers, size Nx1, with N - number of data samples, consists of UNIX timestamps, at which a spectrum was measured.

measurement - floats, size NxW, with N - number of data samples, W - number of wavenumber, each row is a spectrum.

glucose - floats, size Nx1, with N - number of data samples, consists of glucose values that were calculated based on corresponding measurement spectra.

The goal of this task is to programmaticaly extract data from files and plot two graphs. One graph should contain glucose data points and the second, the corresponding spectrum.

## Demo

Check out the live app, running on Netlify:
[Demo](https://irubis-dashboard.netlify.app/)

# [📖 Docs]

- [[📖 Docs]](#-docs)
  - [Quick Start](#quick-start)
- [Technology](#technology)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Dependencies](#dependencies)
  - [Backend](#backend-1)
  - [Frontend](#frontend-1)
- [EndPoints](#endpoints)
- [Screenshots](#screenshots)

## Quick Start

Get up and running with the following.

- Clone from Github

```bash
git clone https://github.com/Zak-Musah/hdf5-data-visualization-react.git

cd hdf5-data-visualization-react

```

- Docker/Docker Compose should be installed before running the start command
- 3 docker containers were used - Backend (Python) , Frontend (Node) and Nginx

- To start both backend and frontend and run tests using local docker client, run the following from root of application:

```bash
sh ./start.sh
```

- In case the start.sh does not seem to be runnable, use

```bash
chmod 400 start.sh
```

- To run project without docker , follow these steps; Also change correct path of dataset folder in backend/api/**init**.py

```bash
cd backend
python3 -m venv env [Create a python environment]
source env/bin/activate
(env) pip install -r requirements.txt
(env) export FLASK_APP=api/__init__.py
(env) export REACT_APP_BACKEND_SERVICE_URL=http://localhost:5000
(env) python manage.py run [Navigate to http://localhost:5000/api/test for sanity check]


cd frontend
npm install
export REACT_APP_BACKEND_SERVICE_URL=http://localhost:5000
npm start [Automatically launches app in your default browser on http://localhost:3000]
```

# Technology

## Backend

- Python v3.8.6
- Flask v1.1.2
- Docker v19.03.1
- Docker Compose v1.21.0
- Docker Compose file v3.3
- Nginx v1.15.9
- Guicorn v19.9.0

## Frontend

- Node v12.18.3
- Npm v6.14.7
- React v16.14.0
- React Scripts v2.1.8
- React Dom v16.14.0

# Dependencies

## Backend

- Flask Testing v0.8.0 - For unit testing within flask
- h5py v3.1.0 - For extracting of big data from HDF5 binary data format
- numpy v1.19.4 To structure multi-dimensional data extracted by h5py into numpy matrices for data aggregation
- Coverage v5.3 - For checking coverage of code tested
- Flask CORS v3.0.9 - To allow for cross-origin AJAX requests
- tzlocal v2.1 - To convert unix timestamps to local timezone

## Frontend

- Axios v0.18.1 - For making AJAX calls to the server(backend)
- react-bootstrap v1.4.0 - For app CSS styling and loading spinner
- React-PlotlyJS/PlotlyJS v2.4.0/1.45.3 - For charts shown on dashboard
- Enzyme v3.9.0 - Utility library used for testing react components
- react-fontawesome v0.1.13 - For light/dark mode icon

# EndPoints

You can test out the following endpoints:

```

   Endpoint                 HTTP Method     CRUD Method      Result
    /                           GET            READ            Load React App
    /api/test                   GET            READ            Sanity Check
    /api/get_file_names         GET            READ            Get file names
    /api/get_glucose_data       POST           READ            Get Glucose data from file
    /api/get_measurement_data   POST           READ            Get measurement data from file
```

# Screenshots

## When App First Renders


### Choose data file and follow steps to see glucose and corresponding spectra as shown in Results

![Image](Screenshots/1.png?raw=true "1")

## Results

![Image](Screenshots/2.png?raw=true "2")

