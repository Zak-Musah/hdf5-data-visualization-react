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


@app.route('/api/read_data', methods=['POST'])
def read_data():
    post_data = request.get_json()
    file_name = post_data.get("file_name")
    if file_name:
        full_file_path = FOLDER_PATH + file_name
        with h5py.File(full_file_path, 'r') as f:
            data = f['internal']
            glucose = np.array(data['glucose']).tolist()
            measurement =  np.array(data['measurement'])
            row_mean_measurement = np.mean(measurement, axis = 1).tolist()
            time =  np.array(data['time']).tolist()
        result = {
            'glucose':  [i[0] for i in glucose],
            'measurement' :  [i for i in row_mean_measurement],
            'time' :  [convert_unix_timestamp(i[0]) for i in time]
        }
        return jsonify(status = True, data = result, message = "Data retrieved")
    return jsonify(status = False,data = None, message = "Failed"), 400

def convert_unix_timestamp(time):
    local_timezone = tzlocal.get_localzone()
    local_time = datetime.fromtimestamp(time, local_timezone)
    return local_time.strftime("%Y-%m-%d %H:%M:%S")
   
if __name__ == "__main__":
    app.run(debug=True)