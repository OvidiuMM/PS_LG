import unittest
import sys
sys.path.append('./src')

from src.NumbersClassifier import Classifier
class TestClassifier(unittest.TestCase):

    def setUp(self):
        self.classifier = Classifier()
        self.classification = ("DEFICIENT", "PERFECT" , "ABUNDANT")

    def test_DEFICIENT(self):
        """test an deficient set of numbers are recognized"""
        deficient_list = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11]
        result_dictioary = self.classifier.list_classifier(deficient_list)
        for number in deficient_list:
            self.assertEqual(result_dictioary[number], self.classification[0], "Error: this number is deficient")

    def test_PERFECT(self):
        """test an perfect set of numbers are recognized"""
        perfect_list = [6,28,496,8128]
        result_dictioary = self.classifier.list_classifier(perfect_list)
        for number in perfect_list:
            self.assertEqual(result_dictioary[number], self.classification[1], "Error: this number is perfect")

    def test_ABUNDANT(self):
        """test an abundant set of numbers are recognized"""
        abundant_list = [ 12, 24, 40, 54, 66, 70, 80, 88, 90, 96]
        result_dictioary = self.classifier.list_classifier(abundant_list)
        for number in abundant_list:
            self.assertEqual(result_dictioary[number], self.classification[2],"Error: this number is abundant")

    def test_mixed(self):
        """test that an mixed set of numbers are recognized"""
        mixed_list = range(6,13)
        result_dictioary = self.classifier.list_classifier(mixed_list)
        exptected_result = {6: 'PERFECT', 7: 'DEFICIENT', 8: 'DEFICIENT', 9: 'DEFICIENT', 10: 'DEFICIENT',
                            11: 'DEFICIENT', 12: 'ABUNDANT'}

        self.assertDictEqual(exptected_result,result_dictioary,"Error: the output result is not equal to "
                                                                   "the expected result")
    def test_not_numbers(self):
        """test an list of numbers and not numbers vars are recognized"""
        no_numbers_list = [6, 10, 12, "day 6 they still think I'm a number"]
        exptected_result = {6: 'PERFECT', 10: 'DEFICIENT', 12: 'ABUNDANT',
                            "day 6 they still think I'm a number": 'NOT A POSITIVE NUMBER'}
        result_dictioary = self.classifier.list_classifier(no_numbers_list)
        self.assertDictEqual(exptected_result, result_dictioary, "Error: the output result is not equal to "
                                                                 "the expected result")

    def test_one(self):
        """test number 1 and 2 are not classified as perfect or abundant"""
        abundant_list = [ 1, 2]
        result_dictioary = self.classifier.list_classifier(abundant_list)
        for number in abundant_list:
            self.assertNotEqual(result_dictioary[number], self.classification[2],"Error: this number is deficient")
            self.assertNotEqual(result_dictioary[number], self.classification[1],"Error: this number is deficient")

if __name__ == '__main__':
    unittest.main()
