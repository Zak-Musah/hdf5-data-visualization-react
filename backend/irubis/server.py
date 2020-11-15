from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS
import json
import os
import glob
import h5py


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


FOLDER_PATH = "C:/PERSONAL/Applications/new application/Career day/October 2020/irubis/Coding Challenge Frontend/"

class NumpyEncoder(json.JSONEncoder):
    """ Special json encoder for numpy types """
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)

@app.route("/")
def home():
    return "Hello, World!"

@app.route('/datafiles')
def get_data_files():
    os.chdir(FOLDER_PATH)
    hdf5_files = glob.glob('*.hdf5')
    return jsonify(status = True,files = hdf5_files)

@app.route('/read_data', methods=['POST'])
def read_data():
    print(request)
    post_data = request.get_json()
    filename = post_data.get("filename")
    full_file_path = FOLDER_PATH+filename
    with h5py.File(full_file_path, 'r') as f:
        data = f['internal']
        glucose = np.array(data['glucose']).tolist()
        measurement =  np.array(data['measurement'])
        row_mean_measurement = np.mean(measurement, axis = 1).tolist()
        time =  np.array(data['time']).tolist()
    data = {
        'glucose':  [i[0] for i in glucose],
        'measurement' :  [i for i in row_mean_measurement],
        'time' :  [i[0] for i in time]
    }
    
    return jsonify(status = True, data = data)

   
if __name__ == "__main__":
    app.run(debug=True)