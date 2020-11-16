import json
import unittest

from base import BaseTestCase

class TestAPIService(BaseTestCase):
    """Tests for the API Service"""

    def test_sanity(self):
        """Ensure the api behaves correctly"""
        response = self.client.get("/api/test")
        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 200)
        self.assertIn("Success", data["message"])
        self.assertIsNone(data["data"])
        self.assertTrue(data["status"])
    
    def test_get_file_names(self):
        """Test api service return valid file names"""
        response = self.client.get("/api/get_file_names")
        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(data["data"])
        self.assertTrue(len(data["data"]) > 0)
        self.assertTrue(data["data"][0][-4:] == "hdf5")
        self.assertTrue(data["status"])

    def test_read_data_invalid_file_name(self):
        """Test api service return invalid file data"""
        response = self.client.post(
            "/api/read_data",
            data=json.dumps({}),
            content_type="application/json"
        )
        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 400)
        self.assertIsNone(data["data"])
        self.assertIn("Failed", data["message"])
        self.assertFalse(data["status"])

    def test_read_data_valid_file_name(self):
        """Test api service return valid file data"""
        response = self.client.post(
            "/api/read_data",
            data=json.dumps({
                "file_name" : "test_dataset_1.hdf5"
            }),
            content_type="application/json"
        )
        data = json.loads(response.data.decode())
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(data["data"])
        self.assertTrue(len(data["data"]) > 0)
        self.assertIn("glucose",data["data"])
        self.assertIn("measurement",data["data"])
        self.assertIn("time",data["data"])
        self.assertTrue(data["status"])