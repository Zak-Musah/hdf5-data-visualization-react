from flask import Flask, request, jsonify
from datetime import datetime
import numpy as np
from flask_cors import CORS
import json
import os
import glob
import h5py
import tzlocal




app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost"}})
FOLDER_PATH = "/usr/src/app/dataset/" # change directory here for correct path to dataset - without docker

@app.route("/api/test")
def test_sanity():
    return jsonify(status = True, data = None, message = "Success")


@app.route('/api/get_file_names')
def get_file_names(): 
    os.chdir(FOLDER_PATH)
    hdf5_files = glob.glob('*.hdf5')
    if len(hdf5_files) > 0:
        return jsonify(status = True, data = hdf5_files, message = "Data files retrieved")
    return jsonify(status = False, data = None, message = "Failed"), 400


@app.route('/api/get_glucose_data', methods=['POST'])
def get_glucose_data():
    post_data = request.get_json()
    file_name = post_data.get("file_name")
    if file_name:
        full_file_path = FOLDER_PATH + file_name
        glucose,time ,_ = get_data_from_file(full_file_path)
        result = {
            'glucose':  [i[0] for i in glucose],
            'time' :  [convert_unix_timestamp(i[0]) for i in time]
        }
        return jsonify(status = True, data = result, message = "Data retrieved")
    return jsonify(status = False,data = None, message = "Failed"), 400


@app.route('/api/get_measurement_data', methods=['POST'])
def get_measurement_data():
    post_data = request.get_json()
    file_name = post_data.get("file_name")
    measurement_number = post_data.get("index")
    if file_name:
        full_file_path = FOLDER_PATH + file_name
        _ , _ ,measurements = get_data_from_file(full_file_path)
        measurement = measurements[measurement_number]
        result = {
            'measurement' :  [i for i in measurement],
        }
        return jsonify(status = True, data = result, message = "Data retrieved")
    return jsonify(status = False,data = None, message = "Failed"), 400


def convert_unix_timestamp(time):
    local_timezone = tzlocal.get_localzone()
    local_time = datetime.fromtimestamp(time, local_timezone)
    return local_time.strftime("%Y-%m-%d %H:%M:%S")

    
def get_data_from_file(path):
    with h5py.File(path, 'r') as f:
        data = f['internal']
        glucose =  np.array(data['glucose'])
        time =  np.array(data['time'])
        measurements = np.array(data['measurement'])
    return glucose,time,measurements


if __name__ == "__main__":
    app.run(debug=True)