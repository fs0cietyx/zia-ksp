import os
import sys
import unittest
import pandas as pd

# Add backend function folder to sys.path for import testing
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../functions/ksp_intelligence_api')))

try:
    import rf_model
except ImportError:
    rf_model = None


class TestZonalIntelligenceAPI(unittest.TestCase):
    """
    Automated Unit Test Suite for ZIA Serverless Geospatial & ML Engine.
    """

    def setUp(self):
        self.csv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../functions/ksp_intelligence_api/Consolidated_Analytical_Master.csv'))
        self.assertTrue(os.path.exists(self.csv_path), "Master SCRB CSV dataset file must exist.")
        self.df = pd.read_csv(self.csv_path)

    def test_scrb_dataset_structure(self):
        """Verify SCRB dataset contains required spatial and criminological columns."""
        required_cols = ['latitude', 'longitude', 'Category', 'Gravity', 'CrimeHead', 'IncidentFromDate', 'TimeBucket']
        for col in required_cols:
            self.assertIn(col, self.df.columns, f"Column '{col}' is missing from master dataset.")

    def test_spatial_coordinate_bounds(self):
        """Ensure all latitude and longitude coordinates fall within Karnataka bounding box."""
        valid_coords = self.df[self.df['latitude'].notnull() & self.df['longitude'].notnull()]
        self.assertGreater(len(valid_coords), 9000, "Must have at least 9,000 geocoded FIR records.")
        
        # Karnataka approximate bounding box: Lat 11.5 to 18.5, Lng 74.0 to 78.5
        lat_min, lat_max = valid_coords['latitude'].min(), valid_coords['latitude'].max()
        lng_min, lng_max = valid_coords['longitude'].min(), valid_coords['longitude'].max()
        
        self.assertGreaterEqual(lat_min, 11.0, f"Min latitude {lat_min} is out of state bounds.")
        self.assertLessEqual(lat_max, 19.0, f"Max latitude {lat_max} is out of state bounds.")
        self.assertGreaterEqual(lng_min, 73.0, f"Min longitude {lng_min} is out of state bounds.")
        self.assertLessEqual(lng_max, 79.0, f"Max longitude {lng_max} is out of state bounds.")

    def test_heinous_crime_gravity_filtering(self):
        """Verify that gravity filtering isolates Heinous vs Non-Heinous records cleanly."""
        heinous_df = self.df[self.df['Gravity'] == 'Heinous']
        non_heinous_df = self.df[self.df['Gravity'] == 'Non-Heinous']
        
        self.assertGreater(len(heinous_df), 0, "Must haveHeinously categorized records.")
        self.assertGreater(len(non_heinous_df), 0, "Must have Non-Heinous categorized records.")
        self.assertEqual(len(heinous_df) + len(non_heinous_df), len(self.df), "Gravity categories must be mutually exclusive and exhaustive.")

    def test_rf_model_predictive_engine(self):
        """Test Scikit-Learn predictive risk calculation sandbox if module is present."""
        if rf_model and hasattr(rf_model, 'calculate_district_risk'):
            risk_score = rf_model.calculate_district_risk(urban_growth=3.5, migration_vel=2.1, unemployment=14.2)
            self.assertIsInstance(risk_score, float)
            self.assertGreaterEqual(risk_score, 0.0)
            self.assertLessEqual(risk_score, 1.0)


if __name__ == '__main__':
    unittest.main()
